import { NavLink ,useLocation} from "react-router-dom";

function MenuItem({to, icon, title, iconActive}) {

    const location = useLocation();
    const isActiveMenu = location.pathname === to;

    return (
        <NavLink 
        to={to}
        className={"p-4 text-4xl hover:bg-gray-100 flex items-center"}
        >
            {isActiveMenu ? iconActive : icon}
            <span className="font-bold pl-4 grow">{title}</span>
        </NavLink>
    );
}

export default MenuItem;