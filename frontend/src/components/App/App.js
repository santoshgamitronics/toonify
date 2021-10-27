import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Footer from '../Shared/footer';
import Header from '../Shared/header';
import Home from '../Home';

function App() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Header */}
      <Header />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h5" align="center" color="text.secondary" component="p" style={{ fontWeight: "normal", color: "black" }}>
          Quickly build a cartoonist character from an real image and detect not safe for work(NSFW) images using DeepAI api's.
        </Typography>
      </Container>
      {/* End hero unit */}
      {/* Home */}
      <Home />
      {/*Footer */}
      <Footer />
    </React.Fragment>
  );
}

export default App