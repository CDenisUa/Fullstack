// Core
import { v2 as cloudinary } from 'cloudinary';
// Models
import User from '#models/user.model.js';
import Post from '#models/post.model.js';

export const createPost = async (req, res) => {
  try {
      const { text } = req.body;
      let { img } = req.body;
      const userId = req.user['_id'].toString();

      const user = await User.findById(userId);
      if(!user) return res.status(404).json({ error: "User not found" });
      if(!text) return res.status(400).json({ error: "Text is required" });
      if(!img) return res.status(400).json({ error: "Image is required" });

      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;

      const newPost = new Post({
        user: userId,
        text,
        img,
      });

      await newPost.save();
      res.status(201).json(newPost);
  } catch(error) {
      console.log('Error in createPost: ', error.message);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
  }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ error: "Post not found" });

        if(post.user.toString() !== req.user['_id'].toString()) {
            return res.status(404).json({ error: "You are not authorized to delete this post" });
        }
        if(post.img) {
            const imgId = post.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);

    } catch(error) {
        console.log('Error in deletePost: ', error.message);
        res.status(500).json({ error: error.message || 'Error in deletePost' });
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user['_id'].toString();
        const post = await Post.findById(postId);

        if(!text) return res.status(400).json({ error: "Text field is required" });
        if(!post) return res.status(400).json({ error: "Post not found" });

        const comment = {
            user: userId,
            text
        };

        post.comments.push(comment);
        await post.save();

        res.status(201).json(comment);

    } catch (error){
        console.log('Error in commentOnPost: ', error.message);
        res.status(500).json({ error: error.message || 'Error in deletePost' });
    }
};