import { Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputBase, MenuItem, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import PaginationComponent from 'src/pagination';
import { getData, postData, putData, deleteData } from 'src/webService/webService';

function SpecialPoojaKit() {
  const [poojaKits, setPoojaKits] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedPoojaKit, setSelectedPoojaKit] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const token = localStorage.getItem('token');

  const [poojakitForm, setPoojakitForm] = useState({
    name: '',
    price: '',
    image: null
  });

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
    getAllPoojaKits(1, newLimit);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      getAllPoojaKits(newPage, limit);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      getAllPoojaKits(newPage, limit);
    }
  };

  const calculateIndex = (index) => {
    return (currentPage - 1) * limit + index + 1;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPoojakitForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoojakitForm(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenMenu = (event, pooja) => {
    setOpenMenu(event.currentTarget);
    setSelectedPoojaKit(pooja);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedPoojaKit(null);
  };

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setPoojakitForm({ name: '', price: '', image: null });
    setImagePreview(null);
    setOpen(true);
  };

  const handleOpenEditDialog = () => {
    setIsEditMode(true);
    setPoojakitForm({
      name: selectedPoojaKit.name,
      price: selectedPoojaKit.price,
      image: null
    });
    setImagePreview(selectedPoojaKit.full_image_url);
    setOpen(true);
    setOpenMenu(false);
  };

  const handleClose = () => {
    setOpen(false);
    setPoojakitForm({ name: '', price: '', image: null });
    setImagePreview(null);
    setSelectedPoojaKit(null);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', poojakitForm.name);
      formData.append('price', poojakitForm.price);
      if (poojakitForm.image) {
        formData.append('image', poojakitForm.image);
      }

      if (isEditMode && selectedPoojaKit) {
        await putData(`poojaProducts/special-pooja-kit/${selectedPoojaKit.id}`, formData, token, true);
      } else {
        await postData('poojaProducts/special-pooja-kit', formData, token, true);
      }

      handleClose();
      toast.success("Pooja Kit Added Successfully!")
      getAllPoojaKits(currentPage, limit);
    } catch (err) {
      console.error('Error submitting Pooja Kit:', err);
      toast.error("Error submitting Pooja Kit:", err);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedPoojaKit) {
        await deleteData(`poojaProducts/special-pooja-kit/${selectedPoojaKit.id}`, token);
        getAllPoojaKits(currentPage, limit);
      }
      handleCloseMenu();
      toast.success("Pooja Kit Deleted Successfully!");
    } catch (err) {
      console.error('Error deleting Pooja Kit:', err);
      toast.error('Error deleting Pooja Kit:', err)
    }
  };

  const getAllPoojaKits = async (page = 1, limit = 5) => {
    try {
      const params = { page, limit };
      const res = await getData('poojaProducts/special-pooja-kit', params);
      setPoojaKits(res.data);
      setTotalCount(res.totalItems);
      setTotalPages(res.totalPages);
      setCurrentPage(res.currentPage);
    } catch (err) {
      console.error('Error fetching Pooja Kit:', err);
    }
  };

  useEffect(() => {
    getAllPoojaKits();
  }, []);

  return (
    <>
      <Helmet>
        <title>Special Pooja Kit | Koogul Admin</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Special Pooja Kit
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
              Add Pooja Kit
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
                {poojaKits.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Pooja Kit found
                    </TableCell>
                  </TableRow>
                ) : (
                  poojaKits.map((pooja, index) => (
                    <TableRow key={pooja.id}>
                      <TableCell>{calculateIndex(index)}</TableCell>
                      <TableCell>{pooja.name}</TableCell>
                      <TableCell>₹{pooja.price}</TableCell>
                      <TableCell>
                        {pooja.full_image_url && (
                          <img
                            src={pooja.full_image_url}
                            alt={pooja.name}
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
                          onClick={(event) => handleOpenMenu(event, pooja)}
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
            <DialogTitle>{isEditMode ? 'Edit' : 'Add'} Pooja Kit</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                name="name"
                fullWidth
                value={poojakitForm.name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Price"
                name="price"
                type="number"
                fullWidth
                value={poojakitForm.price}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="pooja-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="pooja-image-upload">
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
            name={"Pooja Kits"}
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

export default SpecialPoojaKit;