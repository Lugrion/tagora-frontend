// src/components/MemoryEditForm.tsx
import React, {useState} from "react";
import {useAuthStore} from "../../stores/auth.store.ts";
import {LabelDTO} from "../../types/label";
import {useLabelService} from "../../hooks/services/useLabelService.tsx";
import {useCacheLabelsStore} from "../../stores/label.store.ts";

interface LabelEditFormProps {
    currentLabelData: LabelDTO;
    onSuccess: () => void;
}

export const LabelEditForm: React.FC<LabelEditFormProps> = ({
                                                                currentLabelData,
                                                                onSuccess
                                                            }) => {
    const updateLabelInCache = useCacheLabelsStore(state => state.updateLabelInCache);
    const setIsLoading = useCacheLabelsStore(state => state.setIsLoading);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    const [labelData, setLabelData] = useState<LabelDTO>(currentLabelData);

    const [error, setError] = useState<string | null>(null);
    const {updateLabel} = useLabelService();

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
        <form onSubmit={handleSubmit}>
            <h3>Edit Label</h3>

            {error && <div className="error-message">{error}</div>}

            <div>
                <label htmlFor="label-edit-title">Title:</label>
                <input
                    type="text"
                    id="label-edit-title"
                    name="title"
                    value={labelData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" disabled={useCacheLabelsStore.getState().isLoading}>
                {useCacheLabelsStore.getState().isLoading ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
};