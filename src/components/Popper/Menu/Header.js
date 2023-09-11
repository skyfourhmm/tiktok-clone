import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({title, onBack}) {
    return (
        <header className="flex items-center">
            <button className="px-7 py-5" onClick={onBack}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </button>
            <h4 className="ml-9">{title}</h4>
        </header>
    );
}

export default Header;