import { ApolloProvider } from "@apollo/client";
import "./App.css";
import Container from "./components/Container/Container";
import ContentLayout from "./components/Layouts/ContentLayout/ContentLayout";
import NavBar from "./components/Layouts/NavBar/NavBar";
import Loading from "./components/Loading/Loading";
import { useApolloClient } from "./hooks/useApolloClient";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AssortmentPage from "./pages/AssortmentPage/AssortmentPage";
import BalloonsPage from "./pages/BalloonsPage/BalloonsPage";
import BouquetsPage from "./pages/BouquetsPage/BouquetsPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ColorsPage from "./pages/ColorsPage/ColorsPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import DeliveryPage from "./pages/DeliveryPage/DeliveryPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import StartPage from "./pages/StartPage/StartPage";
import AlertComponent from "./components/Layouts/AlertComponent/AlertComponent";
import Login from "./components/Loign/Login";
import { useState } from "react";
import { password } from './config';

function App() {

  const [pass, setPass] = useState<string | number>('');

  const client = useApolloClient();

  if (!client) {
    return <Loading />;
  }

  if(pass != password){
    return <Login password={pass} setPassword={setPass}/>
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Container>
          <AlertComponent />
          <NavBar>
            <ContentLayout>
              <Switch>
                <Route exact path="/" render={() => <StartPage />} />
                <Route path="/balloons" render={() => <BalloonsPage />} />
                <Route path="/bouquets" render={() => <BouquetsPage />} />
                <Route path="/assortment" render={() => <AssortmentPage />} />
                <Route path="/categories" render={() => <CategoriesPage />} />
                <Route path="/colors" render={() => <ColorsPage />} />
                <Route path="/contacts" render={() => <ContactsPage />} />
                <Route path="/delivery" render={() => <DeliveryPage />} />
                <Route path="*" render={() => <ErrorPage />} />
              </Switch>
            </ContentLayout>
          </NavBar>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
