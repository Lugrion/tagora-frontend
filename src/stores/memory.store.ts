// src/stores/memory.store.ts
import {create} from 'zustand';
import {MemoryDTO} from '../types/memory';

interface CacheMemoriesStore {
    cacheMemories: MemoryDTO[];
    isLoading: boolean;
    setCacheMemories: (memories: MemoryDTO[]) => void;
    addMemoryToCache: (newMemory: MemoryDTO) => void;
    deleteMemoryFromCache: (id: number) => void;
    updateMemoryInCache: (updatedMemory: MemoryDTO) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useCacheMemoriesStore = create<CacheMemoriesStore>((set) => ({
    cacheMemories: [],
    isLoading: false,

    setIsLoading: (isLoading: boolean) => set({isLoading}),

    setCacheMemories: (memories: MemoryDTO[]) => set({cacheMemories: memories}),

    addMemoryToCache: (newMemory: MemoryDTO) => {
        set((state) => ({
            cacheMemories: [...state.cacheMemories, newMemory]
        }));
    },

    deleteMemoryFromCache: (id: number) => {
        set((state) => ({
            cacheMemories: state.cacheMemories.filter(memory => memory.id !== id)
        }));
    },

    updateMemoryInCache: (updatedMemory: MemoryDTO) => {
        set((state) => ({
            cacheMemories: state.cacheMemories.map(memory =>
                memory.id === updatedMemory.id ? updatedMemory : memory
            )
        }));
    }
}));