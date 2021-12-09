import React from "react"

import '../styles/Registro.css'


function FormGroup (props){
        const {label,type,register} = props

        const wid = props.wid;

        return(
            <>
                <div className="divForm">
                    <label>{label}</label>
                    {console.log("wid",wid)}
                    <input className="inpText" style={{width:wid}} type={type || "text"} {...register} />

                </div>
            </>
        )
      
    
    
    
}
export default FormGroup