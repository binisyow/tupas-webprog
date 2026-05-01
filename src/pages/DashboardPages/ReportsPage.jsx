import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const ReportsPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={800}>
          Reports
        </Typography>
        <Typography color="text.secondary">
          Charts and data visualization using MUI X Charts sample-style data.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Monthly Visitors
              </Typography>
              <LineChart
                height={330}
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  { data: [2, 5.5, 2, 8.5, 1.5, 5], label: 'Visitors' },
                  { data: [1, 3, 4, 5, 7, 8], label: 'Signups' },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Genre Distribution
              </Typography>
              <PieChart
                height={330}
                series={[
                  {
                    data: [
                      { id: 0, value: 35, label: 'Comedy' },
                      { id: 1, value: 25, label: 'Animation' },
                      { id: 2, value: 20, label: 'Action' },
                      { id: 3, value: 20, label: 'Drama' },
                    ],
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Article Performance
          </Typography>
          <BarChart
            height={360}
            xAxis={[{ scaleType: 'band', data: ['Home Alone', 'Toy Story', 'Cars', 'Avengers'] }]}
            series={[
              { data: [42, 55, 38, 60], label: 'Reads' },
              { data: [18, 24, 15, 30], label: 'Shares' },
            ]}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ReportsPage;
