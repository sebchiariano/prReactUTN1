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

export function getProductById(id)
{
    return instance.get("items/"+id)
}


export function getSearch(key,limit,offset)
{
    return instance.get("sites/MLA/search?q="+key+"&limit="+limit+"&offset="+offset)
} 
