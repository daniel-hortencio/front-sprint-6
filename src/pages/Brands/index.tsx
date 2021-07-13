import { TableRow, TableCell } from '@material-ui/core';
import { DashboardTemplate } from '../../templates/Dashboard';
import Table from '../../components/Table';

const data = [
  { id: 1, brand: 'Ford', model: 'KA', year: 2021, price: 1500 },
  { id: 2, brand: 'Ford', model: 'KA', year: 2021, price: 1500 },
];

const Home: React.FC = () => {
  const tableHead = ['Marca', 'Modelo', 'Ano', 'Preço'];

  return (
    <DashboardTemplate>
      <h1>Carango Bom</h1>
      <Table head={tableHead}>
        {data.map(auto => (
          <TableRow>
            <TableCell component="th" id={auto.brand} scope="row">
              {auto.brand}
            </TableCell>
            <TableCell component="th" id={auto.brand} scope="row">
              {auto.model}
            </TableCell>
            <TableCell component="th" id={auto.brand} scope="row">
              {auto.year}
            </TableCell>
            <TableCell component="th" id={auto.brand} scope="row">
              R$ {auto.price}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </DashboardTemplate>
  );
};

export default Home;
