import React, {useState,useEffect,useContext} from "react";
import '../styles/Detalle.css';

import { useParams, useHistory } from "react-router-dom";

import Fotos from '../Components/Fotos'
import Loading from '../Components/Loading'

import firebase from '../config/firebase';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button'

import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

import AuthContext from "../Context/AuthContext";

function Detalle(props){

    
    const [producto,setProducto] = useState();
    const [loading,setLoading] = useState(true);

    const [cantDisponible, setCantDisponible] = useState('');

    const params=useParams();

    const history = useHistory();

    var linkCompra="/compra/"+params.id;
    var linkModif="/Modificacion/"+params.id;

    // MANEJO MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowModal = () => setShow(true);
    //

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

    const comprar = ()=>{
        if(contex.userIsLogged)
        {
            history.push(linkCompra);
        }
        else
        {
            alert("Para realizar una compra debe estar logueado en el sistema.")
        }
    }

    const handleDelete = async () =>{
        try{
             const consultaBase = await firebase.db.doc("productos/"+params.id)
             .delete();
             alert("Se ha eliminado el producto");
             history.push("/");
        }
        catch(e)
        {
            console.log(e)
        }
    }

    async function request(){
        try{
            const consultaBase = await firebase.db.doc("productos/"+params.id)
            .get()

            if(consultaBase){
                
                setProducto(consultaBase)
                setCantDisponible(consultaBase.data().available_quantity)
                setLoading(false);
            }

        }
        catch(e)
        {
            console.log(e)
        }
    
    }

    
    useEffect(
        ()=>{
            request();
            console.log("ENTRO AL EFFECT")
        },[]
        
    )


//

    return(
        <>
            <AuthContext.Consumer>
                {
                         context=>
                         <>
                                        <Loading active={loading}>
                                        {

                                            producto &&
                                            <>
                                                    <div style={{marginLeft:"20px"}}>
                                                        <div className='fotos'>
                                                        <span>
                                                        {console.log("PRODUCT",producto)}
                                                        <Fotos producto={producto.data()} />
                                                        </span>
                                                        
                                                    </div>

                                                    <br></br>
                                                    
                                                    <div>
                                                        <span className="tit">
                                                            Nombre:&nbsp;
                                                        </span>
                                                        <span>
                                                            {producto.data().title}
                                                        </span>
                                                    </div>  

                                                    <div>
                                                        <span className="tit">
                                                            Precio:&nbsp;
                                                        </span>
                                                        <span>
                                                            $ {producto.data().price}
                                                        </span>
                                                    </div> 

                                                    <div>
                                                        <span className="tit">
                                                            Descripcion:&nbsp; 
                                                        </span>
                                                        <br></br>
                                                        <span>
                                                            {producto.data().description}
                                                        </span>
                                                    </div> 

                                                    <div>
                                                        <span className="tit">
                                                            Garantia:&nbsp;
                                                        </span>
                                                        <span>
                                                            {producto.data().warranty}
                                                        </span>
                                                    </div> 

                                                    <div>
                                                        <span className="tit">
                                                            Cantidad Disponible:&nbsp;
                                                        </span>
                                                        <span>
                                                                {producto.data().available_quantity}
                                                        </span>
                                                    </div>              
                                                    
                                                    
                                                    
                                                    <br></br>
                                                    
                                                    {
                                                        !esAdmin() &&
                                                        <>
                                                            <button className={cantDisponible===0 ? "disabledButton" : null}
                                                                    onClick={comprar}
                                                                    disabled={cantDisponible===0}
                                                            >Comprar</button>
                                                            &nbsp;           
                                                            <label hidden={cantDisponible>0} style={{color:"gray"}}>Sin Stock</label>
                                                        </>
                                                            

                                                    }
                                                   
                                                    

                                                    {
                                                         esAdmin() &&
                                                                    <>

                                                                            <p>
                                                                                <br></br>

                                                                                <Link to={linkModif}>
                                                                                        <Button variant="success">Modificar Producto</Button>
                                                                                </Link>

                                                                                <Button variant="danger" onClick={handleShowModal}>Eliminar Producto</Button>  
                                                                            </p>
                                                                            
                                                                            
                                                                            <Modal show={show} onHide={handleClose} >
                                                                            
                                                                                <Alert  variant="danger">
                                                                                <Modal.Header closeButton>
                                                                                    
                                                                                    <Modal.Title>Atencion!</Modal.Title>
                                                                                    
                                                                                </Modal.Header>
                                                                                </Alert>

                                                                                <Modal.Body>Esta seguro que desea eliminar este producto?</Modal.Body>
                                                                                
                                                                                
                                                                                <Modal.Footer>
                                                                                <Button variant="secondary" onClick={handleClose}>
                                                                                    Cancelar
                                                                                </Button>
                                                                                <Button variant="danger" onClick={handleDelete}>
                                                                                    Eliminar
                                                                                </Button>
                                                                                </Modal.Footer>
                                                                        
                                                                            </Modal>

                                                                    </>
                                                            
                                                    }
                                                    
                                                    
                                                    
                                                    
                                                    </div>
                                            </>

                                        }       
                                        
                                        </Loading>
                         </>
                }   
            </AuthContext.Consumer>
        </>
            
            
        )
  

    
}
export default Detalle;