interface LoginLayoutProps {
    children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({children}) => {
    return (
        <div className="min-h-screen flex flex-row justify-center items-center space-y-5 bg-white">
            {children}
        </div>
    )
}

export default LoginLayout;