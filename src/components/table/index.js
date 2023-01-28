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

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { api } from '../../utils/api'


export default function BasicTable() {
  const [open, setOpen] = useState(false);

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
                    await api.patch(`posts/${row.id}`, {});
                    handleClick();
                  }}
                ><EditIcon /></button>

                <button style={{ border: "none", 'background': 'transparent', 'cursor': 'pointer', color: 'red' }} type="submit" onClick={async () => {
                  await api.delete(`posts/${row.id}`);
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
        message="delete succssfuly"
        action={action}
      />
    </TableContainer>
  );
}