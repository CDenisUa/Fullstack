// Core
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
// Models
import User from '#models/user.model.js';
import Notification from '#models/notification.model.js';

export const getUserProfile = async (req, res) => {
    const { userName }  = req.params;

    try {
        const user = await User.findOne({ userName }).select("-password");
        if(!user) return res.status(404).json({ message: 'User not found' })

        res.status(200).json(user);
    } catch (error) {
        console.log('Error in getUserProfile: ', error.message);
        res.status(500).json({ error: error.message });
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized: user data not found" });
        }
        const currentUser = await User.findById(req.user['_id']);

        if (id === req.user['_id'].toString()) return res.status(400).json({ error: "You can't follow/unfollow yourself" });
        if(!userToModify || !currentUser) return res.status(404).json({ error: "User not found" });

        const isFollowing = currentUser.followings.includes(id);

        if(isFollowing) {
            await User.findByIdAndUpdate(id, {
                $pull: {
                    followers: req.user['_id']
                }
            });
            await User.findByIdAndUpdate(req.user['_id'], {
                $pull: {
                    followings: id
                }
            });
            res.status(200).json({
                message: "User unfollowed successfully"
            })
        } else {
            await User.findByIdAndUpdate(id, {
                $push: {
                    followers: req.user['_id']
                }
            });

            await User.findByIdAndUpdate(req.user['_id'], {
                $push: {
                    followings: id
                }
            });

            const newNotification = new Notification({
                type: 'follow',
                from: req.user['_id'],
                to: userToModify['_id']
            });

            await newNotification.save();

            res.status(200).json({
                message: "User followed successfully"
            })
        }

    } catch (error) {
        console.log('Error in followUnfollowUser: ', error.message);
        res.status(500).json({ error: error.message });
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user['_id'];
        const usersFollowedByMe = await User.findById(userId).select("followings");
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                }
            },
            {
                $sample: {
                    size: 10,
                }
            }
        ]);
        console.log(usersFollowedByMe)

        const filteredUsers = users.filter(user => !usersFollowedByMe.followings.includes(user['_id']));
        const suggestedUsers = filteredUsers.slice(0,4);

        suggestedUsers.forEach(user => user.password = null);
        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log('Error in getSuggestedUsers: ', error.message);
        res.status(500).json({ error: error.message });
    }
}

export const updateUserProfile = async (req, res) => {
    const {
        fullName,
        email,
        userName,
        currentPassword,
        newPassword,
        bio,
        link
    } = req.body;

    let { profileImg, coverImg } = req.body;

    const userId = req.user['_id'];
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if((!newPassword && currentPassword) || (newPassword && !currentPassword)) {
            return res.status(400).send({ error: "Provide both current password and new password to update password" });
        }

        if(currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).send({ error: "Invalid password" });
            if(newPassword.length < 6) return res.status(400).send({ error: "Password must be at least 6 characters" });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }
        if(profileImg) {
            if (user.profileImg) {
                const publicId = user.profileImg.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;

        }
        if(coverImg) {
            if(user.coverImg) {
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedResponse.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.userName = userName || user.userName;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save()
        user.password = null;

        return res.status(200).json(user)

    } catch (error) {
        console.log('Error in updateUserProfile: ', error.message);
        res.status(500).json({ error: error.message });
    }
};