import {useEffect, useState} from "react";
import {MemoryDTO} from "../types/memory";
import {LabelDTO} from "../types/label";
import {useMemoriesStore} from "../stores/memory.store.ts";
import {useLabelsStore} from "../stores/label.store.ts";
import useDebounce from "./useDebounce.tsx";

export const useDashboardManager = () => {
    const cacheLabels = useLabelsStore(state => state.cacheLabels);
    const cacheMemories = useMemoriesStore(state => state.cacheMemories);
    const [labelTextQuery, setLabelTextQuery] = useState<string>("")
    const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
    const [shownLabels, setShownLabels] = useState<LabelDTO[]>([]);
    const [shownMemories, setShownMemories] = useState<MemoryDTO[]>([]);

    const debounceQuery = useDebounce(labelTextQuery);

    useEffect(() => {
        if (selectedLabels.length === 0) {
            setShownMemories(cacheMemories);
        } else {
            const matchMemories = cacheMemories.filter(memory => {
                const memoryLabelIds = memory.labels?.map(label => label.id) || [];
                return selectedLabels.every(selectedId =>
                    memoryLabelIds.includes(selectedId)
                );
            });
            setShownMemories(matchMemories);
        }
    }, [selectedLabels, cacheMemories]);

    // Filter labels when query changes
    useEffect(() => {
        if (debounceQuery.trim() === "") {
            setShownLabels(cacheLabels);
        } else {
            console.log(debounceQuery);
            const lowerQuery = debounceQuery.toLowerCase();
            const matchLabels = cacheLabels.filter(label =>
                label.title.toLowerCase().includes(lowerQuery)
            );
            setShownLabels(matchLabels);
        }
    }, [debounceQuery, cacheLabels]);

    const handleQueryChange = (query: string) => {
        setLabelTextQuery(query);
    };

    const handleLabelClick = (labelId: number) => {
        setSelectedLabels(prev =>
            prev.includes(labelId)
                ? prev.filter(id => id !== labelId)
                : [...prev, labelId]
        );
    };

    return {
        selectedLabels,
        setSelectedLabels,
        shownMemories,
        shownLabels,
        handleLabelClick,
        labelTextQuery,
        setLabelTextQuery,
        handleQueryChange
    }
}