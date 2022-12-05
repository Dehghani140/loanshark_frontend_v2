import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async';
import 'nprogress/nprogress.css';
import App from './App';
import store from './store';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql/",
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </HelmetProvider>
    </ApolloProvider>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
