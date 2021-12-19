import React, {useContext} from "react";

import Home from '../Pages/Home'
import Detalle from '../Pages/DetalleNode'
import Compra from '../Pages/CompraNode'
import Menu from '../Components/Menu'
import Footer from '../Components/Footer'
import NotFound from '../Components/NotFound';
import Login from '../Pages/Login';
import Registro from '../Pages/RegistroRHFFormGroup'
import InfoUsuario from '../Pages/InfoUsuario'

import AltaProducto from '../Pages/ABMProductos/AltaProductoNode'
import ModificacionProducto from '../Pages/ABMProductos/ModificacionProductoNode'

import '../styles/Public.css'

import AuthContext from '../Context/AuthContext'

import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom"


function Public(){

    const contex = useContext(AuthContext);

    const esAdmin = ()=>{

        var esAdm=false;

        if(contex.userIsLogged)
        {
            if(contex.userInfo)
            {
                if(contex.userInfo.perfil=="admin")
                {
                    esAdm=true;
                }
            }  
        }

        return esAdm;
    }

    return(
        <div className="pag">

                    <div>
                        <Menu />
                    </div>
             
                    <div className='cont'>
                            <AuthContext.Consumer>
                            {
                                context=>
                                <>
                                        <Switch>

                                                <Route path="/detalle/:id">
                                                    <Detalle />
                                                </Route>

                                                {
                                                    context.userIsLogged && 
                                                        <Route path="/compra/:id">
                                                            <Compra />
                                                        </Route>
                                                }
                                               
                                                         
                                                {
                                                        esAdmin() &&
                                                                        <Route path="/producto/alta">
                                                                            <AltaProducto />
                                                                        </Route>
                                                }

                                                {
                                                        esAdmin() &&
                                                                        <Route path="/Modificacion/:id">
                                                                            <ModificacionProducto />
                                                                        </Route>
                                                }
                                              
                                               

                                                {
                                                    context.userIsLogged &&
                                                        <Route path="/InfoUsuario">
                                                            <InfoUsuario />
                                                        </Route>
                                                }
                                            
                                                {
                                                    !context.userIsLogged &&
                                                    <Route path="/Registro">
                                                        <Registro />
                                                    </Route>
                                                }

                                                {
                                                    !context.userIsLogged &&
                                                    <Route path="/Login">
                                                        <Login />
                                                    </Route>
                                                }

                                                <Redirect path="/Home" to="/"></Redirect>
                                                <Route path="/" exact>
                                                    <Home />
                                                </Route>

                                                <Route path="*">
                                                    <NotFound />
                                                </Route>

                                        </Switch>
                                </>
                            }
                            </AuthContext.Consumer>
                        
                    </div>
                
              
                    <div className="foot" style={{backgroundColor:"#4B5066", color:"white"}}>
                        <Footer />
                    </div>
              
        
        </div>
            
    )

}

export default Public;