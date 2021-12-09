import React, {useState,useEffect} from "react";


import firebase from '../../config/firebase';


import '../../styles/Home.css';

import Producto from '../../Components/ProductoFireBase';
import Loading from '../../Components/Loading';

import {Container, Row, Col} from 'react-bootstrap'




function Consulta(){

    const [productos,setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const [reload, setReload] = useState(false);

    const handleDelete = async (id) =>{
        try{
             const consultaBase = await firebase.db.doc("productos/"+id)
             .delete();
             alert("Se ha eliminado el producto");
             setReload(true);
        }
        catch(e)
        {
            console.log(e)
        }
    }
    

    async function request(){
        try{
            const consultaBase = await firebase.db.collection("productos")
            .get()
            if(consultaBase.docs){
                setProductos(consultaBase.docs)
                setLoading(false)
                setReload(false)
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

   
 /*   

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
*/
        return (
            <Loading active={loading}>

                <Container fluid >
                    <Row>
                        <Col style={{margin:"0 auto", textAlign:"center"}}>
                            {productos.map(prod=>

                                <div className='pr'>
                                    <Producto key={prod.id} producto={{...prod.data(), id:prod.id}} handleDelete={handleDelete} />
                                </div>
                            
                            )} 
                        </Col>
                    </Row>
                </Container>

            </Loading>
            
            
        )
 /*
    }
*/
}

export default Consulta;