import React, {useState,useEffect,useContext} from "react";

import '../styles/Producto.css';

import { Link } from "react-router-dom";

import { Card } from 'react-bootstrap'

import Button from 'react-bootstrap/Button'

import AuthContext from "../Context/AuthContext";



function Producto(props){


    var linkDetalle="/detalle/"+props.producto.id;

    const contex = useContext(AuthContext);

    const esAdmin = ()=>{

        var esAdm=false;

        if(contex.userIsLogged)
        {
            if(contex.userInfo)
            {
                if(contex.userInfo.perfil==="admin")
                {
                    esAdm=true;
                }
            }  
        }

        return esAdm;
    }


    const styles={
        prod:
        {
            boxShadow:"0px 0px 1px 2px #727272",
        
            backgroundColor: "rgb(227, 241, 243)",
        
            padding: "10px",
            textAlign:"center",
            margin: "0 auto"
        },
        
        tit:
        {
            fontWeight: "bolder"
        },
        
        pict:
        {
            
            maxWidth:"17rem",
            maxHeight: "250px",
            objectFit:'scale-down',
            paddingTop:"10px"
            
        },
        
        contPic:
        {
            display:"flex",
            margin: "0 auto",
            textAlign:"center",
            alignItems:"center",
            backgroundColor: "white",
            height:"270px",
            width:"17rem",
            backgroundSize: "cover",
            
        },

        precio:
        {
            color:"blue"
        }
    }

    useEffect(
        ()=>{
                        
               

        },[]
    )

    
        return(
            
            <>
                <AuthContext.Consumer>
                    {
                         context=>
                         <>
                                <Card style={{ width: '18rem' }}>
                                
                                    <div style={styles.contPic}>
                                        <Card.Img variant="top" src={props.producto.pictures[0].secure_url} style={styles.pict} />
                                    </div>
                                    
                                    <Card.Body>
                                        <Card.Title>{props.producto.title}</Card.Title>
                                        <Card.Text style={styles.precio}>
                                        ${props.producto.price}
                                        </Card.Text>
                                        <Link to={linkDetalle} >
                                                <button> Ver Detalle</button>
                                        </Link>
                                        <br></br>
                                        {
                                                         esAdmin() &&
                                                                <>
                                                                    <Button variant="danger" onClick={()=>props.handleDelete(props.producto.id)}>
                                                                        Eliminar
                                                                    </Button>
                                                                </>

                                                           
                                        }
                                        
                                        
                                    </Card.Body>

                                </Card>
                         </>
                    }

                   

                </AuthContext.Consumer>
              
            </>
        )
   
}
export default Producto;
