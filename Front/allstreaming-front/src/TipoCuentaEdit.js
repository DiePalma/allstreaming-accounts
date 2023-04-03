import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class TipoCuentaEdit extends Component {

    emptyItem = {
        nombre: ''        
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
            const tipoCuenta = await (await fetch(`/tipocuenta/${this.props.match.params.id}`)).json();
            this.setState({item: tipoCuenta});
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

    await fetch('/tipocuenta' + (item.id ? '/' + item.id : ''), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/tipocuenta');
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Servicio de Streaming' : 'Agregar Servicio de Streaming'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nombre">Nombre</Label>
                        <Input type="text" name="nombre" id="nombre" value={item.nombre || ''}
                               onChange={this.handleChange} autoComplete="nombre"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Guardar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/tipocuenta">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(TipoCuentaEdit);