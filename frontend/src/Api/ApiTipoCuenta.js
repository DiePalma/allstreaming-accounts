import axios from "axios";


const apiTipoCuenta = axios.create({
    baseURL : "http://localhost:8080/tipocuenta",
    headers : {
        'Content-Type': 'application/json'
    }
});



export const createTipoCuenta = async (cuenta) =>{
  try {
    const response = await apiTipoCuenta.post(`/nuevo`, cuenta);
   // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error ('Error creando el servicio de streaming', error);
    throw error;
  }
}

export const deleteTipoCuenta = async (id) =>{
  try {
      await apiTipoCuenta.delete(`/${id}`);
      
    } catch (error) {
      console.error('Error eliminando ', error);
      throw error;
    }
}
export const updateTipoCuenta = async (id, tipo) =>{
  try {
    const response = await apiTipoCuenta.put(`/${id}`, tipo);
   // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error ('Error editando el servicio de streaming', error);
    throw error;
  }
}
export const getSuscripciones = async (id, estado)=>{
  estado= "en uso"
  console.log(typeof(estado));
  if ((estado)=== "") {
    try {
      const response = await apiTipoCuenta.get(`/${id}`);
      //console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error al obtener suscripciones desde ApiTipoCuenta", error);
      throw error;
    }
  } else {
    
  
  try {
    const response = await apiTipoCuenta.get(`/${id}/${estado}`);
    //console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener suscripciones desde ApiTipoCuenta", error);
    throw error;
  }
}
}
export default apiTipoCuenta;