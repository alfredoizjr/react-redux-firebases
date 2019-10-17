import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//subcribers components
import Subscriber from "./components/Subscribers/Subscribers";
import NewSubcriber from "./components/Subscribers/NewSubscriber";
import EditSubcriber from "./components/Subscribers/EditSubscriber";
import ShowSubcriber from "./components/Subscribers/ShowSubscriber";
import Navbar from "./components/layout/Navbar";
// books components
import Books from "./components/Books/Books";
import DetailBook from "./components/Books/DetailBook";
import AddBook from "./components/Books/AddBook";
import EditBook from "./components/Books/EditBook";
import SharedBook from "./components/Books/SharedBook";

// notification
import ReactNotifications from "react-notifications-component";

// redux
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Login from "./components/auth/Login";

// auth
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <ReactNotifications />
        <div className="container mt-2">
          <Switch>
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />

            <Route exact path="/" component={UserIsAuthenticated(Books)} />
            <Route exact path="/book/details/:id" component={UserIsAuthenticated(DetailBook)} />
            <Route exact path="/book/add" component={UserIsAuthenticated(AddBook)} />
            <Route exact path="/book/edit/:id" component={UserIsAuthenticated(EditBook)} />
            <Route exact path="/book/search/:id" component={UserIsAuthenticated(SharedBook)} />

            <Route exact path="/subcribers" component={UserIsAuthenticated(Subscriber)} />
            <Route exact path="/subcriber/:id" component={UserIsAuthenticated(ShowSubcriber)} />
            <Route exact path="/new" component={UserIsAuthenticated(NewSubcriber)} />
            <Route exact path="/edit/:id" component={UserIsAuthenticated(EditSubcriber)} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
