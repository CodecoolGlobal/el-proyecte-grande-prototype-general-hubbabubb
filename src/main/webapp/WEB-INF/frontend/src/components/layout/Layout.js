import Header from "./Header";

function Layout(props) {
    return <div className="main">
        <Header />
        <main >
            {props.children}
        </main>
    </div>
}

export default Layout;