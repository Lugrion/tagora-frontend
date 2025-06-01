import {LabelDTO} from "./label";

export interface MemoryDTO {
    id: number;
    name: string;
    url: string | undefined;
    labels: LabelDTO[];
}

export interface MemoryCardData {
    id: number;
    name: string;
    url: string | undefined;
    labelIds: number[];
}

export interface MemoryRequestDTO {
    name: string;
    url: string | undefined;
    labelIds: number[];
}