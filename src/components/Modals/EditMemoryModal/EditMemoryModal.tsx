import {useModalManager} from "../../../hooks/useModalManager.tsx";
import {ModalSkeleton} from "../ModalSkeleton.tsx";
import React from "react";
import {MemoryDTO} from "../../../types/memory";
import EditIcon from '@mui/icons-material/Edit';
import {EditMemoryForm} from "../../Forms/EditMemoryForm/EditMemoryForm.tsx";

export interface MemoryEditModalProps {
    currentMemoryData: MemoryDTO;
}

export const EditMemoryModal: React.FC<MemoryEditModalProps> = ({currentMemoryData}) => {
    const {isOpen, closeModal, openModal} = useModalManager()

    return (
        <>
            <button className={"edit-btn"} onClick={openModal} disabled={isOpen}>
                <EditIcon/>
            </button>
            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <EditMemoryForm currentMemoryData={currentMemoryData} onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    )
}