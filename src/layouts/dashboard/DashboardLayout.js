import { useState } from 'react';

import { Outlet, Navigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';

import { useIsAuthenticated } from 'react-auth-kit';

import Header from './header';
import Nav from './nav';
import BasicTable from '../../components/table';


// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  // flexDirection: 'row-reverse',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {


  const [open, setOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated()


  return (isAuthenticated()) ?
    (
      <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />

        <Nav openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
          <BasicTable/>
          <Outlet />
        </Main>
      </StyledRoot>
    ) :
    (
      <Navigate to='/login' />
    )
}
