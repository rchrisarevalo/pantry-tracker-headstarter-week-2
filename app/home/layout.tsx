import React from "react";

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    return (
        <div className="home-layout">
            { children }
        </div>
    )
}

export default HomeLayout;