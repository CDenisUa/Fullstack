'use client'
// Core
import { FC } from 'react';
// Styles
import styles from './styles.module.css';
// Types
import {PromptCardListPropTypes} from "@/components/prompt-card-list/PromptCardList.types";
// Components
import {PromptCard} from "@/components";

const PromptCardList: FC<PromptCardListPropTypes> = (props) => {
    const { data, handleTagClick } = props;
    return (
        <div className='mt-16 prompt_layout'>
            {
                data.map(post =>
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                )
            }
        </div>
    );
}

export default PromptCardList;