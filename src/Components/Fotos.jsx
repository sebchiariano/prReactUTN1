import React, {useState} from "react";

import '../styles/Fotos.css';

import Carousel from 'react-bootstrap/Carousel'

function Fotos(props){

    const[arrayFotos,setArrayFotos] = useState(props.producto.pictures)

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const styles={
        car:
        {
            margin:'0 auto',
            maxHeight:'500px',
            maxWidth:'800px'
        },
        imag:
        {
            objectFit:'scale-down',
            height:'500px'
        }
    }

    return(
        <>
            <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>

                {arrayFotos.map((pic)=>
                    
                        <Carousel.Item>
                         <div style={styles.car}>
                            <img  style={styles.imag}
                                className="d-block w-100"
                                src={pic.secure_url}
                                alt=""                            
                            />
                         </div>
                         
                        </Carousel.Item>
                        
                   
                    
                   
                   )}

                       

            </Carousel>

         </>
    )


}



export default Fotos;
