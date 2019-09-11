import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gettingFoundCurtains, gettingFoundTulles, gettingSearchText } from '../../store/actions/actions';
import './Header.scss';
import _ from 'lodash';
import history from '../../history';

const Header = props => {
  let findItemFunc = null;
  const dispatch = useDispatch();
  
  const findItem = _.debounce((searchText) => {
    if (searchText !== '') {
      fetch(`/api/curtains/getCurtainsWithName?name=${searchText}`)
        .then(res => res.json())
        .then(items => dispatch(gettingFoundCurtains(items)))
        .then(res => fetch(`/api/tulles/getTullesWithName?name=${searchText}`)
          .then(res => res.json())
          .then(items => dispatch(gettingFoundTulles(items))))
          .then(dispatch(gettingSearchText(searchText)))
      history.push(`/foundItems`);
    }
    else {
      history.push(`/curtains`);
    }
  }, 2000)

  const handleInputChange = e => {
    if (findItemFunc !== null)
      findItemFunc.cancel();
    const target = e.target;
    findItemFunc = findItem;
    findItem(target.value)
  }

  return (
    <div className='header'>
      <AppBar position='fixed'>
        <Toolbar className='toolbar'>
          <Button>
            <NavLink className='nav-link' to='/tulles' exact>Тюлі</NavLink>
          </Button>
          <InputBase
            placeholder="Пошук…"
            style={{ color: 'white', width: 800 }}
            onChange={handleInputChange}
          />
          <Button>
            <NavLink className='nav-link' to='/curtains'>Штори</NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
