import React from 'react';
import { useLocation, RouteComponentProps, Router } from "@reach/router"

import './App.css';

const useQuery = (queryParam: string) => {
  const search = new URLSearchParams(useLocation().search);
  return search.get(queryParam);
};

const HomeRoute = (props: RouteComponentProps) => {
  return (
    <div>
      My payment accounts
    </div>
  )
}

const PaymentRoute = (props: RouteComponentProps) => {
  const description = useQuery('description')

  return <div>{description}</div>
}

function App() {
  return (
    <div className="App">
      <Router>
        <HomeRoute default />
        <PaymentRoute path="/payment" />
      </Router>
    </div>
  );
}

export default App;
