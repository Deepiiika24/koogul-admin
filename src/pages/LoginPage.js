import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: 'white',
  borderRadius:'10px',
  padding: theme.spacing(5, 5),
}));

const MainContent = styled('div')(() => ({
  backgroundImage: `url(https://img.freepik.com/free-photo/dark-blue-plain-wall-background_53876-92976.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'local',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100%',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <MainContent>
          <Logo
            sx={{
              position: 'fixed',
              top: { xs: 16, sm: 24, md: 40 },
              left: { xs: 16, sm: 24, md: 40 },
            }}
          />
          <Container maxWidth="sm">
            <StyledContent>
              <LoginForm />
            </StyledContent>
          </Container>
        </MainContent>
      </StyledRoot>
    </>
  );
}
