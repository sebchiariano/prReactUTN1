import React, {useContext} from "react"

import "../styles/Menu.css";

import {
    Link
} from "react-router-dom"

import {Navbar,Nav, NavDropdown} from 'react-bootstrap'

import AuthContext from "../Context/AuthContext";


import { useHistory } from "react-router-dom";


function Menu (){

    const styles={
        logo:
        {
            paddingLeft:'20px'
        },

        navlink:
        {
            width:'100px',
            textAlign:'center',
            fontWeight: 'bolder'
        },

        navLog:
        {
            color:'white',
            width:'100px',
            textAlign:'center',
            fontWeight: 'bolder'
        }
    }

    const contex = useContext(AuthContext);

    const history = useHistory();

    const logout = ()=>{
        contex.logoutUser();
        history.push("/login");
    }

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
        <>
            <AuthContext.Consumer>
                {
                    context=>
                    <>
                        <Navbar bg="dark" variant="dark">
                    
                            <Navbar.Brand as={Link} to="/" style={styles.logo}>E-Com</Navbar.Brand>
                            <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/" style={styles.navlink}>Home</Nav.Link>
                                    
                                  
                                    
                                    {
                                        esAdmin() &&
                                                <>
                                                    <NavDropdown title="Productos" id="basic-nav-dropdown" style={styles.navlink}>
                                                        <NavDropdown.Item as={Link} to="/producto/alta" bg="dark">Alta</NavDropdown.Item>
                                                    </NavDropdown>
                                                                                                
                                                </>
                                          

                                    }

                                    
                            </Nav>

                            <Nav>
                                    {
                                        !context.userIsLogged &&
                                        <>
                                            <Nav.Link as={Link} to="/Registro" style={styles.navLog}>Registro</Nav.Link>
                                            <Nav.Link as={Link} to="/Login" style={styles.navLog}>Login</Nav.Link>
                                        </>
                                    }
                                    {console.log("contesx user info",context.userInfo)}
                                    {
                                        context.userIsLogged &&
                                        <>
                                            {
                                                context.userInfo &&
                                                <>
                                                    <NavDropdown 
                                                    title={
                                                            <>
                                                            <img className="thumbnail-image" 
                                                                src="userIcon.png" 
                                                                alt=""
                                                                style={{maxWidth:"35px",maxHeight:"35px", paddingRight:"8px"}}
                                                            />
                                                            {context.userInfo.email}
                                                            </>
                                                    }>

                                                        <NavDropdown.Item as={Link} to="/InfoUsuario">
                                                            Informacion del Usuario                                                           
                                                        </NavDropdown.Item>
                                                        <NavDropdown.Item onClick={logout}>
                                                            Salir
                                                        </NavDropdown.Item>
                                                    </NavDropdown>
                                                </>
                                                
                                            }
                                            {
                                                !context.userInfo &&
                                                <>
                                                    <NavDropdown 
                                                    title={
                                                        <>
                                                        <img className="thumbnail-image" 
                                                            src="userIcon.png" 
                                                            alt=""
                                                            style={{maxWidth:"35px",maxHeight:"35px", paddingRight:"8px"}}
                                                        />
                                                        </>
                                                    }>
                                                        <NavDropdown.Item as={Link} to="/InfoUsuario">Informacion del Usuario</NavDropdown.Item>
                                                        <NavDropdown.Item onClick={logout} >Salir</NavDropdown.Item>
                                                    </NavDropdown>
                                                </>
                                            }
                                            
                                            
                                                         
                                        </>
                                    }
                                   
                            </Nav>
                            
                        </Navbar>

                    </>
                }

                

            </AuthContext.Consumer>
        </>
    )

}

export default Menu;