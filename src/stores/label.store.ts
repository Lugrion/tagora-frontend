import {create} from "zustand";
import {LabelDTO, LabelRequestDTO} from "../types/label";
import {useMemoriesStore} from "./memory.store.ts";
import {mockLabels} from "../mockData.ts";

interface LabelsStore {
    cacheLabels: LabelDTO[];
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setCacheLabels: (labels: LabelDTO[]) => void;

    getLabels: () => Promise<LabelDTO[]>;
    createLabel: (labelData: LabelRequestDTO) => Promise<LabelDTO>;
    updateLabel: (labelData: LabelDTO) => Promise<LabelDTO>;
    deleteLabel: (id: number) => Promise<void>;

    resetCacheLabelsAPI: () => Promise<void>;
    resetCacheLabelsMock: () => void;

    addLabelToCache: (newLabel: LabelDTO) => void;
    deleteLabelFromCache: (id: number) => void;
    updateLabelInCache: (updatedLabel: LabelDTO) => void;
}

export const useLabelsStore = create<LabelsStore>((set, get) => ({
    cacheLabels: [],
    isLoading: false,

    setIsLoading: (isLoading) => set({isLoading}),

    setCacheLabels: (labels) => set({cacheLabels: labels}),

    getLabels: async (): Promise<LabelDTO[]> => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No access token found');
        }

        const res = await fetch("/api/label", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch labels (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[labelService] Fetching labels:`, response);
        return response as LabelDTO[];
    },

    createLabel: async (labelData: LabelRequestDTO) => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No access token found');
        }

        const res = await fetch("/api/label", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(labelData),
        });

        if (!res.ok) {
            throw new Error(`Failed to create label (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[labelService] Creating label:`, response);
        return response as LabelDTO;
    },

    updateLabel: async (labelData: LabelDTO) => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No access token found');
        }

        const res = await fetch(`/api/label/${labelData.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(labelData),
        });

        if (!res.ok) {
            throw new Error(`Failed to create label (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[labelService] Updating label:`, response);
        return response as LabelDTO;
    },

    deleteLabel: async (id: number) => {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`/api/label/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!res.ok) {
            throw new Error(`Failed to delete label (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[labelService] Delete label:`, response);
        return response
    },

    resetCacheLabelsAPI: async () => {
        const {setCacheLabels, getLabels} = get();
        try {
            const labels = await getLabels();
            setCacheLabels(labels);
        } catch (e) {
            console.error('[resetCacheLabels] Failed to reset labels:', e);
        }
    },

    resetCacheLabelsMock: () => {
        get().setCacheLabels(mockLabels);
    },

    addLabelToCache: (newLabel) =>
        set((state) => ({
            cacheLabels: [...state.cacheLabels, newLabel],
        })),

    deleteLabelFromCache: (id) =>
        set((state) => ({
            cacheLabels: state.cacheLabels.filter((label) => label.id !== id),
        })),

    updateLabelInCache: (updatedLabel) => {
        set((state) => ({
            cacheLabels: state.cacheLabels.map((label) =>
                label.id === updatedLabel.id ? updatedLabel : label
            ),
        }));

        const {cacheMemories, setCacheMemories} = useMemoriesStore.getState();

        const updatedMemories = cacheMemories.map((memory) => ({
            ...memory,
            labels: memory.labels.map((label) =>
                label.id === updatedLabel.id ? updatedLabel : label
            ),
        }));

        setCacheMemories(updatedMemories);
    },
}));
