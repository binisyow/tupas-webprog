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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import articlesSeed from '../../data/articles';
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
} from '../../services/ArticleService';

const blankForm = {
  title: '',
  desc: '',
  fullDesc: '',
  img: '',
  director: '',
  year: '',
  genre: '',
  status: 'published',
};

const panelSx = {
  bgcolor: '#222227',
  border: '1px solid #3a3a42',
  borderRadius: 3,
};

const normalizeArticle = (article, index = 0) => ({
  id: article._id || article.id || index + 1,
  _id: article._id,
  title: article.title || '',
  desc: article.desc || '',
  fullDesc: article.fullDesc || '',
  img: article.img || '',
  director: article.director || '',
  year: article.year || '',
  genre: article.genre || '',
  status: article.status || 'published',
});

const DashArticleListPage = () => {
  const [articles, setArticles] = useState(() => articlesSeed.map(normalizeArticle));
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        if (data.length) setArticles(data.map(normalizeArticle));
      } catch {
        setMessage('Using local article data because the API is not available.');
      }
    };

    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return articles.filter((article) =>
      [article.title, article.genre, article.director, article.year]
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    );
  }, [articles, search]);

  const resetDialog = () => {
    setOpen(false);
    setEditingId(null);
    setForm(blankForm);
    setErrors({});
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.desc.trim()) nextErrors.desc = 'Short description is required.';
    if (!form.fullDesc.trim()) nextErrors.fullDesc = 'Full description is required.';
    if (!form.img.trim()) nextErrors.img = 'Image URL is required.';
    if (!form.director.trim()) nextErrors.director = 'Director is required.';
    if (!form.year.trim()) nextErrors.year = 'Year is required.';
    if (!form.genre.trim()) nextErrors.genre = 'Genre is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm(blankForm);
    setErrors({});
    setOpen(true);
  };

  const handleEdit = (article) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      desc: article.desc,
      fullDesc: article.fullDesc,
      img: article.img,
      director: article.director,
      year: article.year,
      genre: article.genre,
      status: article.status,
    });
    setErrors({});
    setOpen(true);
  };

  const handleChange = (field) => (event) => {
    setForm((currentForm) => ({ ...currentForm, [field]: event.target.value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const selectedArticle = articles.find((article) => article.id === editingId);

    try {
      if (editingId && selectedArticle?._id) {
        const { data } = await updateArticle(selectedArticle._id, form);
        const savedArticle = normalizeArticle(data);
        setArticles((currentArticles) =>
          currentArticles.map((article) =>
            article.id === editingId ? { ...savedArticle, id: editingId } : article,
          ),
        );
      } else if (editingId) {
        setArticles((currentArticles) =>
          currentArticles.map((article) =>
            article.id === editingId ? { ...article, ...form } : article,
          ),
        );
      } else {
        const { data } = await createArticle(form);
        setArticles((currentArticles) => [normalizeArticle(data), ...currentArticles]);
      }

      setMessage('');
      resetDialog();
    } catch (error) {
      if (!editingId) {
        const nextId = articles.length
          ? Math.max(...articles.map((article) => Number(article.id) || 0)) + 1
          : 1;
        setArticles((currentArticles) => [{ ...form, id: nextId }, ...currentArticles]);
        resetDialog();
        setMessage('Article added locally because the API is not available.');
        return;
      }

      setMessage(error.response?.data?.message || 'Unable to save article.');
    }
  };

  const handleDelete = async (article) => {
    try {
      if (article._id) await deleteArticle(article._id);
      setArticles((currentArticles) =>
        currentArticles.filter((currentArticle) => currentArticle.id !== article.id),
      );
      setMessage('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to delete article.');
    }
  };

  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 180, flex: 1 },
    { field: 'genre', headerName: 'Genre', minWidth: 150, flex: 0.8 },
    { field: 'director', headerName: 'Director', minWidth: 170, flex: 1 },
    { field: 'year', headerName: 'Year', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          size="small"
          color={params.value === 'published' ? 'success' : 'warning'}
          label={params.value}
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
          <Button size="small" color="warning" variant="contained" onClick={() => handleDelete(params.row)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Articles</Typography>
          <Typography color="text.secondary">
            Add, edit, delete, and search the articles shown on ArticleListPage.
          </Typography>
        </Box>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleAdd}>Add Article</Button>
      </Stack>

      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}

      <Paper sx={{ ...panelSx, p: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Search Articles"
          placeholder="Search title, genre, director, or year"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Paper>

      <Paper sx={{ ...panelSx, height: 560, width: '100%' }}>
        <DataGrid
          rows={filteredArticles}
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

      <Dialog open={open} onClose={resetDialog} fullWidth maxWidth="md">
        <DialogTitle>{editingId ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={form.title}
              onChange={handleChange('title')}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Director"
                value={form.director}
                onChange={handleChange('director')}
                error={Boolean(errors.director)}
                helperText={errors.director}
              />
              <TextField
                fullWidth
                label="Year"
                value={form.year}
                onChange={handleChange('year')}
                error={Boolean(errors.year)}
                helperText={errors.year}
              />
              <TextField
                fullWidth
                label="Genre"
                value={form.genre}
                onChange={handleChange('genre')}
                error={Boolean(errors.genre)}
                helperText={errors.genre}
              />
            </Stack>
            <TextField
              fullWidth
              label="Image URL"
              value={form.img}
              onChange={handleChange('img')}
              error={Boolean(errors.img)}
              helperText={errors.img}
            />
            <TextField
              fullWidth
              label="Short Description"
              value={form.desc}
              onChange={handleChange('desc')}
              multiline
              rows={2}
              error={Boolean(errors.desc)}
              helperText={errors.desc}
            />
            <TextField
              fullWidth
              label="Full Description"
              value={form.fullDesc}
              onChange={handleChange('fullDesc')}
              multiline
              rows={4}
              error={Boolean(errors.fullDesc)}
              helperText={errors.fullDesc}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label="Status" value={form.status} onChange={handleChange('status')}>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save Article</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
