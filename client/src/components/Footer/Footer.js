import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import NewItemDialog from '../NewItemDialog/NewItemDialog';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import history from '../../history';
import { gettingCurtains, gettingTulles, gettingChecked, gettingCurtainsSuppliers, gettingTullesSuppliers, gettingFoundCurtains, gettingFoundTulles } from '../../store/actions/actions';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '60px',
    background: '#3f51b5',
    color: 'white',
    justifyContent: 'space-between'
  },
  footer: {
    height: '60px'
  },
  deleteButton: {
    margin: '10px 40px',
  },
  addButton: {
    margin: '10px 40px',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
    color: 'white'
  }
});

const Footer = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const checked = useSelector(state => state.checked.checked);
  const checkedSupplier = useSelector(state => state.checked.checkedSupplier);
  const searchText = useSelector(state => state.items.searchText);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  }

  const handleClickDeleteItems = () => {
    if(checked.length > 0){
      if(checked[0].type === 'curtain')
        axios.post('/api/curtains/removeCurtains', {namesArray: checked.map(item => item.name)})
          .then(res => checked.map(item => axios.post('/api/curtains/reidentificationCurtains', { suplier: item.suplier })))
          .then(res =>
            fetch('/api/curtains/getAllCurtains')
              .then(res => res.json())
              .then(res => {
                dispatch(gettingCurtains(res));
      }).then(res => {
        if(history.location.pathname === '/foundItems'){
          if (searchText !== '') {
            fetch(`/api/curtains/getCurtainsWithName?name=${searchText}`)
              .then(res => res.json())
              .then(items => dispatch(gettingFoundCurtains(items)))
          }
        }
      }));
      if(checked[0].type === 'tulle')
      axios.post('/api/tulles/removeTulles', {namesArray: checked.map(item => item.name)})
          .then(res => checked.map(item => axios.post('/api/tulles/reidentificationTulles', { suplier: item.suplier })))
          .then(res =>
            fetch('/api/tulles/getAllTulles')
              .then(res => res.json())
              .then(res => {
                dispatch(gettingTulles(res));
      }).then(res => {
        if(history.location.pathname === '/foundItems'){
          if (searchText !== '') {
            fetch(`/api/tulles/getTullesWithName?name=${searchText}`)
              .then(res => res.json())
              .then(items => dispatch(gettingFoundTulles(items)))
          }
        }
      }));
      dispatch(gettingChecked([]));
    }
  }

  const handleDeleteSupplier = () => {
    if(checkedSupplier.name !== 'всі'){
      if(checkedSupplier.type === 'curtains')
        axios.post('/api/curtainsSupliers/removeCurtainSuplier', {name: checkedSupplier.name})
          .then(res =>
            fetch('/api/curtainsSupliers/getAllSupliers')
              .then(res => res.json())
              .then(res => {
                dispatch(gettingCurtainsSuppliers(res));
            }));
      if(checkedSupplier.type === 'tulles')
        axios.post('/api/tullesSupliers/removeTullesSuplier', {name: checkedSupplier.name})
          .then(res =>
            fetch('/api/tullesSupliers/getAllSupliers')
              .then(res => res.json())
              .then(res => {
                dispatch(gettingTullesSuppliers(res));
            }));
    }
  }

  return (
    <div className={classes.footer}>
      <div
        className={classes.root}
      >
        <Button 
          variant="contained" 
          color="secondary" 
          className={classes.deleteButton}
          onClick={handleDeleteSupplier}
        >
          Видалити поставщика
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          className={classes.deleteButton}
          onClick={handleClickDeleteItems}
        >
          Видалити
        </Button>
        <Button 
          variant="contained" 
          className={classes.addButton}
          onClick={handleClickOpen}  
        >
          Додати
        </Button>
        <NewItemDialog
          open={open}
          keepMounted
          onClose={handleClose}
        />
      </div>
    </div>
  );
} 

export default Footer;