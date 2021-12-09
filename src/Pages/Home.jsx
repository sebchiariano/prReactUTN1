import React from "react";

import '../styles/Home.css';

import ConsultaListadoProductosFireBase from './ABMProductos/ConsultaListadoProductosFirebase';



function Home(){

    return(
        <div className="content">
         <h3 className='titu'> LISTADO DE PRODUCTOS </h3>
         <ConsultaListadoProductosFireBase />
        </div>

    )
}

export default Home;