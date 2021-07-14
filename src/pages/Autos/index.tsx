import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@material-ui/core';
import Table from '../../components/Table';
import { AutoTypes } from '../../types/autos';
import { getAutos, deleteAuto } from '../../services/autos';
import { DashboardTemplate } from '../../templates/Dashboard';

const Home: React.FC = () => {
  const [autos, setAutos] = useState<AutoTypes[]>([]);

  const tableHead = ['Id', 'Modelo', 'Ano', 'Preço', 'Ações'];

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

  return (
    <DashboardTemplate>
      <Table head={tableHead}>
        {autos.length > 0
          ? autos.map((auto: AutoTypes) => (
              <TableRow>
                <TableCell component="th" id={`${auto.id}`} scope="row">
                  {auto.id}
                </TableCell>
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
