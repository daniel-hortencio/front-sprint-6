import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, Box, Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Swal from 'sweetalert2';
import { DashboardTemplate } from '../../templates/Dashboard';
import Table from '../../components/Table';
import { getBrands, deleteBrand } from '../../services/brands';
import { BrandTypes } from '../../types/brand';
import '../../styles.scss'

import closeImg from '../../assets/close.svg'


const Home: React.FC = () => {
  const [brands, setBrands] = useState<BrandTypes[]>([]);
  const tableHead = ['Id', 'Marca', 'Ações'];

  const handleDelete = (id: number) => {
    Swal.fire({
      icon: 'warning',
      title: 'Tem certeza que quer deletar essa marca? ',
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
          deleteBrand(id)
            .then(status => {
              const filteredBrands = brands
                .filter(brand => brand.id !== id)
                .map(brand => brand);
              setBrands(filteredBrands);
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
    getBrands()
      .then((data: BrandTypes[]) => setBrands(data))
      .catch(err => console.log(err));
  }, []);

  const [isNewBrandModalOpen, setIsNewBrandModalOpen] = useState(false)
  const [name, setName] = useState('')

  function handleOpenNewBrandModal() {
    setIsNewBrandModalOpen(true);
  }

  function handleCloseNewBrandModal() {
    setIsNewBrandModalOpen(false);
  }

  return (
    <DashboardTemplate>
      <Modal
        isOpen={isNewBrandModalOpen}
        onRequestClose={handleCloseNewBrandModal}
        overlayClassName="reactModalOverlay"
        className="reactModalContent"
      > 
        <button
          type="button"
          onClick={handleCloseNewBrandModal}
          className="reactModalClose"
        >
          <img src={closeImg} alt="Fechar Modal" />
        </button>

        <h2>Cadastrar Marca</h2> 
        <input
          placeholder="Nome da marca"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
        
      </Modal>
      <Box mb={3}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpenNewBrandModal}>
          Adicionar nova Marca
        </Button>
      </Box>
      <Table head={tableHead}>
        {brands.length > 0
          ? brands.map((brand: BrandTypes) => (
            <TableRow>
              <TableCell component="th" id={`${brand.id}`} scope="row">
                {brand.id}
              </TableCell>
              <TableCell scope="row">{brand.name}</TableCell>
              <TableCell>
                <Link to="/" style={{ color: 'inherit' }}>
                  <CreateIcon />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(brand.id)}
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
