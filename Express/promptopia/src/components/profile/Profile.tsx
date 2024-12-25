// Core
import { FC } from 'react';
// Types
import { ProfilePropTypes } from './Profile.types';
// Components
import PromptCard from '@/components/prompt-card/PromptCard';

const Profile: FC<ProfilePropTypes> = (props) => {
    const {
        name,
        description,
        data,
        handleDelete,
        handleEdit
    } = props;
    return (
        <section className="w-full">
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{name} Profile</span>
            </h1>
            <p className='desc text-left'>{description}</p>
            <div className='mt-10 prompt_layout'>
                {
                    data.map(post =>
                        <PromptCard
                            key={post._id}
                            post={post}
                            handleEdit={() => handleEdit && handleEdit(post)}
                            handleDelete={() => handleDelete && handleDelete(post)}
                        />
                    )
                }
            </div>
        </section>
    );
}

export default Profile;