import {useModalManager} from "../../hooks/useModalManager.tsx";
import {ModalSkeleton} from "../ModalSkeleton.tsx";
import React from "react";
import {LabelEditForm} from "../label/LabelEditForm.tsx";
import {LabelDTO} from "../../types/label";

export interface LabelEditModalProps {
    currentLabelData: LabelDTO;
}

export const LabelEditModal: React.FC<LabelEditModalProps> = ({currentLabelData}) => {
    const {isOpen, closeModal, openModal} = useModalManager()
    
    return (
        <>
            <button onClick={openModal}>
                Edit Label
            </button>

            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <LabelEditForm currentLabelData={currentLabelData} onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    )
}