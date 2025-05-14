import {MemoryDTO, MemoryRequestDTO} from "../../types/memory";

export const useMemoryService = () => {
    const getMemories = async (): Promise<MemoryDTO[]> => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            throw new Error('No access token found');
        }

        const res = await fetch("/api/memory", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch memories (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[memoryService] Fetching memories:`, response);
        return response as MemoryDTO[];
    }

    const createMemory = async (memoryData: MemoryRequestDTO) => {
        const token = localStorage.getItem('accessToken');
        const res = await fetch("/api/memory", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memoryData),
        });

        if (!res.ok) {
            throw new Error(`Failed to create memory (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[memoryService] Creating memory:`, response);
        return response
    }

    const updateMemory = async (id: number, memoryData: MemoryRequestDTO) => {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`/api/memory/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memoryData),
        })

        if (!res.ok) {
            throw new Error(`Failed to update memory (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[memoryService] Updating memory:`, response);
        return response;
    }

    const deleteMemory = async (id: number) => {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`/api/memory/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!res.ok) {
            throw new Error(`Failed to create memory (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[memoryService] Deleting memory:`, response);
        return response;
    }

    return {getMemories, createMemory, updateMemory, deleteMemory}
}