import {create} from 'zustand';
import {MemoryDTO, MemoryRequestDTO} from '../types/memory';
import {mockMemories} from "../mockData.ts";

interface MemoriesStore {
    cacheMemories: MemoryDTO[];
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setCacheMemories: (memories: MemoryDTO[]) => void;

    getMemories: () => Promise<MemoryDTO[]>;
    createMemory: (memoryData: MemoryRequestDTO) => Promise<MemoryDTO>;
    updateMemory: (id: number, memoryData: MemoryRequestDTO) => Promise<MemoryDTO>;
    deleteMemory: (id: number) => Promise<void>;

    resetCacheMemoriesAPI: () => Promise<void>;
    resetCacheMemoriesMock: () => void;

    addMemoryToCache: (newMemory: MemoryDTO) => void;
    deleteMemoryFromCache: (id: number) => void;
    updateMemoryInCache: (updatedMemory: MemoryDTO) => void;
}

export const useMemoriesStore = create<MemoriesStore>((set, get) => ({
    cacheMemories: [],
    isLoading: false,

    setIsLoading: (isLoading: boolean) => set({isLoading}),

    setCacheMemories: (memories: MemoryDTO[]) => set({cacheMemories: memories}),

    getMemories: async (): Promise<MemoryDTO[]> => {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');

        const res = await fetch('/api/memory', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch memories (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[memoryService] Fetching memories:`, response);
        return response as MemoryDTO[];
    },

    createMemory: async (memoryData: MemoryRequestDTO) => {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');

        const res = await fetch('/api/memory', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memoryData),
        });

        if (!res.ok) {
            throw new Error(`Failed to create memory (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[memoryService] Creating memory:`, response);
        return response as MemoryDTO;
    },

    updateMemory: async (id: number, memoryData: MemoryRequestDTO) => {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');

        const res = await fetch(`/api/memory/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memoryData),
        });

        if (!res.ok) {
            throw new Error(`Failed to update memory (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[memoryService] Updating memory:`, response);
        return response as MemoryDTO;
    },

    deleteMemory: async (id: number) => {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');

        const res = await fetch(`/api/memory/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete memory (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[memoryService] Deleting memory:`, response);
        return response;
    },

    resetCacheMemoriesAPI: async () => {
        const {setCacheMemories, getMemories} = get();
        try {
            const memories = await getMemories();
            setCacheMemories(memories);
        } catch (e) {
            console.error('[resetCacheMemories] Failed to reset memories from API:', e);
        }
    },

    resetCacheMemoriesMock: () => {
        get().setCacheMemories(mockMemories);
    },

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