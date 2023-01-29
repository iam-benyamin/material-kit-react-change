import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useEffect, useState } from 'react';
import { api } from '../../utils/api'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicTable() {
  const [open, setOpen] = useState(false);
  const [massage, setMassage] = useState('');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rowId, setRowId] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [assets, setAssets] = useState([]);
  useEffect(() => {
    async function getApi() {
      const response = await api.get("posts/");
      setAssets(response.data.slice(0, 20));
    }
    getApi();
  }, []);

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">body</TableCell>
            <TableCell align="left"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.body}</TableCell>
              <TableCell style={{ 'display': "flex" }} align="left">
                <button style={{ border: "none", 'background': 'transparent', 'cursor': 'pointer', 'marginRight': '10px' }}
                  type="submit"
                  onClick={async () => {
                    handleOpenModal();
                    setTitle(row.title);
                    setBody(row.body);
                    setRowId(row.id);
                  }}
                ><EditIcon /></button>

                <button style={{ border: "none", 'background': 'transparent', 'cursor': 'pointer', color: 'red' }} type="submit"
                  onClick={async () => {
                    await api.delete(`posts/${row.id}`);
                    setMassage('deleted succesfuly');
                    handleClick();
                  }}
                ><DeleteIcon /></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        severity="success"
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={massage}
        action={action}
      />
      <div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="table-title"
                label="title"
                defaultValue={title}
                margin="normal"
                fullWidth
              />
              <TextField
                id="table-body"
                label="body"
                defaultValue={body}
                margin="normal"
                fullWidth
              />
            </Typography>
            <Button onClick={async () => {
              const response = await api.patch(`posts/${rowId}`, {'title': title, 'body': body});
              console.log(response)
              console.log(response.status)

              handleCloseModal();
              setMassage(`updated succesfuly`);
              handleClick();
            }} >Save</Button>
          </Box>
        </Modal>
      </div>
    </TableContainer>
  );
}