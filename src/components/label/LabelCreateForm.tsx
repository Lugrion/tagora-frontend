import {LabelRequestDTO} from "../../types/label";
import React, {useState} from "react";
import {useCacheLabelsStore} from "../../stores/label.store.ts";
import {useLabelService} from "../../hooks/services/useLabelService.tsx";

interface LabelCreateFormProps {
    onSuccess: () => void;
}

export const LabelCreateForm: React.FC<LabelCreateFormProps> = ({onSuccess}) => {
    const addLabelToCache = useCacheLabelsStore(state => state.addLabelToCache)

    const [labelData, setLabelData] = useState<LabelRequestDTO>({
        title: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {createLabel} = useLabelService()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Should just add to cache if NO AUTH
            const newLabel = await createLabel(labelData);
            console.log('Label creation successful:', newLabel);
            addLabelToCache(newLabel);
            onSuccess()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Label creation failed');
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
            <h3>Create Label</h3>

            {error && <div className="error-message">{error}</div>}

            <div>
                <label htmlFor="label-create-title">Title:</label>
                <input
                    type="text"
                    id="label-create-title"
                    name="title"
                    value={labelData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Label'}
            </button>
        </form>
    );
}