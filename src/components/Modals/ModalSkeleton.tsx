import React from "react";
import "./ModalSkeleton.css"
import ReactDOM from "react-dom";

interface ModalSkeletonProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const ModalSkeleton: React.FC<ModalSkeletonProps> = ({
                                                                isOpen,
                                                                onClose,
                                                                children
                                                            }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div
                role="dialog"
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}