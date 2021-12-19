import React, {useState,useEffect} from "react";

import '../../styles/Registro.css';

import FormGroup from '../../Components/FormGroup';
import ButtonWithLoading from '../../Components/ButtonWithLoading'

import {useForm, useFieldArray} from 'react-hook-form'; //npm install react-hook-form
                                        //formik alternativa

import firebase from '../../config/firebase';

import Button from 'react-bootstrap/Button'

import {crearProduct} from '../../Services/ProductosService'

function AltaProducto(){

    const { register, handleSubmit, formState:{errors}, reset , control} = useForm()

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "pictures", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
      });
    
  
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    

     const onSubmit = async (form) => {  
        
        try{

            var bodyParam= form
         
            console.log("BP1",bodyParam)
            try{
    
                crearProduct(bodyParam)
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
            }
            catch(e)
            {
                console.log(e);
    
            }
            

            alert("Se ha creado el producto con exito");

           
        }
        catch(e)
        {
            console.log(e);

        }

            setLoadingSubmit(false);

            

     }

     
    
     useEffect(
        ()=>{
            if(fields.length===0)
            {
                append({secure_url:""})
            }

        },[fields, append]
    )

    return (
        <div className="comp">  
             <h3 style={{marginBottom:"20px",paddingBottom:"5px",widht:"100%", borderBottom:"1px solid #000"}}>Alta Producto</h3>
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

                                <Button variant="outline-danger" size="sm" type="button" onClick={() => remove(index)}  hidden={index===0} >Eliminar</Button>
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
                    <ButtonWithLoading loading={loadingSubmit} type="submit">
                         Guardar Producto
                     </ButtonWithLoading>
                    </p>

                 
             </form>

        </div>
    )
}

export default AltaProducto;