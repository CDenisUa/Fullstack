// Types
import {ReactNode} from "react";

export interface CustomModalPropTypes {
    title: string,
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
}