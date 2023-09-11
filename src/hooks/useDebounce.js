import { useEffect, useState } from "react";

function useDebounce(value, delayTime) {

    const [debounce, setDebounce] = useState(value)

    useEffect( () => {
        const handler = setTimeout(() => {
            setDebounce(value)
        }, delayTime);

        return () => clearTimeout(handler)
    }, [value])

    return debounce
}

export default useDebounce;