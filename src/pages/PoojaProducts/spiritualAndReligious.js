import { Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputBase, MenuItem, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import PaginationComponent from 'src/pagination';
import { getData, postData, putData, deleteData } from 'src/webService/webService';

function SpiritualAndReligious() {
  const [religiious, setReligiious] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedReligious, setSelectedReligious] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const token = localStorage.getItem('token');

  const [religiousForm, setReligiousForm] = useState({
    name: '',
    price: '',
    image: null
  });

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
    getAllReligious(1, newLimit);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      getAllReligious(newPage, limit);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      getAllReligious(newPage, limit);
    }
  };

  const calculateIndex = (index) => {
    return (currentPage - 1) * limit + index + 1;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReligiousForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReligiousForm(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenMenu = (event, religious) => {
    setOpenMenu(event.currentTarget);
    setSelectedReligious(religious);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedReligious(null);
  };

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setReligiousForm({ name: '', price: '', image: null });
    setImagePreview(null);
    setOpen(true);
  };

  const handleOpenEditDialog = () => {
    setIsEditMode(true);
    setReligiousForm({
      name: selectedReligious.name,
      price: selectedReligious.price,
      image: null
    });
    setImagePreview(selectedReligious.full_image_url);
    setOpen(true);
    setOpenMenu(false);
  };

  const handleClose = () => {
    setOpen(false);
    setReligiousForm({ name: '', price: '', image: null });
    setImagePreview(null);
    setSelectedReligious(null);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', religiousForm.name);
      formData.append('price', religiousForm.price);
      if (religiousForm.image) {
        formData.append('image', religiousForm.image);
      }

      if (isEditMode && selectedReligious) {
        await putData(`poojaProducts/spiritual-and-religious/${selectedReligious.id}`, formData, token, true);
      } else {
        await postData('poojaProducts/spiritual-and-religious', formData, token, true);
      }

      handleClose();
      toast.success("Spiritual and Religious Product Added Successfully!")
      getAllReligious(currentPage, limit);
    } catch (err) {
      console.error('Error submitting Spiritual and Religious Product:', err);
      toast.error("Error submitting Spiritual and Religious Product:", err);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedReligious) {
        await deleteData(`poojaProducts/spiritual-and-religious/${selectedReligious.id}`, token);
        getAllReligious(currentPage, limit);
      }
      handleCloseMenu();
      toast.success("Spiritual and Religious Product Deleted Successfully!");
    } catch (err) {
      console.error('Error deleting Spiritual and Religious Product:', err);
      toast.error('Error deleting Spiritual and Religious Product:', err)
    }
  };

  const getAllReligious = async (page = 1, limit = 5) => {
    try {
      const params = { page, limit };
      const res = await getData('poojaProducts/spiritual-and-religious', params);
      setReligiious(res.data);
      setTotalCount(res.totalItems);
      setTotalPages(res.totalPages);
      setCurrentPage(res.currentPage);
    } catch (err) {
      console.error('Error fetching Spiritual and Religious Product:', err);
    }
  };

  useEffect(() => {
    getAllReligious();
  }, []);

  return (
    <>
      <Helmet>
        <title>Spiritual and Religious | Koogul Admin</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Spiritual and Religious
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "4px 12px",
                boxShadow: 1,
                marginRight: "20px"
              }}
            >
              <Iconify icon="eva:search-fill" />
              <InputBase placeholder="Search" sx={{ marginLeft: "8px" }} />
            </Box>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAddDialog}
            >
              Add Product
            </Button>
          </Box>
        </Stack>
        <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: "#fff" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none", backgroundColor: "transparent", maxHeight: 350 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S. No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {religiious.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Flour found
                    </TableCell>
                  </TableRow>
                ) : (
                  religiious.map((religious, index) => (
                    <TableRow key={religious.id}>
                      <TableCell>{calculateIndex(index)}</TableCell>
                      <TableCell>{religious.name}</TableCell>
                      <TableCell>₹{religious.price}</TableCell>
                      <TableCell>
                        {religious.full_image_url && (
                          <img
                            src={religious.full_image_url}
                            alt={religious.name}
                            width={60}
                            height={60}
                            style={{ objectFit: 'cover', borderRadius: 8 }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Iconify
                          icon="mdi:dots-vertical"
                          sx={{ cursor: 'pointer' }}
                          onClick={(event) => handleOpenMenu(event, religious)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add/Edit Dialog */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditMode ? 'Edit' : 'Add'} Spiritual and Religious Product</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                name="name"
                fullWidth
                value={religiousForm.name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Price"
                name="price"
                type="number"
                fullWidth
                value={religiousForm.price}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="religious-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="religious-image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Upload Image
                </Button>
              </label>
              {imagePreview && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: 4 }}
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button onClick={handleSubmit} color="primary">
                {isEditMode ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Actions Popover */}
          <Popover
            open={Boolean(openMenu)}
            anchorEl={openMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <MenuItem onClick={handleOpenEditDialog}>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>

          <PaginationComponent
            name={"Spiritual and Religious Products"}
            totalcount={totalCount}
            limit={limit}
            handleLimitChange={handleLimitChange}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Card>
      </Container>
    </>
  );
}

export default SpiritualAndReligious;