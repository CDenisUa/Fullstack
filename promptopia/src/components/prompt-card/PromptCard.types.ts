// Core
import {Dispatch, SetStateAction} from "react";

export interface PromptCardPropTypes {
    post: IPost,
    handleTagClick?: (tag: string) => void,
    handleEdit?: () => void,
    handleDelete?: () => void,

}
