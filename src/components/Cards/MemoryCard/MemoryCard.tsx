import React from "react";
import {MemoryDTO} from "../../../types/memory";
import {DeleteMemoryButton} from "../../Buttons/DeleteMemoryButton.tsx";
import {EditMemoryModal} from "../../Modals/EditMemoryModal/EditMemoryModal.tsx";
import "./MemoryCard.css"

export interface MemoryCardProps {
    memory: MemoryDTO;
    isBeingEdited: boolean;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({memory, isBeingEdited}) => {
    return (
        <article
            className={"memory-card"}
            aria-labelledby={`memory-${memory.id}`}
        >
            <header className="memory-header">
                <h3
                    id={`memory-${memory.id}-name`}
                    className={"memory-name"}
                >
                    {memory.name}
                </h3>

                {isBeingEdited ? (
                    <div className={"memory-edit-container"}>
                        <EditMemoryModal currentMemoryData={memory}/>
                        <DeleteMemoryButton id={memory.id}/>
                    </div>
                ) : (
                    memory.url && (
                        <a href={memory.url} className={"memory-link"} target={"_blank"} rel="noopener noreferrer">
                            Link
                        </a>
                    )
                )}
            </header>

            {memory.labels?.length > 0 && (
                <div className="memory-assigned-labels-container">
                    {memory.labels.map(label => (
                        <span
                            key={label.id}
                            className="memory-label"
                            aria-label={"shows assigned label"}
                        >
                            {label.title}
                        </span>
                    ))}
                </div>
            )}

            <p>ID: {memory.id}</p>
        </article>
    );
};