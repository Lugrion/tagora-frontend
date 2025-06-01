import React, {useEffect, useState} from "react";
import {MemoryDTO, MemoryRequestDTO} from "../../../types/memory";
import {useMemoriesStore} from "../../../stores/memory.store.ts";
import {useDashboardManager} from "../../../hooks/useDashboardManager.tsx";
import LabelCard from "../../Cards/LabelCard/LabelCard.tsx";
import {useAuthStore} from "../../../stores/auth.store.ts";

interface MemoryCreateFormProps {
    onSuccess: () => void;
}

export const CreateMemoryForm: React.FC<MemoryCreateFormProps> = ({onSuccess}) => {
    const addMemoryToCache = useMemoriesStore(state => state.addMemoryToCache);
    const createMemory = useMemoriesStore(state => state.createMemory);
    const cacheMemories = useMemoriesStore(state => state.cacheMemories);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const [memoryData, setMemoryData] = useState<MemoryRequestDTO>({
        name: '',
        url: '',
        labelIds: [],
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {
        labelTextQuery,
        setLabelTextQuery,
        handleQueryChange,
        shownLabels,
        selectedLabels,
        setSelectedLabels,
        handleLabelClick
    } = useDashboardManager()

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
                const newMemory = await createMemory(memoryData);
                addMemoryToCache(newMemory);
                console.log('Memory creation successful:', newMemory);
            } else {
                const newMemory: MemoryDTO = {
                    id: Math.max(...cacheMemories.map(m => m.id)) + 1,
                    name: memoryData.name,
                    url: memoryData.url,
                    labels: shownLabels.filter(label =>
                        memoryData.labelIds.includes(label.id)
                    )
                };
                addMemoryToCache(newMemory);
                console.log('LocalMemory creation successful:', newMemory);
            }
            resetForm();
            onSuccess()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Memory creation failed');
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

    const resetForm = () => {
        setLabelTextQuery("")
        setSelectedLabels([])
        setMemoryData({
            name: '',
            url: undefined,
            labelIds: []
        })
    }

    return (
        <form className={"form-wrapper"} onSubmit={handleSubmit}>
            <h3>Create Memory</h3>

            <div className={"input-wrapper"}>
                <label htmlFor="memory-create-name">Name:</label>
                <input
                    type="text"
                    id="memory-create-name"
                    className={"modal-form-input"}
                    name="name"
                    value={memoryData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={"input-wrapper"}>
                <label htmlFor="memory-create-url">URL:</label>
                <input
                    type="text"
                    id="memory-create-url"
                    name="url"
                    value={memoryData.url}
                    onChange={handleChange}
                />
            </div>

            <div className={"input-wrapper"}>
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
                            onClick={() => handleLabelClick(label.id)}/>
                    ))}
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Memory'}
            </button>
        </form>
    );
}