import {useState} from "react";

export const useModalManager = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    return { isOpen, closeModal, openModal };
}