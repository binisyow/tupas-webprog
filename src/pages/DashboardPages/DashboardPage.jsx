import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import MovieIcon from '@mui/icons-material/Movie';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const summaryCards = [
  { label: 'Total Users', value: '1,248', icon: GroupsIcon, color: '#1976d2' },
  { label: 'Movies Posted', value: '86', icon: MovieIcon, color: '#f97316' },
  { label: 'Monthly Views', value: '24.8K', icon: VisibilityIcon, color: '#16a34a' },
  { label: 'Growth Rate', value: '+18%', icon: TrendingUpIcon, color: '#7c3aed' },
];

const recentUsers = [
  { name: 'Jon Snow', email: 'jon@example.com', status: 'Active' },
  { name: 'Cersei Lannister', email: 'cersei@example.com', status: 'Review' },
  { name: 'Arya Stark', email: 'arya@example.com', status: 'Active' },
  { name: 'Daenerys Targaryen', email: 'daenerys@example.com', status: 'Active' },
];

const DashboardPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={800}>
          Dashboard Overview
        </Typography>
        <Typography color="text.secondary">
          Summary of users, movie content, and activity for Vixtory Movies.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {summaryCards.map(({ label, value, icon: Icon, color }) => (
          <Grid key={label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: color }}>
                    <Icon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={800}>
                      {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Quarterly Activity
              </Typography>
              <BarChart
                height={320}
                xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
                series={[
                  { data: [35, 44, 24, 34], label: 'Views' },
                  { data: [51, 6, 49, 30], label: 'Users' },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Content Split
              </Typography>
              <PieChart
                height={320}
                series={[
                  {
                    data: [
                      { id: 0, value: 45, label: 'Articles' },
                      { id: 1, value: 30, label: 'Movies' },
                      { id: 2, value: 25, label: 'Users' },
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
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Recent Users
          </Typography>
          <Stack spacing={1.5}>
            {recentUsers.map((user) => (
              <Stack
                key={user.email}
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                spacing={1}
                sx={{ borderBottom: '1px solid #e2e8f0', pb: 1.5 }}
              >
                <Box>
                  <Typography fontWeight={700}>{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Chip color={user.status === 'Active' ? 'success' : 'warning'} label={user.status} />
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DashboardPage;
