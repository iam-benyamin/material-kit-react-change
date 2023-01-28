
// react auth kit 
import { AuthProvider } from 'react-auth-kit'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
      >
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}
