import {ModalSkeleton} from "../ModalSkeleton.tsx";
import {LoginForm} from "../auth/LoginForm.tsx";
import {useModalManager} from "../../hooks/useModalManager.tsx";
import React from "react";

export const LoginModal: React.FC = () => {
    const {isOpen, closeModal, openModal} = useModalManager();

    return (
        <>
            <button className="modal-button" onClick={openModal}>
                Login
            </button>
            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <LoginForm onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    );
};