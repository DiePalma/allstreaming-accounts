import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class TipoCuentaList extends Component {

    constructor(props) {
        super(props);
        this.state = {tiposCuenta: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/tipocuenta')
            .then(response => response.json())
            .then(data => this.setState({tiposCuenta: data}));
    }

    async remove(id) {
        await fetch(`/tipocuenta/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTiposCuenta = [...this.state.tiposCuenta].filter(i => i.id !== id);
            this.setState({tiposCuenta: updatedTiposCuenta});
        });
    }

    render() {
        const {tiposCuenta} = this.state;

        const tipoCuentaList = tiposCuenta.map(tipoCuenta => {
            return <tr key={tipoCuenta.id}>
                <td style={{ whiteSpace: 'nowrap' }} tag={Link}>{tipoCuenta.nombre}</td>
                
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="warning">Ver</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/tipocuenta/" + tipoCuenta.id}>Actualizar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(tipoCuenta.id)}>Eliminar</Button>
                    </ButtonGroup>
                    
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                <h3>Servicios de Streaming</h3>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/tipocuenta/nuevo">Nuevo</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Servicio</th>
                            <th width="30%">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tipoCuentaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default TipoCuentaList;