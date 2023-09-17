import { useEffect, useState } from "react";
import { fetchAnUser } from "../apiServices/userServices.js";
import HeaderProfile from "./components/HeaderProfile";
import { useLocation } from "react-router-dom"; 

function Profile() {
    const location = useLocation();
    const [dataUser, setDataUser] = useState({})

    useEffect( ()=> {
        window.scrollTo(0, 0);
        async function fetchData() {
            let res = await fetchAnUser(location.pathname)
            setDataUser(res)
        }
        fetchData()
    }, [location.pathname])

    return (  
        <div className="ml-[280px] px-6 py-8 relative">
            <HeaderProfile data={dataUser.data}/>

        </div>
    );
}

export default Profile;