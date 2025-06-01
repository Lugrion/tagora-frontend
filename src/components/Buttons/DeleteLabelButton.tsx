import {useLabelsStore} from "../../stores/label.store.ts";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteLabelButton: React.FC<{ id: number }> = ({id}) => {
    const deleteLabel = useLabelsStore(set => set.deleteLabel)
    const deleteLabelFromCache = useLabelsStore(state => state.deleteLabelFromCache)

    const handleLabelDelete = () => {
        deleteLabelFromCache(id)
        deleteLabel(id);
    };

    return (
        <button className={"delete-btn"} onClick={handleLabelDelete}>
            <DeleteIcon/>
        </button>
    )
}