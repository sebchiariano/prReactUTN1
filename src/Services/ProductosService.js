import instance from "../config/axios"

export function getAllAxios(limit,offset){
    return instance.get("sites/MLA/search?q=silla%20gamer"+"&limit="+limit+"&offset="+offset)
}

export function getAllFetch(){
    return fetch("https://api.mercadolibre.com/sites/MLA/search?q=b") 
}


export function getDescription(id)
{
   return instance.get("items/"+id+"/description")
}

export function getProductByIdML(id)
{
    return instance.get("items/"+id)
}


export function getSearch(key,limit,offset)
{
    return instance.get("sites/MLA/search?q="+key+"&limit="+limit+"&offset="+offset)
} 


//NODE

export function getAllProductsFetchNode(){
    return fetch("http://localhost:3000/products") 
}

export function deleteProductById(id)
{
    return fetch("http://localhost:3000/products/"+id, {method: 'DELETE',}) 
}

export function getProductById(id)
{
    return fetch("http://localhost:3000/products/"+id) 
}

export function actualizarCantidadProductById(id, bodyParam)
{

    return fetch("http://localhost:3000/products/actualizarcantidad/"+id, { 
        method: 'PUT', 
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(bodyParam) 
      })
}

export function actualizarProductById(id, bodyParam)
{

    return fetch("http://localhost:3000/products/"+id, { 
        method: 'PUT', 
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(bodyParam) 
      })
}

export function crearProduct(bodyParam)
{
    console.log("BP",bodyParam)
    return fetch("http://localhost:3000/products/", { 
        method: 'POST', 
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(bodyParam) 
      })
}