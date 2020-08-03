import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './components/navbar';
import Cart from './components/cart';
import Register from './components/signup';
import Forgotpassword from './components/forgotpassword';
import Product from './components/product';
import Login from './components/login';
import Page404 from './components/404';
import Checkout from './components/checkout';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
  	
  	<BrowserRouter>
  		
      
  		<Switch>

        
        
        <Route path="/register">
            <NavBar />
            <Register />
        </Route>

        <Route path="/reset-password">
            <NavBar />
            <Forgotpassword />
        </Route>

        <Route path="/login">
            <NavBar />
            <Login />
        </Route>

        <Route path="/cart/checkout/:id/order" render={(props) => <Checkout {...props}/>} />
            
        

  			<Route path="/cart">
            <NavBar />
            <Cart />
        </Route>

        <Route exact path="/">
            <NavBar />
            <Product />
        </Route>

        <Route path="*">
            <Page404 />
        </Route>


        

  		</Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
