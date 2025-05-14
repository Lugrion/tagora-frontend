import {ModalSkeleton} from "../ModalSkeleton.tsx";
import {useModalManager} from "../../hooks/useModalManager.tsx";
import React from "react";
import {LabelCreateForm} from "../label/LabelCreateForm.tsx";

export const LabelCreateModal: React.FC = () => {
    const {isOpen, closeModal, openModal} = useModalManager();

    return (
        <>
            <button className="modal-button" onClick={openModal}>
                Create Label
            </button>
            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <LabelCreateForm  onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    );
};