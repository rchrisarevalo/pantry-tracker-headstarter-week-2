import React from "react";

interface PantryLayoutProps {
    children: React.ReactNode
}

const PantryLayout: React.FC<PantryLayoutProps> = ({ children }) => {
    return (
        <div className="pantry-layout">
            { children }
        </div>
    )
}

export default PantryLayout;