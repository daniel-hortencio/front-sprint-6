import { useEffect, useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { DashboardTemplate } from '../../templates/Dashboard';
import Table from '../../components/Table';
import { getBrands } from '../../services/brands';
import { BrandTypes } from '../../types/brand';

const Home: React.FC = () => {
  const [brands, setBrands] = useState<BrandTypes[]>([]);

  const tableHead = ['Id', 'Marca'];

  useEffect(() => {
    getBrands()
      .then((data: BrandTypes[]) => setBrands(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <DashboardTemplate>
      <Table head={tableHead}>
        {brands.length > 0
          ? brands.map((brand: BrandTypes) => (
              <TableRow>
                <TableCell component="th" id={`${brand.id}`} scope="row">
                  {brand.id}
                </TableCell>
                <TableCell scope="row">{brand.name}</TableCell>
              </TableRow>
            ))
          : 'Nenhum resutado encontrado'}
      </Table>
    </DashboardTemplate>
  );
};

export default Home;
