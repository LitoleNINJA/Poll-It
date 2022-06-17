import '../styles/globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {

  const theme = createTheme({
    typography: {
      fontFamily: `'Inter','san-serif'`
    },
  });
  theme.typography.h2 = {
    [theme.breakpoints.up('md')]: {
      fontSize: '3.75vw',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '8.5vw',
    },
  };
  theme.typography.h3 = {
    [theme.breakpoints.up('md')]: {
      fontSize: '3vw',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '6vw',
    },
  };
  theme.typography.h5 = {
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5vw',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '3vw',
    },
  };
  theme.typography.h6 = {
    [theme.breakpoints.up('md')]: {
      fontSize: '1.25rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '4vw',
    },
  };
  theme.typography.body1 = {
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '3vw',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
