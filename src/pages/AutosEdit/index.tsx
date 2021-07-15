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
import {
  getAutos,
  getAuto,
  editAutos,
  deleteAuto,
  createAutos,
} from '../../services/autos';
import { BrandTypes } from '../../types/brand';
import { getBrands } from '../../services/brands';

import { DashboardTemplate } from '../../templates/Dashboard';

const Home: React.FC = () => {
  const [brandCar, setBrandCar] = useState<BrandTypes[]>([]);
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const params: any = useParams();
  const history = useHistory();

  console.log(params);

  useEffect(() => {
    getBrands()
      .then((data: BrandTypes[]) => setBrandCar(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getAuto(parseInt(params.id)).then(res => {
      setModel(res.model);
      setYear(`${res.year}`);
      setPrice(`${res.price}`);
      setSelectedBrand(`${res!.brand!.id}`);
    });
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const carId = parseInt(params.id);

    const body = {
      model,
      price: parseInt(price),
      year: parseInt(year),
      brandId: parseInt(selectedBrand),
    };

    editAutos(carId, body)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Veículo editado com sucesso',
          timer: 1500,
        }).then(() => history.push('/veiculos'));
      })
      .catch(err => {
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
        <h2>Editar veículo</h2>

        <input
          placeholder="Nome do carro"
          type="text"
          value={model}
          onChange={event => setModel(event.target.value)}
          style={{ padding: '1rem', marginBottom: '1rem' }}
        />

        <input
          type="number"
          placeholder="Valor do veículo"
          value={price}
          onChange={event => setPrice(event.target.value)}
          style={{ padding: '1rem', marginBottom: '1rem' }}
        />

        <input
          placeholder="ano"
          value={year}
          type="number"
          onChange={e => setYear(e.target.value)}
          style={{ padding: '1rem', marginBottom: '1rem' }}
        />
        <select
          name="select"
          value={selectedBrand}
          style={{ padding: '1rem', marginBottom: '1rem' }}
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

        {/* <button type="submit">Atualizar</button> */}
        <Button color="primary" variant="contained" type="submit">
          Atualizar
        </Button>
      </form>
    </DashboardTemplate>
  );
};

export default Home;
