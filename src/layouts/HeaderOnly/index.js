import Header from "../components/Header";

function HeaderOnly({children}) {
    return (
        <div className="container">
            <Header/>
            <div className="content flex mt-24">
                {children}
            </div>
        </div>
    );
}

export default HeaderOnly;