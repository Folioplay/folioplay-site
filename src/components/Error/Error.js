import React, {useEffect} from 'react'

import { useNavigate } from "react-router-dom";

function Error() {
    const navigate = useNavigate();
    useEffect(()=>{
  
        
        navigate("/");
        React.pageview(window.location.pathname + window.location.search);
    },[])

  return (
   <> 
   
   </>
  )
}

export default Error