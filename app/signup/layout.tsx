import React from "react";

interface SignUpLayoutProps {
    children: React.ReactNode
}

const SignUpProps: React.FC<SignUpLayoutProps> = ({ children }) => {
    return (
        <div className="signup-layout">
            { children }
        </div>
    )
}

export default SignUpProps;