import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Image from "../Image";

function AccountItem({data}) {
    return ( <Link to={`/@${data.nickname}`} className="flex items-center py-3 px-5 cursor-pointer hover:bg-zinc-200">
        <div className="overflow-hidden rounded-full w-16 h-16 mr-6">
        <Image src={data.avatar}
            alt={data.last_name}
            small
        />
        </div>
        <div>
            <div className="flex items-center">
                <h4 className="font-bold mr-3">{data.nickname}</h4>
                {data.tick && <FontAwesomeIcon className="text-sky-400" icon={faCircleCheck}/>}
            </div>
            <span className="text-gray-400 text-xl">{data.first_name + data.last_name}</span>
        </div>
    </Link> );
}

export default AccountItem;