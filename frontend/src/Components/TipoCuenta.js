
import React, { useEffect, useState } from "react";
import ModalTipoCuenta from "../Modals/ModalTipoCuenta";
import apiTipoCuenta, { deleteTipoCuenta } from "../Api/ApiTipoCuenta";
import "../css/Table.css";


export default function TipoCuenta() {
  const [tipos, setTipos] = React.useState(null);

  const [showModal, setShowModal] = useState(false);
const [contenido, setContenido] =useState(null);
const [opcion, setOpcion] = useState('');

  const openModal = (tipo, opcion) => {
    
    setContenido(tipo);
    setShowModal(true);
    setOpcion(opcion);
  };

  const closeModal = () => {
    setShowModal(false);
    setContenido(null);
  };
  

 const getTipos = async()=>{
  try{
    const response = await apiTipoCuenta.get("");
    setTipos(response.data);
  }catch(error){
    console.error('Error obteniendo servicios de streaming', error)

  }
 }
useEffect(()=>{
  getTipos();
}, []);


  const handleDelete = async (id) =>{
    try {
      await deleteTipoCuenta(id);
      setTipos(tipos.filter(tipo => tipo.id !== id));
      closeModal();
      <span>eliminado el servicio de streaming con id {id}</span>
    } catch (error) {
      console.error('Error eliminando ', error);
    }
  }

  if (!tipos) return null;

  return (
    <div>
      <>
      <h2>Servicios de Streaming disponibles</h2>
      <button className= "add" onClick={()=>openModal([], 'nuevo') }>Nuevo</button>
      </>
      <div className="Table">
      <table border="1">
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map(tipo => {
            return (
              <tr key={tipo.id}>
                {/* <td>{tipo.id}</td> */}
                <td>{tipo.nombre}</td>
                <td>
                <button className="edit" onClick={()=>openModal(tipo, 'editar') }>Editar</button>
                <button className="delete" onClick={()=>openModal(tipo, 'borrar')}>Eliminar</button>
                
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <ModalTipoCuenta isOpen={showModal} onClose={closeModal} content={contenido} caso={opcion} onDelete={handleDelete} tipos={tipos} setTipos={setTipos} getTipos={getTipos}/>
    </div>
  );
}
