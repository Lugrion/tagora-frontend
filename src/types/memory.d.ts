import {LabelDTO} from "./label";

export interface MemoryDTO {
    id: number;
    name: string;
    labels: LabelDTO[];
}

export interface MemoryCardData {
    id: number;
    name: string;
    labelIds: number[];
}

export interface MemoryRequestDTO {
    name: string;
    labelIds: number[];
}