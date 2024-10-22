// Core
import {FC} from 'react';
// Types
import {
    CustomModalPropTypes
} from "@/components/custom-modal/CustomModal.types";
// Components
import {
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";


const CustomModal: FC<CustomModalPropTypes> = (props) => {
    const {
        title,
        isOpen,
        onClose,
        children,
        footer,
    } = props;
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    {footer}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CustomModal;