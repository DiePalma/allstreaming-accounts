import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CuentaList extends Component {

    constructor(props) {
        super(props);
        this.state = {cuentas: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/cuenta')
            .then(response => response.json())
            .then(data => this.setState({cuentas: data}));
    }

    async remove(id) {
        await fetch(`/cuenta/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedCuentas = [...this.state.cuentas].filter(i => i.id !== id);
            this.setState({cuentas: updatedCuentas});
        });
    }

    render() {
        const {cuentas} = this.state;

        const cuentaList = cuentas.map(cuenta => {
            return <tr key={cuenta.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{cuenta.correo}</td>
                <td>{cuenta.estado}</td>
                
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="warning">Ver</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/cuenta/" + cuenta.id}>Actualizar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(cuenta.id)}>Eliminar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                <h3>Cuentas para servicios de Streaming</h3>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/cuenta/nuevo">Nueva</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Cuenta</th>
                            <th width="30%">Estado</th>
                            <th width="40%">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cuentaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default CuentaList;