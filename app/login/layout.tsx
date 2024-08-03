import React from "react";

interface LoginLayoutProps {
    children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <div className="login-layout">
            { children }
        </div>
    )
}

export default LoginLayout;