import React, { useState } from 'react';

const AddPerson = ({ onSave, onCancel }) => {
  const apiUrl = 'https://localhost:7010/persons/';
  const [showModal, setShowModal] = useState(true);

  const [newPerson, setNewPerson] = useState({
    name: '',
    lastName: '',
    identification: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPerson)
      });

      if (response.ok) {
        const savedPerson = await response.json();
        onSave(savedPerson);
      } else {
        console.error('Failed to save person:', await response.text());
      }
    } catch (error) {
      console.error('Error saving person:', error);
    }
  };

  return (
    showModal && (
    <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name" style={{ color: 'black', textAlign: 'left' }}>Nombre:</label>
              <input type="text" className="form-control" id="name" name="name" value={newPerson.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" style={{ color: 'black', textAlign: 'left' }}>Apellido:</label>
              <input type="text" className="form-control" id="lastName" name="lastName" value={newPerson.lastName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
          <label htmlFor="identification" style={{ color: 'black', textAlign: 'left' }}>Identificación:</label>
          <input type="text" className="form-control" id="identification" name="identification" value={newPerson.identification} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email" style={{ color: 'black', textAlign: 'left' }}>Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={newPerson.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone" style={{ color: 'black', textAlign: 'left' }}>Teléfono:</label>
          <input type="text" className="form-control" id="phone" name="phone" value={newPerson.phone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address" style={{ color: 'black', textAlign: 'left' }}>Dirección:</label>
          <input type="text" className="form-control" id="address" name="address" value={newPerson.address} onChange={handleInputChange} />
        </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    )
  );
};

export default AddPerson;
