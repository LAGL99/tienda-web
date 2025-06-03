import React, { useState } from 'react';// Importa React y useState
import { useLocation } from 'react-router-dom';// Importa useLocation
import styled from 'styled-components';// Importa styled-components
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

// Componente de campos de usuario con styled-components
const Container = styled.div`
    max-width: 420px;
    margin: 40px auto;
    background: #f9f9f9;
    padding: 32px 28px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.10);
`;

const Title = styled.h2`
    color: #1976d2;
    margin-bottom: 24px;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 4px;
    color: #333;
`;

const Input = styled.input`
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid #bdbdbd;
    font-size: 15px;
    background: #fff;
`;

const Button = styled.button`
    margin-top: 16px;
    background: #1976d2;
    color: #fff;
    border: none;
    padding: 10px 0;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #125ea2;
    }
`;

// Componente principal de campos de usuario
function UserFields() {
    /// Importa useLocation y useNavigate para manejar la navegación y el estado
    /// Importa useState para manejar el estado del formulario
    const location = useLocation();// Obtiene la ubicación actual
    const navigate = useNavigate();// Crea una instancia de navegación
    const user = location.state?.user;// Obtiene el usuario del estado de la ubicación

    // Verifica si se está editando un usuario existente
    const isEdit = !!(user && Object.keys(user).length > 0);

    // Estado del formulario, inicializado con los datos del usuario si existe
    const [form, setForm] = useState({
        userName: user?.userName || '',
        email: user?.email || '',
        password: user?.password || '',
        role: user?.role || '',
        profilePicture: user?.profilePicture || '',
        phone: user?.phone || '',
        address: user?.address || '',
        dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '',
        paymentMethod: user?.paymentMethod || ''
    });

    // Si no hay usuario seleccionado, muestra un mensaje
    if (!user) return <Container>No hay usuario seleccionado</Container>;

    // Función para manejar los cambios en el formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Función para manejar la cancelación
    const handleCancel = () => {
        setForm({
            userName: '',
            email: '',
            password: '',
            role: '',
            profilePicture: '',
            phone: '',
            address: '',
            dateOfBirth: '',
            paymentMethod: ''
        });
        navigate('/users');
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realiza la solicitud a la API para crear o editar el usuario
            let response;
            if (isEdit) {
                // Si es un usuario existente, realiza una solicitud PUT
                response = await fetch(`http://localhost:3001/users/${user._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
            } else {
                // Si es un nuevo usuario, realiza una solicitud POST
                response = await fetch('http://localhost:3001/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
            }
            // Procesa la respuesta de la API
            if (response.ok) {
                // Si la respuesta es exitosa, redirige al usuario a la página principal
                navigate('/', { state: { user } });
                alert(isEdit ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
            } else {
                alert('Error al guardar usuario');
            }
        } catch (error) {
            alert('Error de red o servidor');
        }
    };

    return (
        <Container>
            <Title>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</Title>
            <StyledForm onSubmit={handleSubmit}>
                <Field>
                    <Label>Nombre:</Label>
                    <Input name="userName" value={form.userName} onChange={handleChange} />
                </Field>
                <Field>
                    <Label>Email:</Label>
                    <Input name="email" value={form.email} onChange={handleChange} />
                </Field>
                <Field>
                    <Label>Contraseña:</Label>
                    <Input name="password" value={form.password} onChange={handleChange} type="password" />
                </Field>
                <Field>
                    <Label>Rol:</Label>
                    <Input name="role" value={form.role} onChange={handleChange} />
                </Field>
                <Field>
                    <Label>Foto de perfil (URL):</Label>
                    <Input name="profilePicture" value={form.profilePicture} onChange={handleChange} />
                </Field>
                <Field>
                    <Label>Teléfono:</Label>
                    <Input name="phone" value={form.phone} onChange={handleChange} />
                </Field>
                <Field>
                    <Label>Dirección:</Label>
                    <Input name="address" value={form.address} onChange={handleChange} />
                </Field>
                <Field>
                    <Label>Fecha de nacimiento:</Label>
                    <Input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
                </Field>
                <Field>
                    <Label>Método de pago:</Label>
                    <Input name="paymentMethod" value={form.paymentMethod} onChange={handleChange} />
                </Field>
                <Button type="submit">{isEdit ? 'Guardar Cambios' : 'Crear Usuario'}</Button>
                <Button type="button" style={{ background: '#bdbdbd', color: '#333' }} onClick={handleCancel}>
                    Cancelar
                </Button>
            </StyledForm>
        </Container>
    );
}

export default UserFields;