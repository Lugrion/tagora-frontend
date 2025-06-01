import {useModalManager} from "../../../hooks/useModalManager.tsx";
import {ModalSkeleton} from "../ModalSkeleton.tsx";
import React from "react";
import {EditLabelForm} from "../../Forms/EditLabelForm/EditLabelForm.tsx";
import {LabelDTO} from "../../../types/label";
import EditIcon from "@mui/icons-material/Edit";

export interface LabelEditModalProps {
    currentLabelData: LabelDTO;
}

export const EditLabelModal: React.FC<LabelEditModalProps> = ({currentLabelData}) => {
    const {isOpen, closeModal, openModal} = useModalManager()
    
    return (
        <>
            <button className={"edit-btn"} onClick={openModal} disabled={isOpen}>
                <EditIcon/>
            </button>

            <ModalSkeleton isOpen={isOpen} onClose={closeModal}>
                <EditLabelForm currentLabelData={currentLabelData} onSuccess={closeModal}/>
            </ModalSkeleton>
        </>
    )
}