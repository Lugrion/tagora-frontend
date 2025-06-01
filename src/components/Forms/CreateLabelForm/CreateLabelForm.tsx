import {LabelDTO, LabelRequestDTO} from "../../../types/label";
import React, {useState} from "react";
import {useLabelsStore} from "../../../stores/label.store.ts";
import {useAuthStore} from "../../../stores/auth.store.ts";

interface LabelCreateFormProps {
    onSuccess: () => void;
}

export const CreateLabelForm: React.FC<LabelCreateFormProps> = ({onSuccess}) => {
    const addLabelToCache = useLabelsStore(state => state.addLabelToCache)
    const cacheLabels = useLabelsStore(state => state.cacheLabels)
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    const [labelData, setLabelData] = useState<LabelRequestDTO>({
        title: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const createLabel = useLabelsStore(set => set.createLabel)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Should just add to cache if NO AUTH
            if (isAuthenticated) {
                const newLabel = await createLabel(labelData);
                console.log('Label creation successful ONLINE:', newLabel);
                addLabelToCache(newLabel);
            } else {
                const newLabel: LabelDTO = {
                    id: Math.max(...cacheLabels.map(l => l.id)) + 1,
                    title: labelData.title
                }
                addLabelToCache(newLabel);
                console.log('Label creation successful LOCAL:', newLabel);
            }
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
        <form className={"form-wrapper"} onSubmit={handleSubmit}>
            <h3>Create Label</h3>
            <div className={"input-wrapper"}>
                <label htmlFor="label-create-title">Title:</label>
                <input
                    type="text"
                    id="label-create-title"
                    className={"modal-form-input"}
                    name="title"
                    value={labelData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Label'}
            </button>
        </form>
    );
}