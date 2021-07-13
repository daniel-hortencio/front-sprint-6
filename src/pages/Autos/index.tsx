import { useEffect, useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { DashboardTemplate } from '../../templates/Dashboard';
import Table from '../../components/Table';
import { AutoTypes } from '../../types/autos';
import { getAutos } from '../../services/autos';

const Home: React.FC = () => {
  const [autos, setAutos] = useState<AutoTypes[]>([]);

  const tableHead = ['Id', 'Modelo', 'Ano', 'Preço'];

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
              </TableRow>
            ))
          : 'Nenhum resutado encontrado'}
      </Table>
    </DashboardTemplate>
  );
};

export default Home;
