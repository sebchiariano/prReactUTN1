import React from "react";

import '../styles/Home.css';

import ConsultaListadoProductosNode from './ABMProductos/ConsultaListadoProductosNode';



function Home(){

    return(
        <div className="content">
         <h3 className='titu'> LISTADO DE PRODUCTOS </h3>
         <ConsultaListadoProductosNode />
        </div>

    )
}

export default Home;