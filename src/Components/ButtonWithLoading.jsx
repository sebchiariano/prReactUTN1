
import React, {useState} from "react";
import {Spinner} from 'react-bootstrap'



function ButtonWithLoading(props){
    const {variant,type,loading} = props;
    const [hover, setHover] = useState(false);


    const styles= {
        buttonNormal: {
            borderColor: "rgb(54, 52, 52)",
            color: "linen",
            backgroundColor: "rgb(54, 52, 52)",
            padding: "10px",
         },

         buttonHover: {
            borderColor:"rgb(80, 85, 87)",
            backgroundColor:"rgb(80, 85, 87)",
            color:"white"   
        }
        
    }

    return(
        <button
        type={type || "submit"}
        variant={variant || "primary"}
        disabled={loading}

        onMouseEnter={()=>{
            setHover(true);
        }}
        onMouseLeave={()=>{
            setHover(false);
        }}
        style={{
            ...styles.buttonNormal,
            ...(hover ? styles.buttonHover : null)
          }}
        >
            

            {
                loading &&
                <Spinner animation="border" size="sm" />
            }

            {props.children}
            
        </button>
    )
}
export default ButtonWithLoading;