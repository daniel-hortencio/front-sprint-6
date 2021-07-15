import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, Button, Box } from '@material-ui/core';
import Table from '../../components/Table';
import { AutoTypes } from '../../types/autos';
import { getAutos, deleteAuto } from '../../services/autos';
import { BrandTypes } from '../../types/brand'
import { getBrands } from '../../services/brands';
import {api} from '../../services/api'

import { DashboardTemplate } from '../../templates/Dashboard';

import closeImg from '../../assets/close.svg';

// interface SelectedBrand {
//   brandId: number;
//   brandName: string;
// }

const Home: React.FC = () => {
  const [autos, setAutos] = useState<AutoTypes[]>([]);
  const [brandCar, setBrandCar] = useState<BrandTypes[]>([]);
  const [isNewAutoModalOpen, setIsNewAutoModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');


  const tableHead = ['Id', 'Marca', 'Modelo', 'Ano', 'Preço', 'Ações'];

  const handleDelete = (id: number) => {
    Swal.fire({
      icon: 'warning',
      title: 'Tem certeza que quer deletar esse veículo? ',
      text: 'Essa ação não poderá ser revertida. Para confirmar digite DELETAR no campo abaixo:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'on',
      },
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      showLoaderOnConfirm: true,
      inputValidator: value => {
        const valueToString = `${value}`;
        if (valueToString.toUpperCase() === 'DELETAR') {
          deleteAuto(id)
            .then(status => {
              const filteredAutos = autos
                .filter(auto => auto.id !== id)
                .map(brand => brand);
              setAutos(filteredAutos);
              if (status === 200) {
                Swal.fire({
                  icon: 'success',
                  title: 'Item deletado com sucesso',
                  timer: 1500,
                });
              }
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Não foi possível deletar esse item',
                text: 'Ocorreu um erro, nossa equipe já está trabalhando nisso',
                timer: 1500,
              });
            });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'O item não foi deletado',
            timer: 1500,
          });
        }
        return null;
      },
    });
  };

  useEffect(() => {
    getAutos()
      .then((data: AutoTypes[]) => setAutos(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getBrands()
      .then((data: BrandTypes[]) => setBrandCar(data))
      .catch(err => console.log(err));
  }, []);

  function handleOpenNewAutoModal() {
    setIsNewAutoModalOpen(true);
  }

  function handleCloseNewAutoModal() {
    setIsNewAutoModalOpen(false);
  }

   function handleCreateNewAuto(event: FormEvent) {
    event.preventDefault()
     
    const data = {
      id:uuidv4(),
      model: name, 
      year,
      price: amount, 
      brand: selectedBrand
    }

    api.post("/autos", data).then((response) => {
      console.log(response)
      return response
    })
    
    handleCloseNewAutoModal()
    setName('')
    setAmount(0)
    setYear('')
  }

  useEffect(() => {
    getAutos()
      .then((data: AutoTypes[]) => setAutos(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <DashboardTemplate>
      <Modal
        isOpen={isNewAutoModalOpen}
        onRequestClose={handleCloseNewAutoModal}
        overlayClassName="reactModalOverlay"
        className="reactModalContent"
      >
        <button
          type="button"
          onClick={handleCloseNewAutoModal}
          className="reactModalClose"
        >
          <img src={closeImg} alt="Fechar Modal" />
        </button>
        <form onSubmit={handleCreateNewAuto}>
                <h2>Cadastrar Veículo</h2>

                <input
                    placeholder="Nome"
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}

                />

                <input
                    placeholder="ano"
                    value={year}
                    onChange={event => setYear(event.target.value)}
                />
                <select name="select" onChange={event => setSelectedBrand(event.target.value)}>
                  {brandCar.map(brand => (
                    <option 
                      key={brand.id} 
                      value={brand.id}
                    > 
                      {brand.name}
                    </option>
                  ))}
                </select>

                <button type="submit">
                    Cadastrar
                </button>

        </form>

      </Modal>
      <Box mb={3}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpenNewAutoModal}
        >
          Adicionar novo Veículo
        </Button>
      </Box>
      <Table head={tableHead}>
        {autos.length > 0
          ? autos.map((auto: AutoTypes) => (
              <TableRow>
                <TableCell component="th" id={`${auto.id}`} scope="row">
                  {auto.id}
                </TableCell>
                <TableCell scope="row">{auto.brand?.name || '-'}</TableCell>
                <TableCell scope="row">{auto.model}</TableCell>
                <TableCell scope="row">{auto.year}</TableCell>
                <TableCell scope="row">R$ {auto.price}</TableCell>
                <TableCell>
                  <Link to="/" style={{ color: 'inherit' }}>
                    <CreateIcon />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(auto.id)}
                    style={{
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))
          : 'Nenhum resutado encontrado'}
      </Table>
    </DashboardTemplate>
  );
};

export default Home;
