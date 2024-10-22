// Core
import { FC } from 'react';
// Types
import {
    CustomModalPropTypes
} from "@/components/custom-modal/CustomModal.types";
// Components
import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";


const CustomModal: FC<CustomModalPropTypes> = (props) => {
    const {
        title,
        isOpen,
        onClose,
        children,
    } = props;
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                {children}
            </ModalContent>
        </Modal>
    );
}

export default CustomModal;