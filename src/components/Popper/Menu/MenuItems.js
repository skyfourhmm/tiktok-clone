import { Link } from "react-router-dom";

function MenuItems({data, onClick}) {
    let Comp = 'button'

    if(data.to) {
        Comp = Link
    }
    
    let classBase = 'flex py-3 p-5 hover:bg-gray-100 w-full flex items-center '

    if(data.separation) {
        classBase = classBase.concat('border-t border-gray-200 border-solid')
    }

    return (
        <Comp to={data.to} className={classBase} onClick = {onClick}>
            {data.icon && <span className="mr-2">{data.icon}</span>}
            <span className="ml-3 whitespace-nowrap">{data.title}</span>
        </Comp>        
    );
}

export default MenuItems;