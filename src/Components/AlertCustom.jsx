import React from "react";
import {Alert} from 'react-bootstrap'

function AlertCustom(props){
    const styles={
        alert:{
            marginTop:"10px",
            textAlign:"center"
        }
    }

    const {variant,text} = props;

    return(
        <div style={{textAlign:"center"}}>
            <br />
            <Alert variant={variant} styles={styles.alert}>
                 {text}
            </Alert>
        </div>
        
    )
}
export default AlertCustom