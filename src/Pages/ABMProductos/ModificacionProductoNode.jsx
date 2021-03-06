import React, {useState,useEffect} from "react";

import '../../styles/Registro.css';

import FormGroup from '../../Components/FormGroup';

import {useForm, useFieldArray} from 'react-hook-form'; //npm install react-hook-form
                                        //formik alternativa

import firebase from '../../config/firebase';

import Button from 'react-bootstrap/Button'

import { useParams, useHistory } from "react-router-dom";

import {getProductById, actualizarProductById} from '../../Services/ProductosService'

function ModificacionProducto(props){

    const { register, handleSubmit, formState:{errors} , control, setValue} = useForm()

    const [producto,setProducto] = useState();
    const [loading,setLoading] = useState(true);

    const params=useParams();

    const history = useHistory();

    var linkDetalle="/Detalle/"+params.id;


    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "pictures", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
      });
    


  
     const onSubmit = async (form) => {  
        
            

            try{

                var bodyParam= form
             
                console.log("BP1",bodyParam)
                try{
        
                    actualizarProductById(params.id,bodyParam)
                    .then(response => response.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => console.log('Success:', response));
                }
                catch(e)
                {
                    console.log(e);
        
                }
                

                alert("Se ha modificado el producto con exito");
                history.push(linkDetalle);

               
            }
            catch(e)
            {
                console.log(e);

            }

     }

     async function request(){
        try{
            getProductById(params.id)
            .then((response) => {
                return response.json();
              })
            .then((data) => 
            {
                setProducto(data);
                setLoading(false);

                setValue("title",data.title);
                setValue("price",data.price);    
                setValue("description",data.description);
                setValue("warranty",data.warranty);
                setValue("available_quantity",data.available_quantity);            

                        var i;
                        var cantFotos = data.pictures.length;
                        console.log("TAMA??O", cantFotos)
                        if(fields.length==0)
                        {
                            if(cantFotos==0)
                            {
                                append({secure_url:""})
                            }
                            else
                            {
                                for(i=0; i< data.pictures.length; i++)
                                {
                                    
                                    var url=data.pictures[i].secure_url;
                                    console.log("URL",url)
                                    append({secure_url:url});
                                }
                            }
                        }
  
                    
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

        },[]
    )


    if(loading)
    {
        return (
            <>  
               loading...
            </>
        )
    }
    else
    {
        return (
            <div className="comp">  
                 <h3 style={{marginBottom:"20px",paddingBottom:"5px",widht:"100%", borderBottom:"1px solid #000"}}>Modificacion Producto</h3>
                 <form  name="formProducto" onSubmit={handleSubmit(onSubmit)}>
                 
                        <FormGroup label="Nombre" type="text" register={{...register("title",{required:true})}}  />
                        {errors.title && <span className='errReg'>(*) El campo es obligatorio</span>}
                    
                        <FormGroup label="Precio " type="text" register={{...register("price",{required:true})}}  />
                        {errors.price && <span className='errReg'>(*) El campo es obligatorio</span>}
                    
                        <FormGroup label="Descripcion" type="text" register={{...register("description")}}  />
    
                        <FormGroup label="Garantia " type="text" register={{...register("warranty",{required:true})}}  />
                        {errors.warranty && <span className='errReg'>(*) El campo es obligatorio</span>}
    
                        <FormGroup label="Cantidad " type="text" register={{...register("available_quantity",{required:true})}}  />
                        {errors.available_quantity && <span className='errReg'>(*) El campo es obligatorio</span>}
                        
                       
                        <div className="divFotos">
                        <ul>
                            
                            {fields.map((item, index) => (
                            <span key={item.id}>
                        
                                <FormGroup label="Link Foto " type="text" register={{...register(`pictures.${index}.secure_url`,{required:true})}}  wid="800px"/>
                                {errors.pictures?.[index]?.secure_url && <span className='errReg'>(*) El campo es obligatorio</span>}

                                <Button variant="outline-danger" size="sm" type="button" onClick={() => remove(index)}  hidden={index==0} >Eliminar</Button>
                            </span>
                            ))}
                          
                        </ul>
                     
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => append({secure_url:""})}
                           
                          >
                            Agregar Link Foto
                          </Button>
                        
                        </div>
                        <p>
                            <button type="submit">Guardar</button>
                        </p>
    
    
                 </form>
    
            </div>
        )
    }
   
}

export default ModificacionProducto;