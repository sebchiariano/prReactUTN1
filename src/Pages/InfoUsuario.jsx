import React from "react";

import AuthContext from "../Context/AuthContext";

function InfoUsuario(){


    return(
        <div style={{margin:"30px"}}>
            <AuthContext.Consumer>
                {
                    context=>
                    <>
                        {
                                        context.userIsLogged &&
                                        <>
                                            {
                                                context.userInfo &&
                                                <>
                                                    <h3 style={{marginBottom:"20px",paddingBottom:"5px",widht:"100%", borderBottom:"1px solid #000"}}>Informacion del Usuario</h3>
                                                    <p>
                                                        <b>Nombre:</b> {context.userInfo.nombre}
                                                    </p>
                                                    <p>
                                                        <b>Apellido:</b> {context.userInfo.apellido}
                                                    </p>
                                                    <p>
                                                        <b>Telefono:</b> {context.userInfo.telefono}
                                                    </p>
                                                    <p>
                                                        <b> Email:</b> {context.userInfo.email}
                                                    </p>
                                                    <p>
                                                        <b>Perfil:</b> {context.userInfo.perfil}
                                                    </p>
                                                    
                                                    
                                                </>
                                                
                                            }
                                            
                                            
                                                         
                                        </>
                        }
                    </>
                }
            </AuthContext.Consumer>
        </div>

    )
}
export default InfoUsuario