import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faL } from '@fortawesome/free-solid-svg-icons';
import EditPerson from './EditPerson';
import AddPerson from './addPerson';

const apiUrl = 'https://localhost:7010/persons';

function Personas() {
    const [personas, setPersonas] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editingPerson, setEditingPerson] = useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

    useEffect(() => {
        fetchPersonas();
    }, []);

    const fetchPersonas = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setPersonas(data.persons);
        } catch (error) {
            console.error('Error fetching personas:', error);
        }
    };

    const handleEditar = (person) => {
        setEditingPerson(person);
        setIsEditPopupOpen(true);
    };

    const handleSaveEdit = (editedPerson) => {
        // Actualizar los datos de la persona en el estado de datos
        const updatedPersons = personas.map((person) => person.id === editedPerson.person.id ? editedPerson.person : person);
        setPersonas(updatedPersons);

        setIsEditPopupOpen(true);
    };

    const handleCancelEdit = () => {
        setIsEditPopupOpen(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta persona?')) {
            try {
                await fetch(`${apiUrl}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'text/plain'
                    }
                });
                const updatedPersons = personas.filter((person) => person.id !== id);
                setPersonas(updatedPersons);
            } catch (error) {
                console.error('Error deleting persona:', error);
            }
        }
    };

    const handleAdd = () => {
        setIsAddPopupOpen(true);
      };

    const handleSaveAdd = (newPerson) => {
    setPersonas([...personas, newPerson]);
    setIsAddPopupOpen(false);
    };

    const handleCancelAdd = () => {
    setIsAddPopupOpen(false);
    };

    return (
        <div className="container mt-5">
          <div className="d-flex justify-content-end mb-3">
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
          Agregar Persona
        </button>
      </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Identification</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr key={persona.id}>
                            <th scope="row">{persona.id}</th>
                            <td>{persona.name}</td>
                            <td>{persona.lastName}</td>
                            <td>{persona.identification}</td>
                            <td>{persona.email}</td>
                            <td>{persona.phone}</td>
                            <td>{persona.address}</td>
                            <td>
                                {/* Icono de editar */}
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    onClick={() => handleEditar(persona)}
                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                />

                                <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => handleDelete(persona.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditPopupOpen && (
                <EditPerson
                    person={editingPerson}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}

            {isAddPopupOpen && (
        <AddPerson
          onSave={handleSaveAdd}
          onCancel={handleCancelAdd}
        />
      )}
        </div>
    );
}

export default Personas;
