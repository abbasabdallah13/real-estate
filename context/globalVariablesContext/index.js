const { createContext, useState } = require("react");

const GlobalVariablesContext = createContext();

export function GlobalVariablesProvider({ children }) {
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    

    return (
        <GlobalVariablesContext.Provider value={{ search, setSearch, loading, setLoading }}>
            { children }
        </GlobalVariablesContext.Provider>
    )
    
}

export default GlobalVariablesContext