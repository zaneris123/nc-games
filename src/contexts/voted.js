import { createContext, useState } from "react";

export const VoteContext = createContext()

export const VoteProvider = ({children}) => {
    const [hasVoted, setHasVoted] = useState({})

    return (
        <VoteContext.Provider value={{ hasVoted, setHasVoted}}>
            {children}
        </VoteContext.Provider>
    )
}