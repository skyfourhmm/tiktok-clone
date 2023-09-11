import Header from "../components/Header";
import Sidebar from "./Sidebar";


function DefaultLayout({children}) {
    return ( 
        <div className="container">
            <Header/>
            <div className="content flex mt-24">
                <Sidebar/>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;