/* eslint-disable radix */
import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, Button, Box } from '@material-ui/core';
import Table from '../../components/Table';
import { AutoTypes } from '../../types/autos';
import {
  getAutos,
  getAuto,
  deleteAuto,
  createAutos,
} from '../../services/autos';
import { BrandTypes } from '../../types/brand';
import { getBrands } from '../../services/brands';

import { DashboardTemplate } from '../../templates/Dashboard';

import closeImg from '../../assets/close.svg';

const Home: React.FC = () => {
  const [autos, setAutos] = useState<AutoTypes[]>([]);
  const [brandCar, setBrandCar] = useState<BrandTypes[]>([]);
  const [isNewAutoModalOpen, setIsNewAutoModalOpen] = useState(false);
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [verify, setVerify] = useState<'post' | 'put' | ''>('');
  const [idAutoForUpdate, setIdAutoForUpdate] = useState(0);

  const tableHead = ['Id', 'Marca', 'Modelo', 'Ano', 'Preço', 'Ações'];

  const handleDelete = (id: number) => {
    console.log(id);
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
                .map(auto => auto);
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

  function handleOpenNewAutoModal() {
    setIsNewAutoModalOpen(true);
  }

  useEffect(() => {
    getBrands()
      .then((data: BrandTypes[]) => setBrandCar(data))
      .catch(err => console.log(err));
  }, []);

  function handleCloseNewAutoModal() {
    setIsNewAutoModalOpen(false);
    setModel('');
    setPrice('');
    setYear('');
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const body = {
      model,
      price: parseInt(price),
      year: parseInt(year),
      brandId: parseInt(selectedBrand),
    };

    createAutos(body)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Veículo criado com sucesso',
          timer: 1500,
        });
        getAutos()
          .then((data: AutoTypes[]) => setAutos(data))
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Não foi possível criar este veículo',
          text: 'Nossa equipe já está trabalhando para resolver isso',
        });
      });

    handleCloseNewAutoModal();
  }

  function handleUpdateAuto(id: number) {
    getAuto(id).then(res => {
      setModel(res.model);
      setYear(`${res.year}`);
      setPrice(`${res.price}`);
      setSelectedBrand(`${res!.brand!.id}`);
      setIsNewAutoModalOpen(true);
    });
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
        <form onSubmit={handleSubmit}>
          <h2>Cadastrar Veículo</h2>

          <input
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
          </select>

          <button type="submit">Cadastrar</button>
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
                  <Link to={`editar-veiculo/${auto.id}`}>
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
