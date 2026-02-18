import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Simulation from './components/Simulation';
import Footer from './components/Footer';

function App() {

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <Simulation />
        <Footer />
      </div>
    </AppTheme>
  )
}

export default App
