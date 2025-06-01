import {ModalSkeleton} from "../ModalSkeleton.tsx";
import {useModalManager} from "../../../hooks/useModalManager.tsx";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import {CreateLabelForm} from "../../Forms/CreateLabelForm/CreateLabelForm.tsx";

export const CreateLabelModal: React.FC = () => {
    const {isOpen, closeModal, openModal} = useModalManager();

    return (
        <>
            <button className="label-create-option-btn" onClick={openModal} disabled={isOpen}>
                <AddIcon/>
            </button>
            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <CreateLabelForm onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    );
};