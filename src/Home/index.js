import ScrollToTopOnReload from '../../src/components/ScrollToTopOnReload/index'
import { useEffect } from "react";

import Video from '../components/Video/index';

function Home() {

    useEffect(() => {
        document.getElementById('focus').focus()
    }, [])

    return (  
        <div id='focus' className="mt-9 ml-96 flex justify-center items-center w-screen flex-col snap-y snap-mandatory overflow-scroll ">
            <ScrollToTopOnReload/>
            <Video/>
        </div>
    );
}

export default Home;