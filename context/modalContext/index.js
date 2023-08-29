import { createContext, useState } from "react";

const modalContext = createContext();


export function ModalContextProvider ({children}) {
    const [openModal, setOpenModal] = useState(false);
    return (
        <modalContext.Provider value={{ openModal, setOpenModal }}>
            {children}
        </modalContext.Provider>
    )
}

export default modalContext;
