'use client'
// Core
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
// Components
import PromptCardList from '@/components/prompt-card-list/PromptCardList';

const Feed: FC = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState<IPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const text = event.target.value;
        setSearchText(text);

        const searchWords = text.toLowerCase().split(' ').filter(word => word);

        const filtered = posts.filter(post => {
            const postText = post.prompt.toLowerCase();
            const usernameMatch = post.creator.username.toLowerCase().includes(text.toLowerCase());
            const tagMatch = post.tag.toLowerCase().includes(text.toLowerCase());
            const promptMatch = searchWords.every(word => postText.includes(word));

            return usernameMatch || tagMatch || promptMatch;
        });

        setFilteredPosts(filtered.length > 0 ? filtered : []);
    };


    const handleTagClick = (tag: string) => {
        setSearchText(tag);

        const filtered = posts.filter(post => post.tag.toLowerCase() === tag.toLowerCase());
        setFilteredPosts(filtered);
    };

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList
                data={filteredPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
};

export default Feed;
