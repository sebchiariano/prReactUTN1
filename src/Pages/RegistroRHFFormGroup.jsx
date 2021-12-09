import React, {useState} from "react";

import '../styles/Registro.css'

import FormGroup from '../Components/FormGroup'
import ButtonWithLoading from '../Components/ButtonWithLoading'
import AlertCustom from '../Components/AlertCustom'

import {useForm} from 'react-hook-form' //npm install react-hook-form
                                        //formik alternativa

                                        import firebase from '../config/firebase'
function Registro(){

    const { register, handleSubmit, formState:{errors}, reset} = useForm();
    
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    
    const [alertCustom, setAlertCustom]= useState({variant:"", text:""});

    /* con then
    const onSubmit = form => {

        if(form.pass===form.pass2)
        {
            //alert("Se han registrado los datos:  \n{  \n nombre : "+form.nombre+' ,  \n apellido : '+form.apellido+' ,  \n telefono : '+form.telefono+' ,  \n email : '+form.email+' ,  \n pass : '+ form.pass+ ' ,  \n pass2 : '+form.pass2+' \n}')
            
            console.log("data", form);
            firebase.auth.createUserWithEmailAndPassword(form.email, form.pass)
            .then(responseUser => {
                console.log(responseUser)
            })
            .catch((e)=>{
                console.log("Error",error);
            })


            alert('Se ha registrado el usuario '+ form.email + ' con exito !')
            
            reset(); //se resetean valores input y errores
        }
        else
        {
            alert("Las contraseñas no coinciden")
        }     

     }
    */

     const onSubmit = async (form) => {  // con async/await reemplazando el then

        if(form.pass===form.pass2)
        {
            setLoadingSubmit(true);
            console.log("data", form);

            try{
                const responseUser = await firebase.auth.createUserWithEmailAndPassword(form.email, form.pass)
                console.log(responseUser);
                console.log(responseUser.user.uid);
                if(responseUser.user.uid)
                {
                    const documentDB = await firebase.db.collection("usuarios")
                    .add({
                        nombre:form.nombre,
                        apellido:form.apellido,
                        telefono: form.telefono,
                        email:form.email,
                        perfil:form.perfil,
                        userId:responseUser.user.uid
                    })
                    console.log("documentoDB",documentDB);
                }

                // alert('Se ha registrado el usuario '+ form.email + ' con exito !')
                setAlertCustom({variant:"success", text:"Se ha registrado el usuario "+ form.email + " con exito !"});
      
                reset(); //se resetean valores input y errores
                

            }
            catch(e)
            {
                console.log(e);
                if(e.code=="auth/email-already-in-use")
                {
                    //alert("El email "+form.email+ " con el que intenta registrarse ya esta siendo utilizado. Ingrese un correo distinto")
                    setAlertCustom({variant:"danger", text:"El mail ingresado ya esta siendo utilizado por otro usuario!"});
                }
                

            }
            setLoadingSubmit(false);
            
            
        }
        else
        {
            //alert("Las contraseñas no coinciden")
            setAlertCustom({variant:"danger", text:"Las contraseñas no coinciden"});
      
        }     

     }
    
    return (
        <div className="comp">  
            <form  name="formRegistro" onSubmit={handleSubmit(onSubmit)}>
                <h3 style={{marginBottom:"20px",paddingBottom:"5px",widht:"100%", borderBottom:"1px solid #000"}}>Ingresa tus datos para registrarte</h3>

                    <FormGroup label="Nombre" type="text" register={{...register("nombre",{required:true})}}  />
                    {errors.nombre && <span className='errReg'>(*) El campo es obligatorio</span>}
               
                    <FormGroup label="Apellido " type="text" register={{...register("apellido",{required:true})}}  />
                    {errors.apellido && <span className='errReg'>(*) El campo es obligatorio</span>}
                
                    <FormGroup label="Telefono " type="text" register={{...register("telefono")}}  />

                    <label>Perfil </label>&nbsp;
                    <select style={{width:"300px"}} {...register("perfil")} >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>

                    <FormGroup label="Email " type="email" register={{...register("email",{required:true})}}  />
                    {errors.email && <span className='errReg'>(*) El campo es obligatorio</span>}

                    <FormGroup label="Password " type="password" register={{...register("pass",{required:true, minLength:6, maxLength:12})}}  />
                    {errors.pass?.type==="required" && <span className='errReg'>(*) El campo es obligatorio</span>}
                    {(errors.pass?.type==="minLength" || errors.pass?.type==="maxLength") && <span className='errReg'>(*) El password debe tener entre 6 y 12 caracteres</span>}

                    <FormGroup label="Confirmar Password " type="password" register={{...register("pass2",{required:true, minLength:6, maxLength:12})}}  />
                    {errors.pass2?.type==="required" && <span className='errReg'>(*) El campo es obligatorio</span>}
                    {(errors.pass2?.type==="minLength" || errors.pass2?.type==="maxLength") && <span className='errReg'>(*) El password debe tener entre 6 y 12 caracteres</span>}
    
                <p>
                    <br />
                     <ButtonWithLoading loading={loadingSubmit} type="submit">
                         Registrarme
                     </ButtonWithLoading>
                     
                     <AlertCustom variant={alertCustom.variant} text={alertCustom.text}/> 
                </p>



            </form>

        </div>
    )
}

export default Registro;