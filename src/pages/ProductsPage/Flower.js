import { Box, Button, Card, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputBase, MenuItem, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Iconify from 'src/components/iconify'

function Flower() {
  const [leads, setLeads] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState();

  const handleOpenMenu = (event, userId) => {
    setOpenMenu(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedUserId(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddRice = () => {

  };

  return (
    <>
      <Helmet>
        <title>Flower | Koogul Admin</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Flower
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
              <InputBase
                placeholder="Search"
                sx={{ marginLeft: "8px" }}
              />
            </Box>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            Flower
            </Button>
          </Box>
        </Stack>
        <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: "#fff" }}>
          {/* Projects Table */}
          <TableContainer component={Paper} sx={{ boxShadow: "none", backgroundColor: "transparent", maxHeight: 350 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((leads) => (
                      <TableRow key={leads.id}>
                        <TableCell>
                        </TableCell>
                        <TableCell>
                          <TableCell>
                            <Iconify icon="mdi:dots-vertical"
                              sx={{ cursor: 'pointer' }}
                              onClick={(event) => handleOpenMenu(event, leads._id)}
                            />
                          </TableCell>
                        </TableCell>
                      </TableRow>
                    ))
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add Rice Dialog */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Flower Variety</DialogTitle>
            <DialogContent>
              <TextField margin="dense" label="Flower Name" name="Flower Name" fullWidth />
              <TextField margin="dense" label="Upload Image" name="uploadImage" fullWidth >
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button onClick={handleAddRice} color="primary">Add</Button>
            </DialogActions>
          </Dialog>
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
            <MenuItem>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>
            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </Card>
      </Container>
    </>
  )
}

export default Flower
