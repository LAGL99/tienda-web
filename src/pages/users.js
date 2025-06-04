// Página de usuarios con datos estáticos usando styled-components
import React, { useEffect, useState } from 'react';// Importa React y hooks
import styled from 'styled-components'; // Importa styled-components
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { getToken } from './Login';// Importa la función getToken

// Styled components para mejor presentación 
const UsersContainer = styled.div`
    padding: 32px;
    background-color: #f9f9f9;
    border-radius: 12px;
    max-width: 600px;
    margin: 40px auto;
    box-shadow: 0 2px 12px rgba(0,0,0,0.10);
`;

const UsersList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const ActionButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 16px;
`;

const ActionButton = styled.button`
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    background-color: #1976d2;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background-color: #125ea2;
    }
    &:last-child {
        background-color: #e53935;
    }
    &:last-child:hover {
        background-color: #b71c1c;
    }
`;

const UserItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin: 20px 0;
    background: #fff;
    padding: 18px 20px;
    border-radius: 10px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
`;

const ProfilePic = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e0e0e0;
`;

const UserDetails = styled.div`
    flex: 1;
`;

const UserField = styled.div`
    margin-bottom: 6px;
    font-size: 16px;
    color: #333;
    span {
        font-weight: bold;
        color: #1976d2;
    }
`;
const CreateButton = styled.button`
    display: block;
    margin: 0 auto 24px auto;
    padding: 10px 24px;
    background-color: #43a047;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background-color: #2e7031;
    }
`;
// Componente principal de la página de usuarios
function Users() {
    // Hooks para manejar el estado de los usuarios y la carga
    // Importa React y hooks
    const [users, setUsers] = useState([]);
    // Estado para manejar la carga de datos
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para navegar

    // Efecto para cargar los usuarios al montar el componente
    useEffect(() => {
        // Obtiene el token de autenticación
        const token = getToken();
        // Realiza la solicitud a la API para obtener los usuarios
        fetch('https://api-dsw.vercel.app/users', {
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            // Verifica si la respuesta contiene datos de usuarios
            setUsers(Array.isArray(data.data) ? data.data : []);
            // Actualiza el estado de carga
            setLoading(false);
        });
    }, []);

    // Función para manejar la eliminación de un usuario
    const handleDeleteClick = async (user) => {
        // Confirma la eliminación del usuario
    if (window.confirm(`¿Seguro que deseas eliminar a ${user.userName}?`)) {
        try {
            // Realiza la solicitud DELETE a la API
            const response = await fetch(`https://api-dsw.vercel.app/users/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Si la respuesta es exitosa, actualiza el estado de usuarios
                setUsers(users.filter(u => u._id !== user._id));
                alert('Usuario eliminado correctamente');
            } else {
                alert('Error al eliminar usuario');
            }
        } catch (error) {
            alert('Error de red o servidor');
        }
    }
};    
    // Evento para manejar la actualización de un usuario
    const handleUpdateClick = (user) => {
        navigate('/userfields', { state: { user } });
    };
    // Evento para navegar a userFileds para crear un nuevo usuario
        const handleCreateClick = () => {
        navigate('/userfields', { state: { user: {} } });
    };

    return (
         <UsersContainer>
            <h1>Lista de Usuarios</h1>
            <CreateButton onClick={handleCreateClick}>Crear Nuevo Usuario</CreateButton>
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <UsersList>
                    {users.map(user => (
                        <UserItem key={user._id || user.id || user.email}>
                            <ProfilePic src={user.profilePicture} alt={user.userName} />
                            <UserDetails>
                                <UserField><span>Nombre:</span> {user.userName}</UserField>
                                <UserField><span>Email:</span> {user.email}</UserField>
                                <UserField><span>Rol:</span> {user.role}</UserField>
                                <UserField><span>Teléfono:</span> {user.phone}</UserField>
                                <UserField><span>Dirección:</span> {user.address}</UserField>
                                <UserField><span>Fecha de nacimiento:</span> {user.dateOfBirth && user.dateOfBirth.slice(0,10)}</UserField>
                                <UserField><span>Método de pago:</span> {user.paymentMethod}</UserField>
                                <UserField><span>Creado:</span> {user.createdAt && user.createdAt.slice(0,10)}</UserField>
                            </UserDetails>
                            <ActionButtons>
                            <ActionButton onClick={() => handleUpdateClick(user)}>Actualizar</ActionButton>
                                <ActionButton onClick={() => handleDeleteClick(user)}>Eliminar</ActionButton>
                            </ActionButtons>
                        </UserItem>
                    ))}
                </UsersList>
            )}
        </UsersContainer>
    );
}

export default Users;