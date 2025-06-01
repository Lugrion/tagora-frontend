import {ModalSkeleton} from "../ModalSkeleton.tsx";
import {useModalManager} from "../../../hooks/useModalManager.tsx";
import React from "react";
import {RegisterForm} from "../../Forms/RegisterForm/RegisterForm.tsx";

export const RegisterModal: React.FC = () => {
    const {isOpen, closeModal, openModal} = useModalManager();

    return (
        <>
            <button className="modal-btn register-btn" onClick={openModal} disabled={isOpen}>
                Register
            </button>
            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <RegisterForm onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    );
};