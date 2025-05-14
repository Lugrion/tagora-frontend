import React from "react";
import {MemoryDTO} from "../../types/memory";
import {DeleteMemoryButton} from "./DeleteMemoryButton.tsx";
import {MemoryEditModal} from "../modal/MemoryEditModal.tsx";
import "../../styles/MemoryCard.css"

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

            {isBeingEdited && (
                <div className={"memory-edit-container"}>
                    <MemoryEditModal currentMemoryData={memory}/>
                    <DeleteMemoryButton id={memory.id}/>
                </div>
            )}
        </article>
    );
};