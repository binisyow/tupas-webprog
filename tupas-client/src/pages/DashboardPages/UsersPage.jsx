import { useEffect, useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json';
import { createUser, fetchUsers, updateUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'viewer',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const normalizeUser = (user, index = 0) => ({
  id: user._id || user.id || index + 1,
  _id: user._id,
  firstName: String(user.firstName ?? '').trim(),
  lastName: String(user.lastName ?? '').trim(),
  age: String(user.age ?? '').trim(),
  gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
    ? String(user.gender).trim().toLowerCase()
    : '',
  contactNumber: String(user.contactNumber ?? '').trim(),
  email: String(user.email ?? '').trim(),
  role: roles.includes(String(user.role ?? '').trim().toLowerCase())
    ? String(user.role).trim().toLowerCase()
    : 'viewer',
  username: String(user.username ?? '').trim(),
  password: '',
  address: String(user.address ?? '').trim(),
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
});

const seed = usersSeed.map((user, index) => normalizeUser(user, index));

const panelSx = {
  bgcolor: '#222227',
  border: '1px solid #3a3a42',
  borderRadius: 3,
};

const UsersPage = () => {
  const theme = useTheme();
  const [users, setUsers] = useState(seed);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadApiUsers = async () => {
      setLoading(true);
      try {
        const { data } = await fetchUsers();
        setUsers(data.map((user, index) => normalizeUser(user, index)));
        setMessage('');
      } catch {
        setMessage('Using local user data because the API is not available.');
      } finally {
        setLoading(false);
      }
    };

    loadApiUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = [user.firstName, user.lastName, user.email, user.username]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm);
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesGender = genderFilter === 'all' || user.gender === genderFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [genderFilter, roleFilter, search, statusFilter, users]);

  const validate = () => {
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!/^\d+$/.test(form.age)) nextErrors.age = 'Age must be a number only.';
    if (!/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.';
    }
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    if (!form.username.trim()) nextErrors.username = 'Username is required.';
    if (/\s/.test(form.username)) nextErrors.username = 'Username must not contain spaces.';
    if (!editingId && form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (editingId && form.password && form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (!form.gender) nextErrors.gender = 'Gender is required.';
    if (!form.role) nextErrors.role = 'Role is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetDialog = () => {
    setOpen(false);
    setEditingId(null);
    setForm(blankForm);
    setErrors({});
    setShowPassword(false);
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm(blankForm);
    setErrors({});
    setOpen(true);
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({ ...user });
    setErrors({});
    setOpen(true);
  };

  const handleToggleStatus = async (id) => {
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser?._id) {
      try {
        const { data } = await updateUser(selectedUser._id, {
          ...selectedUser,
          isActive: !selectedUser.isActive,
        });
        const savedUser = normalizeUser(data);
        setUsers((currentUsers) =>
          currentUsers.map((user) => (user.id === id ? { ...savedUser, id } : user)),
        );
        return;
      } catch (error) {
        setMessage(error.response?.data?.message || 'Unable to update user status.');
      }
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user,
      ),
    );
  };

  const handleChange = (field) => (event) => {
    const value = field === 'isActive' ? event.target.checked : event.target.value;
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = { ...form };
    if (editingId && !payload.password) delete payload.password;

    try {
      if (editingId) {
        const apiId = form._id || editingId;
        const { data } = await updateUser(apiId, payload);
        const savedUser = normalizeUser(data);
        setUsers((currentUsers) =>
          currentUsers.map((user) => (user.id === editingId ? { ...savedUser, id: editingId } : user)),
        );
      } else {
        const { data } = await createUser(payload);
        const savedUser = normalizeUser(data, users.length);
        setUsers((currentUsers) => [savedUser, ...currentUsers]);
      }

      resetDialog();
      setMessage('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to save user.');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      minWidth: 190,
      flex: 1,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: 'username', headerName: 'Username', minWidth: 150, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 230, flex: 1.4 },
    { field: 'age', headerName: 'Age', width: 80 },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 110,
      valueFormatter: (value) => labelize(value),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 110,
      renderCell: (params) => <Chip size="small" label={labelize(params.value)} />,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          size="small"
          color={params.value ? 'success' : 'default'}
          label={params.value ? 'Active' : 'Inactive'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 190,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
          <Button
            size="small"
            color={params.row.isActive ? 'warning' : 'success'}
            variant="contained"
            onClick={() => handleToggleStatus(params.row.id)}
          >
            {params.row.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Users
          </Typography>
          <Typography color="text.secondary">
            Search, filter, add, and validate user records.
          </Typography>
        </Box>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleAdd}>
          Add User
        </Button>
      </Stack>

      <Paper sx={{ ...panelSx, p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Search users"
            placeholder="Search first name, last name, email, or username"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Role</InputLabel>
            <Select label="Role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              <MenuItem value="all">All Roles</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Gender</InputLabel>
            <Select label="Gender" value={genderFilter} onChange={(event) => setGenderFilter(event.target.value)}>
              <MenuItem value="all">All Genders</MenuItem>
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Paper sx={{ ...panelSx, height: 560, width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            '& .MuiDataGrid-cell': { borderColor: '#33333a' },
            '& .MuiDataGrid-footerContainer': { borderColor: '#33333a' },
          }}
        />
      </Paper>

      {!filteredUsers.length && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {loading ? 'Loading users...' : 'No users found. Adjust your search or filters, or add a new user record.'}
        </Alert>
      )}
      {message && <Alert severity="warning" sx={{ mt: 2 }}>{message}</Alert>}

      <Dialog open={open} onClose={resetDialog} fullWidth maxWidth="md">
        <DialogTitle>{editingId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                value={form.firstName}
                onChange={handleChange('firstName')}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={form.lastName}
                onChange={handleChange('lastName')}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Age"
                value={form.age}
                onChange={handleChange('age')}
                error={Boolean(errors.age)}
                helperText={errors.age || 'Numbers only'}
              />
              <FormControl fullWidth error={Boolean(errors.gender)}>
                <InputLabel>Gender</InputLabel>
                <Select label="Gender" value={form.gender} onChange={handleChange('gender')}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth error={Boolean(errors.role)}>
                <InputLabel>Role</InputLabel>
                <Select label="Role" value={form.role} onChange={handleChange('role')}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Contact Number"
                value={form.contactNumber}
                onChange={handleChange('contactNumber')}
                error={Boolean(errors.contactNumber)}
                helperText={errors.contactNumber || 'Must be 11 digits'}
              />
              <TextField
                fullWidth
                label="Email"
                value={form.email}
                onChange={handleChange('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Username"
                value={form.username}
                onChange={handleChange('username')}
                error={Boolean(errors.username)}
                helperText={errors.username || 'No spaces allowed'}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange('password')}
                error={Boolean(errors.password)}
                helperText={errors.password || 'At least 8 characters'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <TextField
              fullWidth
              label="Address"
              value={form.address}
              onChange={handleChange('address')}
              multiline
              rows={2}
            />
            <Stack direction="row" alignItems="center" spacing={1}>
              <Switch checked={form.isActive} onChange={handleChange('isActive')} />
              <Typography color={theme.palette.text.secondary}>
                {form.isActive ? 'User status: Active' : 'User status: Inactive'}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
