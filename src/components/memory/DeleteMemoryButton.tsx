import {useMemoryService} from "../../hooks/services/useMemoryService.tsx";
import {useCacheMemoriesStore} from "../../stores/memory.store.ts";
import React from "react";

export const DeleteMemoryButton: React.FC<{ id: number }> = ({id}) => {
    const {deleteMemory} = useMemoryService()
    const deleteMemoryFromCache = useCacheMemoriesStore(state => state.deleteMemoryFromCache)

    const handleLabelDelete = () => {
            deleteMemoryFromCache(id);
            deleteMemory(id);
    };

    return (
        <button onClick={handleLabelDelete}>Delete</button>
    )
}