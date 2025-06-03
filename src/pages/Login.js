import React, { useState } from 'react';// Importa React y useState
import styled from 'styled-components'; // Importa styled-components
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

// Guardar el token globalmente 
export function getToken() {
    return localStorage.getItem('token');
}
// Establecer el token en el almacenamiento local
export function setToken(token) {
    localStorage.setItem('token', token);
}

// Componente de inicio de sesión de styled-components
const Container = styled.div`
    max-width: 350px;
    margin: 60px auto;
    background: #f9f9f9;
    padding: 32px 28px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.10);
`;

const Title = styled.h2`
    color: #1976d2;
    margin-bottom: 24px;
    text-align: center;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
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

// Componente de inicio de sesión
function Login() {
    // Estado para manejar el formulario y errores
    //Estado para manejar el formulario de inicio de sesión
    const [form, setForm] = useState({ email: '', password: '' });
    // Estado para manejar el error de inicio de sesión
    const [error, setError] = useState('');
    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Función para manejar los cambios en el formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Enviar los datos del formulario al servidor
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            // Procesar la respuesta del servidor
            const data = await response.json();
            // Si la respuesta es exitosa y contiene un token, guardarlo y redirigir al usuario
            if (response.ok && data.token) {
                setToken(data.token);
                navigate('/');
            } else {
                // Si hay un error, mostrar el mensaje de error
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch {
            // Si hay un error de red o servidor, mostrar un mensaje genérico
            setError('Error de red o servidor');
        }
    };

    return (
        <Container>
            <Title>Iniciar Sesión</Title>
            <StyledForm onSubmit={handleSubmit}>
                <div>
                    <Label>Email:</Label>
                    <Input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>Contraseña:</Label>
                    <Input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit">Entrar</Button>
                {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
            </StyledForm>
        </Container>
    );
}

export default Login;