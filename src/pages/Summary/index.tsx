import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { DashboardTemplate } from '../../templates/Dashboard';
import { getSummary } from '../../services/summary';
import { SummaryTypes } from '../../types/summary';

const Home: React.FC = () => {
  const [summary, setSummary] = useState<SummaryTypes[]>([]);


  useEffect(() => {
    getSummary()
      .then((data: SummaryTypes[]) => setSummary(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <DashboardTemplate>
      <Grid container spacing={2}>
      {summary.length > 0
        ? summary.map((sum: SummaryTypes) => (
          sum.autos > 0
            ? (
              
                <Grid item xs={6} sm={4}>
                  <Box sx={{
                    width: '100%',
                    height: '100%',
                    margin: 6,
                    border: '2px solid grey',
                    bgcolor: '#fff',
                    borderRadius: 5,
                    padding: 3
                  }}>
                    <Typography variant="h6" component="p">{sum.name}</Typography>
                    <Typography component="p">{sum.autos} Veículos</Typography>
                    <Typography component="p">R$ {sum.totalPrice}</Typography>
                  </Box>
                </Grid>

            ) :
            (<></>)
        ))
        : "Nenhum resultado encontrado"
      }
      </Grid>
    </DashboardTemplate>
  );
};

export default Home;
