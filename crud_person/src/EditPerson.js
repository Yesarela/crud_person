import React, { useState } from 'react';

const EditPopup = ({ person, onSave, onCancel }) => {
    
    const apiUrl = 'https://localhost:7010/persons/';
  const [editedPerson, setEditedPerson] = useState(person);
  const [showModal, setShowModal] = useState(true); // Estado para controlar la visibilidad del modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson({ ...editedPerson, [name]: value });
  };

  const handleSave = async () => {
    const response = await fetch(`${apiUrl}${editedPerson.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Asegúrate de incluir otros encabezados necesarios, como tokens de autenticación si es necesario
        },
        body: JSON.stringify({
          ...editedPerson
        }),
      });
  
      if (response.ok) {
        const updatedPerson = await response.json();
        // Aquí puedes manejar la respuesta. Por ejemplo, cerrar el modal y actualizar la lista de personas
        setShowModal(false); // Cierra el modal
        onSave(updatedPerson); // Podrías pasar el 'updatedPerson' a una función que actualice el estado en el componente padre
      } else {
        // Manejar los errores, por ejemplo, mostrar un mensaje al usuario
        console.error('Failed to update person', await response.text());
      }
  };

  const handleClose = () => {
    onCancel();
    setShowModal(false); // Cerrar el modal
  };

  return (
    showModal && (
        <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name" style={{ color: 'black', textAlign: 'left' }}>Nombre:</label>
                  <input type="text" className="form-control" id="name" name="name" value={editedPerson.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" style={{ color: 'black', textAlign: 'left' }}>Apellido:</label>
                  <input type="text" className="form-control" id="lastName" name="lastName" value={editedPerson.lastName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                <label htmlFor="identification" style={{ color: 'black', textAlign: 'left' }}>Identificación:</label>
                <input type="text" className="form-control" id="identification" name="identification" value={editedPerson.identification} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{ color: 'black', textAlign: 'left' }}>Email:</label>
                <input type="email" className="form-control" id="email" name="email" value={editedPerson.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone" style={{ color: 'black', textAlign: 'left' }}>Teléfono:</label>
                <input type="text" className="form-control" id="phone" name="phone" value={editedPerson.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address" style={{ color: 'black', textAlign: 'left' }}>Dirección:</label>
                <input type="text" className="form-control" id="address" name="address" value={editedPerson.address} onChange={handleInputChange} />
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )
  );
};

export default EditPopup;
