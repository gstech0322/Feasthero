import React from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { initSettings } from '../../settings';
import history from '../../history';
import Home from '../../pages/home/home';
import BookingSuccess from '../../pages/booking-success/booking-success';
import AboutAndContactUs from '../../pages/about-and-contact-us/about-and-contact-us';
import Faq from '../../pages/faq/faq';
import Blog from '../../pages/blog/blog/blog';
import TopNavbar from '../top-navbar/top-navbar';
import Footer from '../footer/footer';
import BlogPost from '../../pages/blog/blog-post/blog-post';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Login from '../../pages/auth/login/login';
import Register from '../../pages/auth/register/register';
import Account from '../../pages/account/account';
import BookClass from '../../pages/book-class/book-class';
import ChefClass from '../../pages/account/chef/pages/class/chef-class';
import Checkout from '../../pages/checkout/checkout';

import LoadAccount from '../../hoc/load-account';

import './app.scss';


function App() {
  initSettings();

  return (
    <>
      <Router history={history}>
        <ScrollToTop>
          <Container fluid id='main-container'>
            <TopNavbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/book/:id' component={BookClass} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/booking-success' component={BookingSuccess} />
              <Route exact path='/contact' component={AboutAndContactUs} />
              <Route exact path='/faq' component={Faq} />
              <Route exact path='/blog' component={Blog} />
              <Route exact path='/blog/post/:id' component={BlogPost} />
              <Route exact path='/auth/login' component={Login} />
              <Route exact path='/auth/register' component={Register} />
              <Route exact path='/account' component={Account} />
              <Route exact path='/account/class/:id' component={ChefClass} />
            </Switch>
          </Container>
          <Footer />
        </ScrollToTop>
      </Router>
    </>
  )
}

export default LoadAccount(App);
