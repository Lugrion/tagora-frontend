import React, {useState} from "react";
import {useAuthStore} from "../../../stores/auth.store.ts";
import {LabelDTO} from "../../../types/label";
import {useLabelsStore} from "../../../stores/label.store.ts";

interface LabelEditFormProps {
    currentLabelData: LabelDTO;
    onSuccess: () => void;
}

export const EditLabelForm: React.FC<LabelEditFormProps> = ({
                                                                currentLabelData,
                                                                onSuccess
                                                            }) => {
    const updateLabelInCache = useLabelsStore(state => state.updateLabelInCache);
    const setIsLoading = useLabelsStore(state => state.setIsLoading);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    const [labelData, setLabelData] = useState<LabelDTO>(currentLabelData);

    const [error, setError] = useState<string | null>(null);
    const updateLabel = useLabelsStore(set => set.updateLabel);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isAuthenticated) {
                const updatedLabel = await updateLabel(labelData);
                updateLabelInCache(updatedLabel);
            } else {
                updateLabelInCache(labelData);
            }
            onSuccess()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Memory update failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLabelData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form className={"form-wrapper"} onSubmit={handleSubmit}>
            <h3>Edit Label</h3>
            <div className={"input-wrapper"}>
                <label htmlFor="label-edit-title">Title:</label>
                <input
                    type="text"
                    id="label-edit-title"
                    className={"modal-form-input"}
                    name="title"
                    value={labelData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={useLabelsStore.getState().isLoading}>
                {useLabelsStore.getState().isLoading ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
};