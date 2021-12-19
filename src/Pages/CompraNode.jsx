import React, {useState,useEffect} from "react";
import '../styles/Detalle.css';

import { useParams } from "react-router-dom";

import Image from 'react-bootstrap/Image'

import {Spinner, Button, Alert} from 'react-bootstrap'

import { Link } from 'react-router-dom'

import firebase from '../config/firebase';


import Modal from 'react-bootstrap/Modal'

import {getProductById,actualizarCantidadProductById} from '../Services/ProductosService'
 
function Compra(props){

    const [producto,setProducto] = useState();
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [precioProducto, setPrecio] = useState(0);
    const [nombreProducto, setNombre] = useState('');
    const [cantDisponible, setCantDisponible] = useState('');

    

    const [cantidad,setCantidad] = useState(1);

    const [total,setTotal] = useState();

    const [mensajeCant, setMensajeCant] = useState('');

    const params=useParams();

    const [isVisibleDesc, setIsVisibleDesc] = useState(false);
    const [isLoadingDesc, setIsLoadingDesc] = useState(false);

    const [isVisibleAlertaCompra, setIsVisibleAlertaCompra] = useState(false);



    const actualizarCantDisponibleFirebase = async ()=>
    {
        var newCant= cantDisponible-cantidad;
        var bodyParam= {
            available_quantity:newCant
        }
     
        try{

            actualizarCantidadProductById(producto._id,bodyParam)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        }
        catch(e)
        {
            console.log(e);

        }
    }

    const comprar = ()=>{
        
        actualizarCantDisponibleFirebase();
        setMensaje("Usted a comprado "+cantidad+" "+nombreProducto+" por un total de $"+total+". Gracias por su compra");
        setIsVisibleAlertaCompra(true);
        handleShowModal();
    }


    const incrementarCant = ()=>{
        if(cantidad<cantDisponible)
        {
            let cant=cantidad+1;
            setCantidad(cant);
            setTotal(cant*precioProducto);
        }
        else
        {
            setMensajeCant("No se pueden agregar mas productos. Supera Stock disponible")
        }
        
    }

    const disminuirCant = ()=>{
        if(cantidad>1)
        {
            let cant=cantidad-1;
            setCantidad(cant);
            setTotal(cant*precioProducto);
        }
        setMensajeCant("");
    }



    const verDescripcion = ()=>{
        setIsLoadingDesc(true);
        setIsVisibleDesc(true);

    }

    const ocultarDescripcion = ()=>{
        
        setIsVisibleDesc(false);
        setIsLoadingDesc(false);

    }
  
    // MANEJO MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowModal = () => setShow(true);
    //

    async function request(){
        try{
            getProductById(params.id)
            .then((response) => {
                return response.json();
              })
              .then((data) => {
                setProducto(data);

                setPrecio(data.price)
                setTotal(data.price)
                setNombre(data.title)
                setCantDisponible(data.available_quantity)
                setLoading(false);
            })

        }
        catch(e)
        {
            console.log(e)
        }
    
    }

    useEffect(
        ()=>{
            request();           

        },[])

    useEffect(
        ()=>{
            if(isLoadingDesc==true)
            {
                /*
                getDescription(params.id)
                .then(res=>{

                    if(res.data)
                    {
                        setDescripcion(res.data);
                        setIsLoadingDesc(false);     
                       
                    }
                
                })
                */
               var i;
               for(i=0;i<=5000;i++)
               {
                   console.log(i);
                   console.log("isLoading",isLoadingDesc)
               }
               console.log("i",i)
               if(i>=5000)
               {
                setIsLoadingDesc(false); 
               }
            }

            console.log("**SE EJECUTO EL EFFECT")

        },[isLoadingDesc])



    if(loading)
    {
        return (
            <>  
               <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
            </>
        )
    }
    else
    {
        return(
            <div style={{margin:"0 auto", alignItems:"center", textAlign:"center"}}>
            
              <br></br>

              <div>
                  <span>
                         <Image src={producto.pictures[0].secure_url} thumbnail />
                  </span>
                 
              </div>

             
              <div>
                  <span className="tit">
                      Nombre:&nbsp;
                  </span>
                  <span>
                     {producto.title}
                  </span>
              </div>  

              <div>
                  <span className="tit">
                      Precio:&nbsp;
                   </span>
                   <span>
                       $ {producto.price}
                  </span>
              </div> 
              <div>
                  <span className="tit">
                      Cantidad Disponible:&nbsp;
                   </span>
                   <span>
                     {cantDisponible}
                  </span>
              </div> 

              
              

        
              <br></br>

              <div>
                  <span className="tit">
                        Cantidad Compra:&nbsp;
                  </span>  
                  <span>
                     {cantidad}
                  </span>      
                  &nbsp; 
                  <button onClick={disminuirCant}>-</button>
                  <button onClick={incrementarCant}>+</button>
                  &nbsp; 
                  <span>{mensajeCant}</span>
               </div>  

               <div>
                  <span className="tit">
                      Total:&nbsp;
                   </span>
                   <span>
                       $ {total}
                  </span>
              </div> 
             <br></br>
    
             {console.log("isLoading",isLoadingDesc)}
             <Button hidden={isVisibleDesc && !isLoadingDesc} 
                variant="primary"
                disabled={isLoadingDesc}
                onClick={!isLoadingDesc ? verDescripcion : null}
                >
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!isLoadingDesc} />
                {isLoadingDesc ? ' Loading..' : 'Ver Descripcion'}
             </Button>

             <Button hidden={!isVisibleDesc || isLoadingDesc}
                variant="primary"
                onClick={ocultarDescripcion}
                >
                    Ocultar Descripcion
             </Button>
           
             <div hidden={!isVisibleDesc || isLoadingDesc}>
                  <span className="tit">
                      Descripcion:&nbsp;
                   </span>
                   <span>
                     {isVisibleDesc ? producto.description : ''}
                    
                  </span>
              </div> 

              <br></br>

              <button onClick={comprar}
                      disabled= {cantDisponible===0}
              >Confirmar Compra</button>
              <label hidden={cantDisponible>0}>Sin Stock</label>
              <br></br>
              <br></br>

              <Modal show={show} onHide={handleClose} style={{textAlign:"center"}} >

                    <Alert show={isVisibleAlertaCompra} variant="success" style={{width:'400px', margin:"0 auto", textAlign:"center"}} style={{width:"100%", height:"100%", margin:"0px auto"}}>
                            <Alert.Heading>Gracias por su compra!</Alert.Heading>
                            <p>
                                {mensaje}
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                            <Link to="/" >
                            <Button onClick={() => setIsVisibleAlertaCompra(false)} variant="outline-success">
                            Ok
                            </Button>
                            </Link>
                            </div>
                        
                    </Alert>       
         
             </Modal>
             


             
              
            </div>
        )
    }


}

export default Compra;