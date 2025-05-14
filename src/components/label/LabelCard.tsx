import React from 'react';
import {LabelDTO} from "../../types/label";
import {DeleteLabelButton} from "./DeleteLabelButton.tsx";
import {LabelEditModal} from "../modal/LabelEditModal.tsx";
import "../../styles/LabelCard.css"

export interface LabelCardProps {
    label: LabelDTO;
    isBeingEdited: boolean;
    isSelected: boolean;
    onClick: () => void;
}

const LabelCard: React.FC<LabelCardProps> = ({label, isSelected, isBeingEdited, onClick}) => {
    return (
        <article
            className={`label-card`}
        >
            <button
                type={"button"}
                className={`label-filter-button ${isSelected ? 'selected' : ''}`}
                onClick={onClick}

            >
                <h3>{label.title}</h3>
                <p>ID: {label.id}</p>
            </button>

            {isBeingEdited && (
                <div className={"label-edit-container"}>
                    <LabelEditModal currentLabelData={label}/>
                    <DeleteLabelButton id={label.id}/>
                </div>
            )}
        </article>
    );
};

export default LabelCard;