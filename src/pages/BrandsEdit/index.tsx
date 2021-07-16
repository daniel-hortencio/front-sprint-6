/* eslint-disable radix */
import { FormEvent, useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Swal from 'sweetalert2';

import { TableRow, TableCell, Button, Box } from '@material-ui/core';
import Table from '../../components/Table';
import { AutoTypes } from '../../types/autos';
import { BrandTypes } from '../../types/brand';
import { getBrand, editBrand } from '../../services/brands';

import { DashboardTemplate } from '../../templates/Dashboard';

const Home: React.FC = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const params: any = useParams();
  const history = useHistory();

  const brandId = parseInt(params.id);

  useEffect(() => {
    getBrand(brandId)
      .then((data: BrandTypes) => setBrand(data.name))
      .catch((err: any) => console.log(err));
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const body = {
      name: brand,
    };

    editBrand(brandId, body)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Marca editada com sucesso',
          timer: 1500,
        }).then(() => history.push('/marcas'));
      })
      .catch((err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Não foi possível editar este veículo',
          text: 'Nossa equipe já está trabalhando para resolver isso',
        });
      });
  }

  return (
    <DashboardTemplate>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '20rem' }}
      >
        <h2>Editar Marca</h2>

        <input
          placeholder="Nome do carro"
          type="text"
          value={brand}
          onChange={event => setBrand(event.target.value)}
          style={{ padding: '1rem', marginBottom: '1rem' }}
        />

        {/* <button type="submit">Atualizar</button> */}
        <Button color="primary" variant="contained" type="submit">
          Atualizar
        </Button>
      </form>
    </DashboardTemplate>
  );
};

export default Home;
