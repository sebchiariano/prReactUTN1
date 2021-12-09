import '../styles/Login.css'
import firebase from '../config/firebase'

import React,{useContext} from "react"

import {useForm} from 'react-hook-form'

import AuthContext from '../Context/AuthContext'

import { useHistory } from "react-router-dom";

function Login(){


    const { register, handleSubmit, formState:{errors}} = useForm();

    const context = useContext(AuthContext);

    const history = useHistory();

    const onSubmit = async (form) => { 

            console.log("data", form);

            try{
                const responseUser = await firebase.auth.signInWithEmailAndPassword(form.email,form.pass)
               
                if(responseUser.user.uid)
                {
                    const userInfo = await firebase.db.collection("usuarios")
                    .where("userId","==",responseUser.user.uid)
                    .get()
                    console.log("userInfo", userInfo.docs)
                    console.log("userInfo DATA", userInfo.docs[0]?.data())
                    context.loginUser(userInfo.docs[0]?.data());
                    history.push("/");
                }
            
            }
            catch(e)
            {
                console.log(e.code);
                if(e.code=="auth/wrong-password" || e.code=="auth/user-not-found")
                {
                    alert("El usuario o la contraseña ingresada son incorrectos")
                }
                

            }
            
            
          

     }

    return(
        <div className="compLog">
            <div className="contLog">
                    <form  className="formLog" onSubmit={handleSubmit(onSubmit)}>
                        <div className='hea'>
                            <h5>Login</h5>
                        </div>
                        
                        <div className="bod">
                           
                       
                            <div>
                                
                                <input className="input" type="email"{...register("email", {required:true})}  placeholder="Email.."></input>
                                {errors.email && <span>El campo es obligatorio</span>}
                            </div>
                            <div>
                               
                                <input className="input" type="password" {...register("pass", {required:true, minLength:6, maxLength:12})} placeholder="Password.."></input>
                                {errors.pass?.type==="required" && <span>El campo es obligatorio</span>}
                                {(errors.pass?.type==="minLength" || errors.pass?.type==="maxLength") && <span>El password debe tener entre 6 y 12 caracteres</span>}
                            </div>
                        </div>

                        

                        <div className='foo'>
                       
                            <button className="button" type="submit">Ingresar</button>
                       
                        </div>

                    </form>
            </div>
        </div>
    )

}

export default Login;