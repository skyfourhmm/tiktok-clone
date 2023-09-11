function Notifications({data = []}) {

    let currentNotifi = data.length
    
    if(currentNotifi.length > 999) {
        currentNotifi = '999+'
    }

    return (
        <div className="absolute text-xl bg-red-500 text-white font-extrabold px-2 py-1 rounded-full -top-2 -right-2">{currentNotifi}</div>
    );
}

export default Notifications;