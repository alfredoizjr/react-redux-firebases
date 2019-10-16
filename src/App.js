import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Subscriber from "./components/Subscribers/Subscribers";
import NewSubcriber from "./components/Subscribers/NewSubscriber";
import EditSubcriber from "./components/Subscribers/EditSubscriber";
import ShowSubcriber from "./components/Subscribers/ShowSubscriber";
import Navbar from "./components/layout/Navbar";
// notification
import ReactNotifications from 'react-notifications-component';

// redux
import { Provider } from 'react-redux';
import store from './redux/store/store'

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <ReactNotifications />
      <div className="container mt-2">
        <Switch>
          <Route exact path="/subcribers" component={Subscriber} />
          <Route exact path="/subcriber/:id" component={ShowSubcriber} />
          <Route exact path="/new" component={NewSubcriber} />
          <Route exact path="/edit/:id" component={EditSubcriber} />
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
