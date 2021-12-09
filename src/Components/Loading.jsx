import React from "react"
import Spinner from 'react-bootstrap/Spinner'
function Loading (props)
{
    const {active}=props;

    if(active)
    {
        return(
          
                <div style={{textAlign:"center",padding:"15vmin"}}>
                   <Spinner as="span" animation="border" role="status" aria-hidden="true" variant="info" style={{width:"13vmax", height:"13vmax", margin:"0px auto"}}/>
                </div>
        )
    }
    else
    {
        return(
            <>
                {props.children}
            </>
        )
    }
   
}
export default Loading