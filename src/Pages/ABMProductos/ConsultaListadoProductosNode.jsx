import React, {useState,useEffect} from "react";


import firebase from '../../config/firebase';


import '../../styles/Home.css';

import Producto from '../../Components/ProductoNode';
import Loading from '../../Components/Loading';

import {Container, Row, Col} from 'react-bootstrap'

import {getAllProductsFetchNode, deleteProductById} from '../../Services/ProductosService'


function Consulta(){

    const [productos,setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const [reload, setReload] = useState(false);

    const handleDelete = async (id) =>{
        try{
             deleteProductById(id).then(res => res.text()) // or res.json()
             .then(res => {
            
                setReload(true);
                alert(res +" - se ha eliminado el producrto")

             })
             
        }
        catch(e)
        {
            console.log(e)
        }
    }
    

    async function request(){
        try{

            getAllProductsFetchNode()
            .then((response) => {
                return response.json();
              })
              .then((data) => {
          
                setProductos(data);
                
                setLoading(false);
       
              });
            
     
        }
        catch(e)
        {
            console.log(e)
        }
    
    }

    useEffect(
        ()=>{
           
            request();
            
        },[]
    )

    useEffect(
        ()=>{
           
            if(reload)
            {
                request();
            }
           
            
        },[reload]
    )

   
        return (
            <Loading active={loading}>

                <Container fluid >
                    <Row>
                        <Col style={{margin:"0 auto", textAlign:"center"}}>
                            {productos.map(prod=>

                                <div className='pr'>
                                    <Producto key={prod.id} producto={{...prod, id:prod._id}} handleDelete={handleDelete} />
                                </div>
                            
                            )} 
                        </Col>
                    </Row>
                </Container>

            </Loading>
            
            
        )
 
}

export default Consulta;