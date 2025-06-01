import LabelCard from "../components/Cards/LabelCard/LabelCard.tsx";
import {MemoryCard} from "../components/Cards/MemoryCard/MemoryCard.tsx";
import {useDashboardManager} from "../hooks/useDashboardManager.tsx";
import {useAuthStore} from "../stores/auth.store.ts";
import {useState} from "react";
import {LogoutButton} from "../components/Buttons/LogoutButton.tsx";
import {RegisterModal} from "../components/Modals/RegisterModal/RegisterModal.tsx";
import {LoginModal} from "../components/Modals/LoginModal/LoginModal.tsx";
import {CreateMemoryModal} from "../components/Modals/CreateMemoryModal/CreateMemoryModal.tsx";
import "../styles/components/Dashboard.css"
import "../styles/components/NavBar.css"
import EditIcon from '@mui/icons-material/Edit';
import {CreateLabelModal} from "../components/Modals/CreateLabelModal/CreateLabelModal.tsx";

function Dashboard() {
    const {
        selectedLabels,
        shownMemories,
        shownLabels,
        handleLabelClick,
        labelTextQuery,
        handleQueryChange
    } = useDashboardManager()

    const [isLabelEditionActive, setIsLabelEditionActive] = useState<boolean>(false);
    const [isMemoryEditionActive, setIsMemoryEditionActive] = useState<boolean>(false);

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <p>Tagora BETA</p>
                </div>
                <input
                    type="text"
                    value={labelTextQuery}
                    className="navbar-search"
                    onChange={(e) => handleQueryChange(e.target.value)}
                    placeholder="Search labels..."
                />
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
                <div className={"dashboard-label"}>
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
                    <div className="label-options-container">
                        <CreateLabelModal/>
                        <button className={"label-edit-option-btn"}
                                onClick={() => setIsLabelEditionActive(!isLabelEditionActive)}>
                            <EditIcon/>
                        </button>
                    </div>
                </div>


                {/*Create Memory*/}

                <div className={"dashboard-memory"}>
                    <div className="memories-container">
                        {shownMemories.length > 0 &&
                            shownMemories.map(memory => (
                                <MemoryCard
                                    key={memory.id}
                                    memory={memory}
                                    isBeingEdited={isMemoryEditionActive}/>
                            ))}
                    </div>
                    <div className={"memory-options-container"}>
                        <CreateMemoryModal/>
                        <button className={"memory-edit-option-btn"}
                                onClick={() => setIsMemoryEditionActive(!isMemoryEditionActive)}>
                            <EditIcon/>
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Dashboard;