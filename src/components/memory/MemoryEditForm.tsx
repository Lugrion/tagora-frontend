// src/components/MemoryEditForm.tsx
import React, {useEffect, useState} from "react";
import {MemoryCardData, MemoryDTO} from "../../types/memory";
import {useCacheMemoriesStore} from "../../stores/memory.store.ts";
import {useDashboardManager} from "../../hooks/useDashboardManager.tsx";
import LabelCard from "../label/LabelCard.tsx";
import {useMemoryService} from "../../hooks/services/useMemoryService.tsx";
import {useAuthStore} from "../../stores/auth.store.ts";

interface EditMemoryFormProps {
    currentMemoryData: MemoryDTO
    onSuccess?: () => void;
}

export const MemoryEditForm: React.FC<EditMemoryFormProps> = ({
                                                                  currentMemoryData,
                                                                  onSuccess
                                                              }) => {
    const updateMemoryInCache = useCacheMemoriesStore(state => state.updateMemoryInCache);
    const setIsLoading = useCacheMemoriesStore(state => state.setIsLoading);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    const [memoryData, setMemoryData] = useState<MemoryCardData>({
        id: currentMemoryData.id,
        name: currentMemoryData.name,
        labelIds: currentMemoryData.labels?.map(label => label.id) || [],
    });

    const [error, setError] = useState<string | null>(null);
    const {updateMemory} = useMemoryService();
    const {
        labelTextQuery,
        handleQueryChange,
        shownLabels,
        selectedLabels,
        setSelectedLabels,
        handleLabelClick
    } = useDashboardManager();

    // Initialize selected labels
    useEffect(() => {
        setSelectedLabels(currentMemoryData.labels?.map(label => label.id) || []);
    }, [currentMemoryData.labels, setSelectedLabels]);

    // Update memory data when selected labels change
    useEffect(() => {
        setMemoryData(prev => ({
            ...prev,
            labelIds: selectedLabels,
        }));
    }, [selectedLabels]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isAuthenticated) {
                const updatedMemory = await updateMemory(currentMemoryData.id, memoryData);
                updateMemoryInCache(updatedMemory);
            } else {
                // For mock data, create updated memory object
                const updatedMemory: MemoryDTO = {
                    id: memoryData.id,
                    name: memoryData.name,
                    labels: shownLabels.filter(label =>
                        memoryData.labelIds.includes(label.id)
                    )
                };
                updateMemoryInCache(updatedMemory);
            }

            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Memory update failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setMemoryData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Edit Memory</h3>

            {error && <div className="error-message">{error}</div>}

            <div>
                <label htmlFor="memory-edit-name">Name:</label>
                <input
                    type="text"
                    id="memory-edit-name"
                    name="name"
                    value={memoryData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <label htmlFor="label-query">Label Query:</label>
            <input
                type="text"
                id="label-query"
                name="query"
                value={labelTextQuery}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search labels..."
            />

            <div className="labels-container">
                {shownLabels.map((label) => (
                    <LabelCard
                        key={label.id}
                        label={label}
                        isBeingEdited={false}
                        isSelected={selectedLabels.includes(label.id)}
                        onClick={() => handleLabelClick(label.id)}
                    />
                ))}
            </div>

            <button type="submit" disabled={useCacheMemoriesStore.getState().isLoading}>
                {useCacheMemoriesStore.getState().isLoading ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
};