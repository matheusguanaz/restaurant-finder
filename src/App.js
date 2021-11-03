import Home from './pages/Home';
import { Provider } from 'react-redux';
import {ThemeProvider} from 'styled-components';
import store from './redux/store';
import theme from './theme';
import {Reset} from 'styled-reset';

function App() {
  return (
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <Reset/>
    <Home/>
  </ThemeProvider>
  </Provider>
  )
}

export default App;
