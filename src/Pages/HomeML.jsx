import React, {useState,useEffect} from "react";

import instance from "../config/axios"
import { getAllAxios, getSearch } from "../Services/ProductosService";

import '../styles/Home.css';

import Producto from '../Components/Producto';

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

import {Button, Form, FormControl, Container, Row, Col, Spinner, Pagination, PageItem} from 'react-bootstrap'

import {useForm} from 'react-hook-form'
import { renderIntoDocument } from "react-dom/test-utils";

function Home(){

    const [productos,setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keySearch, setKeySearch] = useState("");


    const firebaseConfig = {
        apiKey: "AIzaSyBGVQVCbrANy5XenmdfWhlHvqxsTHEZX0I",
        authDomain: "chiarianounidad1m3.firebaseapp.com",
        projectId: "chiarianounidad1m3",
        storageBucket: "chiarianounidad1m3.appspot.com",
        messagingSenderId: "58438052677",
        appId: "1:58438052677:web:5c8ca37bc92434c0c12c2c",
        measurementId: "G-6T95YWGJ63"
      };
      
      // Initialize Firebase
      const app = firebase.initializeApp(firebaseConfig);

      //console.log(firebase.firestore());


      const { register, handleSubmit, formState:{errors}} = useForm();
      const search = form => {
        console.log(form);
          setKeySearch(form.keySearch);
        
      }


      const [activePage, setActivePage] = useState(1);
      const [arrayPages, setArrayPages] = useState([]);
      const [arrayPagesIntervalo, setArrayPagesIntervalo] = useState([]);
      const [totalPages, setTotalPages] = useState(1);
      const [loadingPag, setLoadingPag] = useState(true);

      const [limitML, setLimitML] = useState(5);
      const [offsetML, setOffsetML] = useState(0);
      
      const [arrayCantPorPag, setArrayCantPorPag] = useState([5,10,20,30,40,50]);
      

    const modificarIntervalo = (num)=>{

        var inf=parseInt(num)-4;
        var limInf;

        if(inf>1)
        {
            limInf=inf;
     
        }
        else
        {
            limInf=2;
           
        }

        var sup=parseInt(num)+4;
        var limSup;
        if(sup<arrayPages.length)
        {
            limSup=sup;
           
        }
        else
        {
            limSup=arrayPages.length-1;
           
        }

        var array = [];
        for(let i=limInf; i<=limSup; i++)
        {
            array.push(i);
        }
        setArrayPagesIntervalo(array);

    }

    const cambiarPagina = (event,number)=>{
        setActivePage(event.target.text);
    
        const offset = (parseInt(event.target.text)-1)*limitML;
        console.log(offset);
        setOffsetML(offset);
        //modificarIntervalo(parseInt(event.target.text));
       
    }
    
    const irPrimeraPag = ()=>{
    
        setActivePage(1)
        setOffsetML(0);
        //modificarIntervalo(1);
       
    }

    const irUltimaPag = ()=>{
        
        var ultPag=arrayPages[arrayPages.length-1];
        setActivePage(ultPag);
        const offset = parseInt(ultPag-1)*parseInt(limitML);
        setOffsetML(offset);
        console.log(offset);
        //modificarIntervalo(ultPag);
    }

    const irPagSig = ()=>{
    
        if(activePage<(arrayPages.length))
        {
            var pagSig = parseInt(activePage)+1;
            setActivePage(pagSig);
            const offset = (pagSig-1)*parseInt(limitML);
            setOffsetML(offset);
            console.log(offset);
            //modificarIntervalo(pagSig);
        }
    }

    const irPagAnt = ()=>{
    
        if(activePage>1)
        {
            var pagAnt = parseInt(activePage)-1;
            setActivePage(pagAnt);
            const offset = (pagAnt-1)*parseInt(limitML);
            setOffsetML(offset);
            console.log(offset);
            //modificarIntervalo(pagAnt);
        }
    }


    
    const cambiarCantidadPorPagina = (event)=>{
        setLimitML(event.target.value);
        console.log(event.target.value);
        setActivePage(1);
        setOffsetML(0);
    }


    useEffect(
        ()=>{
            setLoading(true);
            if(keySearch=="")
            {
                getAllAxios(limitML,offsetML)
                .then(res=>{
                 
                     if(res.data.results)
                     {
                         setProductos(res.data.results);
                         setLoading(false);
                        
                         var tot=1000;
                         if(parseInt(res.data.paging.total)<=1000)
                         {
                            tot=res.data.paging.total
                         }
                         
                         setTotalPages(Math.ceil(tot/res.data.paging.limit)+1);

                         let array = [];
                         for(let i=1; i<=(Math.ceil(tot/res.data.paging.limit));i++)
                         {
                                array.push(i);
                         }
                         setArrayPages(array);
                         
                     }
                   
                })
            }
           else
           {
                getSearch(keySearch,limitML,offsetML)
                .then(res=>{
                   
                    
                    if(res.data.results)
                    {
                        setProductos(res.data.results);
                        setLoading(false);


                        var tot=1000;
                         if(parseInt(res.data.paging.total)<=1000)
                         {
                            tot=res.data.paging.total
                         }
                         
                         setTotalPages(Math.ceil(tot/res.data.paging.limit)+1);
                         let array = [];
                         for(let i=1; i<=(Math.ceil(tot/res.data.paging.limit));i++)
                         {
                                array.push(i);
                         }
                         setArrayPages(array);
                         console.log("array:"+array)
                         console.log("offsetML:"+offsetML)
                    

                         if(array.length<activePage)
                         {
                            setActivePage(1);
                            setOffsetML(0);
                         }
                         


                    }

                    
                })
           }
           
        
           if(activePage==1)
           {
             setArrayPagesIntervalo([2,3,4,5]);
           }
           else
           {
            modificarIntervalo(activePage);
           }
           
           console.log("**SE EJECUTO USEEFFECT")
        
       

        },[keySearch, offsetML, activePage, limitML]
    )

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
        return (
            <Container fluid >
                <Row>
                    <Col md={4}><h3 className='titu'> LISTADO DE PRODUCTOS </h3></Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form className="d-flex" style={{paddingTop:'20px'}} onSubmit={handleSubmit(search)}>
                            <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            {...register("keySearch")}
                            />
        
                            <Button variant="outline-success" type='submit'>Search</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={{margin:"0 auto", textAlign:"center"}}>
                        {productos.map(prod=>
 
                            <div className='pr'>
                                <Producto producto={prod} />
                            </div>
                        
                        )} 
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div style={{paddingTop:"20px", display:"flex"}}>
                            <Pagination size="sm" style={{ margin:"0 auto"}} hidden={arrayPages.length>20}>
                                <Pagination.First onClick={irPrimeraPag}/>
                                <Pagination.Prev onClick={irPagAnt}/>
                                {arrayPages.map(number=>
                                        

                                        <p> 
                                        
                                            <Pagination.Item key={number} active={number==activePage} onClick={(event) => cambiarPagina(event)}>
                                            {number}
                                            </Pagination.Item>
                                        
                                        </p>
                                        

                                )}
                                <Pagination.Next onClick={irPagSig}/>
                                <Pagination.Last onClick={irUltimaPag}/>
                            
                            </Pagination>

                            <Pagination size="sm" style={{ margin:"0 auto"}} hidden={arrayPages.length<=20}>
                                <Pagination.First onClick={irPrimeraPag}/>
                                <Pagination.Prev onClick={irPagAnt}/>
                                <Pagination.Item key={arrayPages[0]} active={arrayPages[0]==activePage} onClick={(event) => cambiarPagina(event)}> {arrayPages[0]} </Pagination.Item>

                                <Pagination.Ellipsis hidden={arrayPagesIntervalo[0]<=2} />

                                {console.log("activePage:"+activePage)}
                                {console.log("arrayPagesIntervalo:"+ arrayPagesIntervalo)}
                                {console.log("intInf:"+ arrayPagesIntervalo[0])}
                                {console.log("intSup:"+arrayPagesIntervalo[arrayPagesIntervalo.length-1])}

                                {arrayPagesIntervalo.map(number=>

                                        <p> 
                                            
                                            <Pagination.Item key={number} active={number==activePage} onClick={(event) => cambiarPagina(event)}>
                                            
                                            {number}
                                            </Pagination.Item>
                                        
                                        </p>
                                        

                                )}

                                <Pagination.Ellipsis hidden={ (arrayPagesIntervalo[arrayPagesIntervalo.length-1]) >= (arrayPages.length-1) }/>

                                <Pagination.Item key={arrayPages[arrayPages.length-1]} active={arrayPages[arrayPages.length-1]==activePage} onClick={(event) => cambiarPagina(event)} >{arrayPages[arrayPages.length-1]}</Pagination.Item>
                                <Pagination.Next onClick={irPagSig}/>
                                <Pagination.Last onClick={irUltimaPag}/>

                            </Pagination>
                            &nbsp;
                            <label> Cantidad por pagina: </label> &nbsp;
                            <select class="form-select form-select-sm" name="selectCantPorPag" onChange={(event) => cambiarCantidadPorPagina(event)} style={{width:"80px", height:"30px"}}>
                                     {arrayCantPorPag.map(number=>
                                            <option value={number} selected={number==limitML}> {number} </option>
                                            
                                        
                                        )}
                                    
                            </select>
                            
                        </div>

                        
                        
                    </Col>
                </Row>

            </Container>
            
        )
    }

}

export default Home;