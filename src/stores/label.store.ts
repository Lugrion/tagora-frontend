import { create } from "zustand";
import { LabelDTO } from "../types/label";

interface CacheLabelsStore {
    cacheLabels: LabelDTO[];
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setCacheLabels: (labels: LabelDTO[]) => void;
    addLabelToCache: (newLabel: LabelDTO) => void;
    deleteLabelFromCache: (id: number) => void;
    updateLabelInCache: (updatedLabel: LabelDTO) => void;
}

export const useCacheLabelsStore = create<CacheLabelsStore>((set) => ({
    cacheLabels: [],
    isLoading: false,

    setIsLoading: (isLoading) => set({ isLoading }),

    setCacheLabels: (labels) => set({ cacheLabels: labels }),

    addLabelToCache: (newLabel) =>
        set((state) => ({
            cacheLabels: [...state.cacheLabels, newLabel],
        })),

    deleteLabelFromCache: (id) =>
        set((state) => ({
            cacheLabels: state.cacheLabels.filter((label) => label.id !== id),
        })),

    updateLabelInCache: (updatedLabel) =>
        set((state) => ({
            cacheLabels: state.cacheLabels.map((label) =>
                label.id === updatedLabel.id ? updatedLabel : label
            ),
        })),
}));
