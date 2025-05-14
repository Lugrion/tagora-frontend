import LabelCard from "../components/label/LabelCard.tsx";
import {MemoryCard} from "../components/memory/MemoryCard.tsx";
import {useDashboardManager} from "../hooks/useDashboardManager.tsx";
import {useAuthStore} from "../stores/auth.store.ts";
import {useEffect, useState} from "react";
import {LogoutButton} from "../components/auth/LogoutButton.tsx";
import {useLabelService} from "../hooks/services/useLabelService.tsx";
import {useMemoryService} from "../hooks/services/useMemoryService.tsx";
import {useCacheLabelsStore} from "../stores/label.store.ts";
import {mockLabels, mockMemories} from "../mockData.ts";
import {useCacheMemoriesStore} from "../stores/memory.store.ts";
import {RegisterModal} from "../components/modal/RegisterModal.tsx";
import {LoginModal} from "../components/modal/LoginModal.tsx";
import {LabelCreateModal} from "../components/modal/LabelCreateModal.tsx";
import {MemoryCreateModal} from "../components/modal/MemoryCreateModal.tsx";
import "../styles/Dashboard.css"

function Dashboard() {
    // Zustand stores
    const {
        selectedLabels,
        shownMemories,
        shownLabels,
        handleLabelClick,
        labelTextQuery,
        handleQueryChange
    } = useDashboardManager()

    const {getLabels} = useLabelService()
    const {getMemories} = useMemoryService()
    const [isLabelEditionActive, setIsLabelEditionActive] = useState<boolean>(false);
    const [isMemoryEditionActive, setIsMemoryEditionActive] = useState<boolean>(false);

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const setCacheLabels = useCacheLabelsStore(state => state.setCacheLabels)
    const setCacheMemories = useCacheMemoriesStore(state => state.setCacheMemories)

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                setCacheLabels(await getLabels())
                setCacheMemories(await getMemories())
            } else {
                setCacheLabels(mockLabels)
                setCacheMemories(mockMemories)
            }
        }
        fetchData()
    }, [isAuthenticated])

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <p>Aerolabels BETA</p>
                </div>
                <div className={"dashboard-search-query"}>
                    <label htmlFor="label-query">SEARCH LABEL NAMES</label>
                    <input
                        type="text"
                        value={labelTextQuery}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        placeholder="Search labels..."
                    />
                </div>
                <div className="auth-container">
                    {isAuthenticated ? (
                        <LogoutButton/>
                    ) : (
                        <>
                            <LoginModal/>
                            <RegisterModal/>
                        </>
                    )}
                </div>
            </nav>

            <div className="dashboard-container">
                <h3>Labels</h3>
                <LabelCreateModal/>
                <button onClick={() => setIsLabelEditionActive(!isLabelEditionActive)}>
                    Edit Labels
                </button>
                <div className="labels-container">
                    {shownLabels.map((label) => (
                        <LabelCard
                            key={label.id}
                            label={label}
                            isBeingEdited={isLabelEditionActive}
                            isSelected={selectedLabels.includes(label.id)}
                            onClick={() => handleLabelClick(label.id)}
                        />
                    ))}
                </div>

                <h3>Filtered Memories</h3>
                {/*Create Memory*/}
                <MemoryCreateModal/>
                <button onClick={() => setIsMemoryEditionActive(!isMemoryEditionActive)}>
                    Edit Memories
                </button>
                <div className="memories-container">
                    {shownMemories.length > 0 &&
                        shownMemories.map(memory => (
                            <MemoryCard
                                key={memory.id}
                                memory={memory}
                                isBeingEdited={isMemoryEditionActive}/>
                        ))}
                </div>
            </div>


        </>
    )
        ;
}

export default Dashboard;