import { useLayoutEffect, useRef, useState } from "react";

export default function  TestComponent () {
    const [count, setCount] = useState(0);
    
    const countRef = useRef(count);
   
    useLayoutEffect(() => {
        countRef.current = count;
    }, [count]);

    const sendAnalytics = () => {
        console.log('Analytics sent:', countRef.current);
    };

    const handleClick = () => {
        setCount(100);  
        sendAnalytics();
    };
    
    return <>
        <button className="border px-2 mb-2" onClick={handleClick}>Click Me</button>
        <h5>{count}</h5>
    </>
};