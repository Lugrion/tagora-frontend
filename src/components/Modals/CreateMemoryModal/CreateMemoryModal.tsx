import {ModalSkeleton} from "../ModalSkeleton.tsx";
import {useModalManager} from "../../../hooks/useModalManager.tsx";
import React from "react";
import {CreateMemoryForm} from "../../Forms/CreateMemoryForm/CreateMemoryForm.tsx";
import AddIcon from "@mui/icons-material/Add";

export const CreateMemoryModal: React.FC = () => {
    const {isOpen, closeModal, openModal} = useModalManager();

    return (
        <>
            <button className="memory-create-option-btn" onClick={openModal} disabled={isOpen}>
                <AddIcon/>
            </button>
            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <CreateMemoryForm onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    );
};