import {useLabelService} from "../../hooks/services/useLabelService.tsx";
import {useCacheLabelsStore} from "../../stores/label.store.ts";
import React from "react";

export const DeleteLabelButton: React.FC<{ id: number }> = ({id}) => {
    const {deleteLabel} = useLabelService()
    const deleteLabelFromCache = useCacheLabelsStore(state => state.deleteLabelFromCache)

    const handleLabelDelete = () => {
        deleteLabelFromCache(id)
        deleteLabel(id);
    };

    return (
        <button onClick={handleLabelDelete}>Delete</button>
    )
}