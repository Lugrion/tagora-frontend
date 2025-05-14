import {LabelDTO, LabelRequestDTO} from "../../types/label";

export const useLabelService = () => {

    const getLabels = async (): Promise<LabelDTO[]> => {
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
    }

    const createLabel = async (labelData: LabelRequestDTO) => {
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
        return response;
    }

    const updateLabel = async (labelData: LabelDTO) => {
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
        return response
    }

    const deleteLabel = async (id: number) => {
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
    }

    return {getLabels, createLabel, updateLabel, deleteLabel};
}