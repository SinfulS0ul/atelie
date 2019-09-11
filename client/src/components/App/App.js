import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom';
import Curtains from '../Curtains/Curtains';
import Tulles from '../Tulles/Tulles';
import FoundItems from '../FoundItems/FoundItems';
import { useDispatch } from 'react-redux';
import { gettingCurtains, gettingTulles, gettingCurtainsSuppliers, gettingTullesSuppliers } from '../../store/actions/actions';
import Footer from '../Footer/Footer';
import './App.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
      fetch('/api/curtains/getAllCurtains')
        .then(res => res.json())
        .then(res => {
          dispatch(gettingCurtains(res))
        ;})
    .then(
      fetch('/api/tulles/getAllTulles')
        .then(res => res.json())
        .then(res => {
          dispatch(gettingTulles(res))
        ;})
    )
    .then(
      fetch('/api/curtainsSupliers/getAllSupliers')
        .then(res => res.json())
        .then(res => {
          dispatch(gettingCurtainsSuppliers([...res]))
    ;})
    .then(
      fetch('/api/tullesSupliers/getAllSupliers')
        .then(res => res.json())
        .then(res => {
          dispatch(gettingTullesSuppliers([...res]))
        ;})
    ))
  }, [])

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route
          path='/tulles'
          exact
          component={Tulles}
        />
        <Route
          path='/curtains'
          exact
          component={Curtains}
        />
        <Route
          path='/foundItems'
          exact
          component={FoundItems}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
