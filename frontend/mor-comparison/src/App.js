import React from 'react';
import './styles/App.css';
import { FirebaseContext } from './components/Firebase';
import TestComponents from './pages/TestComponents';
import Landing from './pages/Landing';
import HomeContainer from './pages/HomeContainer';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


function App() {

  return(
    <ThemeProvider theme={theme}>
      <Landing/>
    </ThemeProvider>
  );
}

export default App;
