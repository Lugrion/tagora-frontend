import {useMemoriesStore} from "../../stores/memory.store.ts";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteMemoryButton: React.FC<{ id: number }> = ({id}) => {
    const deleteMemoryFromCache = useMemoriesStore(state => state.deleteMemoryFromCache)
    const deleteMemory = useMemoriesStore(state => state.deleteMemory)

    const handleLabelDelete = () => {
            deleteMemoryFromCache(id);
            deleteMemory(id);
    };

    return (
        <button className={"delete-btn"} onClick={handleLabelDelete}>
            <DeleteIcon/>
        </button>
    )
}