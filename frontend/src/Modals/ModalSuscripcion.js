import { useState } from "react";

import "../css/Modal.css";
import { updateCuenta } from "../Api/ApiCuenta";
import { createSuscripcion } from "../Api/ApiSuscripcion";

const ModalSuscripcion = ({
  isOpen,
  onClose,
  content,
  caso,
  onDelete,
  cuentas,
  setCuentas,
  getCuentas,
  tiposCuenta,
  getSuscripciones,
  setSuscripciones,
  suscripciones,
  getTiposCuenta,
  setTiposCuenta
}) => {
  const [selectorCuenta, setSelectorCuenta] =useState(false);
  const [tipoCuentaElegido, setTipoCuentaElegido] =useState(null);
  const [cuentaElegida, setCuentaElegida]= useState(null);
  const [cuentaFiltrada, setCuentaFiltrada] =useState([]);
  

  const [correo, setCorreo] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const tipoCuenta=tipoCuentaElegido;
      const cuenta=cuentaElegida;
      const estado="Disponible"
      const suscripcion={tipoCuenta, cuenta, estado}
      //console.log(suscripcion);
      

      await createSuscripcion(suscripcion);

      setSuscripciones([...suscripciones, suscripcion]);
      await getSuscripciones();
      handleClose();
    } catch (error) {
      console.error("Error creando cuenta ", error);
    }
  };
  const handleUpdate = async (e) => {
    console.log(suscripciones);
    e.preventDefault();
    try {
      const editada = { correo };
      const cuentaActualizada = await updateCuenta(content.id, editada);

      setCuentas(
        cuentas.map((cuenta) =>
          cuenta.id === cuentaActualizada.id ? cuentaActualizada : cuenta
        )
      );
      await getCuentas();
      setCorreo("");
      onClose();
    } catch (error) {
      console.error("Error creando cuenta ", error);
    }
  };
  if (!isOpen) return null;
  
  const handleTipoCuentaElegido =async(e)=>{
    e.preventDefault();
    const idTipoCuentaSeleccionada= Number(e.target.value);
    
    setSelectorCuenta(idTipoCuentaSeleccionada !=='');
    
   
    let filtrado = suscripciones;
    if (idTipoCuentaSeleccionada) {
      filtrado = filtrado.filter(
        (suscripcion) => 
         suscripcion.tipoCuenta.id === idTipoCuentaSeleccionada
       
      );
      
    }
    setTipoCuentaElegido(tiposCuenta.find(tiposCuenta=>tiposCuenta.id === idTipoCuentaSeleccionada));
   const cuentasDeTipo= new Set(filtrado.map((sus)=>sus.cuenta.correo))
   let filtroCuentas= cuentas;
   filtroCuentas= filtroCuentas.filter(cuenta=> !cuentasDeTipo.has(cuenta.correo))

    setCuentaFiltrada(filtroCuentas);

  };
  const handleCuentaElegida=async(e)=>{
    const idCuentaSeleccionada=Number(e.target.value);

    setCuentaElegida(cuentas.find(cuentas=>cuentas.id===idCuentaSeleccionada));
    
  }
  const handleClose =()=>{
    setSelectorCuenta(false);
    onClose();
   
  };
  switch (caso) {
    
    case "nuevo":
      return (
        <div>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleClose}>
                &times;
              </span>
              <h2>Suscribir cuenta a servicio de Streaming</h2>
              <div className="card-body">
                <form>
                  <div className="grid-container">
                    <div>
                      <label className="form-label">
                        Seleccione Servicio <br />
                        de Streaming:
                      </label>
                      <br />
                      {
                        <select id="tipos" onChange={handleTipoCuentaElegido} defaultValue={'Seleccione'}>
                          <option value={'Seleccione'}disabled>Seleccione</option>
                          {tiposCuenta.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>
                              {tipo.nombre}
                            </option>
                          ))}
                        </select>
                      }
                    </div>
                    {selectorCuenta &&(
                    <div>
                      <label className="form-label">
                        Seleccione <br />
                        cuenta:
                      </label>
                      <br />

                      {
                        <select id="cuentas" defaultValue={'Seleccione'} onChange={handleCuentaElegida}>
                          <option value={'Seleccione'}disabled>Seleccione</option>
                          {cuentaFiltrada.map((cuenta) => (
                            <option key={cuenta.id} value={cuenta.id}>
                              {cuenta.correo}
                            </option>
                          ))}
                        </select>
                      }
                    </div>
                    )}
                  </div>

                  <button onClick={handleClose} >Cancelar</button>
                  <button
                    className="confirm"
                    onClick={(e) => handleCreate(e)}
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    case "editar":
      return (
        <div>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <h2>Cambiar estado {content.cuenta.correo}</h2>
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <label className="form-label">
                      Correo de cuenta AllStreaming a editar
                    </label>
                    <br />
                    <input
                      type="email"
                      placeholder="cuenta@ejemplo.com"
                      name="correo"
                      className="form-control"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>

                  <button onClick={onClose}>Cancelar</button>
                  <button
                    className="btn btn-success"
                    onClick={(e) => handleUpdate(e)}
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    default:
  }

  return <div></div>;
};
export default ModalSuscripcion;
