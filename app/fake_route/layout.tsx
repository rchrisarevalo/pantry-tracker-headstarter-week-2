interface FakeRouteLayout {
    children: React.ReactNode
}

const FakeLayout: React.FC<FakeRouteLayout> = ({children}) => {
    return (
        <div className="fake-layout">
            {children}
        </div>
    )
}

export default FakeLayout;