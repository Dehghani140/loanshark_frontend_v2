import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async';
import 'nprogress/nprogress.css';
import App from './App';
import store from './store';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </HelmetProvider>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
