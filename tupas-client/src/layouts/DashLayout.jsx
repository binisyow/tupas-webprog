import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArticleIcon from '@mui/icons-material/Article';
import { clearAuth, getAuth } from '../utils/auth';

const drawerWidth = 240;

const dashboardTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6b00',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff9a3d',
    },
    background: {
      default: '#151519',
      paper: '#222227',
    },
    text: {
      primary: '#ffffff',
      secondary: '#c9c9d1',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #3a3a42',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: '#3a3a42',
          color: '#ffffff',
        },
        columnHeaders: {
          backgroundColor: '#19191d',
          color: '#ffffff',
        },
        row: {
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 0, 0.08)',
          },
        },
      },
    },
  },
});

const dashboardItems = [
  { label: 'Dashboard', to: '/dashboard', icon: DashboardIcon },
  { label: 'Articles', to: '/dashboard/articles', icon: ArticleIcon },
  { label: 'Reports', to: '/dashboard/reports', icon: BarChartIcon },
  { label: 'Users', to: '/dashboard/users', icon: PeopleIcon },
];

const DashLayoutContent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const role = getAuth()?.user?.role || getAuth()?.type;
  const visibleItems = dashboardItems.filter((item) => item.to !== '/dashboard/users' || role === 'admin');

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#151519', color: 'white' }}>
      <Toolbar>
        <Box>
          <Typography variant="h6" noWrap fontWeight={800}>
            Vixtory
          </Typography>
          <Typography variant="caption" sx={{ color: '#ff8a1f', letterSpacing: '0.24em' }}>
            ADMIN
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: '#2b2b31' }} />
      <List sx={{ px: 1.5 }}>
        {visibleItems.map((item) => {
          const IconComponent = item.icon;

          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 999,
                mb: 0.75,
                color: '#c9c9d1',
                '&.Mui-selected': {
                  bgcolor: '#ff6b00',
                  color: 'white',
                },
                '&.Mui-selected:hover': {
                  bgcolor: '#f06400',
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 107, 0, 0.12)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 42 }}>
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#151519' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (themeValue) => themeValue.zIndex.drawer + 1,
          bgcolor: '#17171a',
          borderBottom: '1px solid #25252b',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {!isDesktop && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 800 }}>
            Dashboard
          </Typography>
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: '#202025',
              border: '1px solid #3a3a42',
              borderRadius: 999,
              display: { xs: 'none', sm: 'flex' },
              px: 1.5,
            }}
          >
            <SearchIcon fontSize="small" sx={{ color: '#ff8a1f' }} />
            <InputBase
              placeholder="Search..."
              sx={{ color: 'white', ml: 1, width: 180 }}
            />
          </Box>
          <Button color="primary" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              bgcolor: '#151519',
              borderRight: '1px solid #2b2b31',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#151519',
              borderRight: '1px solid #2b2b31',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, sm: 3 },
          bgcolor: '#151519',
          background:
            'radial-gradient(circle at top right, rgba(255, 107, 0, 0.1), transparent 30%), #151519',
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

const DashLayout = () => {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <DashLayoutContent />
    </ThemeProvider>
  );
};

export default DashLayout;
