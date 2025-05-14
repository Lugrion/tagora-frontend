import {useModalManager} from "../../hooks/useModalManager.tsx";
import {ModalSkeleton} from "../ModalSkeleton.tsx";
import React from "react";
import {MemoryDTO} from "../../types/memory";
import {MemoryEditForm} from "../memory/MemoryEditForm.tsx";

export interface MemoryEditModalProps {
    currentMemoryData: MemoryDTO;
}

export const MemoryEditModal: React.FC<MemoryEditModalProps> = ({currentMemoryData}) => {
    const {isOpen, closeModal, openModal} = useModalManager()

    return (
        <>
            <button onClick={openModal}>
                Edit Memory
            </button>
            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <MemoryEditForm currentMemoryData={currentMemoryData} onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    )
}