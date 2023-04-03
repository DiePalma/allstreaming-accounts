import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class CuentaEdit extends Component {

    emptyItem = {
        correo: '',
        estado: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'nuevo') {
            const cuenta = await (await fetch(`/cuenta/${this.props.match.params.id}`)).json();
            this.setState({item: cuenta});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/cuenta' + (item.id ? '/' + item.id : ''), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/cuenta');
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Cuenta' : 'Agregar Cuenta'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="correo">Correo Electrónico</Label>
                        <Input type="text" name="correo" id="correo" value={item.correo || ''}
                               onChange={this.handleChange} autoComplete="correo"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="estado">Estado cuenta</Label>

                        <Input type="select" name="estado" id="estado" value={item.estado || ''}
                            onChange={this.handleChange} autoComplete="estado" >
                            <option value={"Disponible"}>Disponible</option>
                            <option value={"En uso"}>En uso</option>
                            <option value={"Bloqueada"}>Bloqueada</option>
                            </Input>
                        
                    </FormGroup>
                    <FormGroup></FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Guardar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/cuenta">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(CuentaEdit);