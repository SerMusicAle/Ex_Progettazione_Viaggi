import React, { useState } from 'react';
import './Modal.css'; // Importa il file CSS

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>Vedi scheda</button>
      {isOpen && (
        <>
          {/* Overlay - sfondo semi-trasparente */}
          <div className="modalOverlay" onClick={closeModal} />

          <div className="modalScheda">
            <h2>Titolo scheda</h2>
            <p>paragrafo di testo</p>
            <button className='ModalClose' onClick={closeModal}>Chiudi scheda</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
