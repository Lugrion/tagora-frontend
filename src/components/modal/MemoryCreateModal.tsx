import {ModalSkeleton} from "../ModalSkeleton.tsx";
import {useModalManager} from "../../hooks/useModalManager.tsx";
import React from "react";
import {MemoryCreateForm} from "../memory/MemoryCreateForm.tsx";

export const MemoryCreateModal: React.FC = () => {
    const {isOpen, closeModal, openModal} = useModalManager();

    return (
        <>
            <button className="modal-button" onClick={openModal}>
                Create Memory
            </button>
            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <MemoryCreateForm onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    );
};