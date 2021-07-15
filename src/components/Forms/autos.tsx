import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';

interface IFormAutos {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  title: string;
  buttonText: string;
}

const FormAutos: React.FC<IFormAutos> = ({
  isOpen,
  closeModal,
  onSubmit,
  children,
  title,
  buttonText,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      // onRequestClose={handleCloseNewAutoModal}
      overlayClassName="reactModalOverlay"
      className="reactModalContent"
    >
      <button type="button" onClick={closeModal} className="reactModalClose">
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>

        {children}

        {/* <input
          placeholder="Nome do carro"
          type="text"
          value={model}
          onChange={event => setModel(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor do veículo"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <input
          placeholder="ano"
          value={year}
          type="number"
          onChange={e => setYear(e.target.value)}
        />
        <select
          name="select"
          value={selectedBrand}
          onChange={e => {
            setSelectedBrand(e.target.value);
          }}
        >
          <option defaultChecked disabled>
            Selecione uma marca
          </option>
          {brandCar.map(brand => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select> */}

        <button type="submit">{buttonText}</button>
      </form>
    </Modal>
  );
};

export default FormAutos;
