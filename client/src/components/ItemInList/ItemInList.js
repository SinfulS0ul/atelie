import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import SuppliersInput from '../SuppliersInput/SuppliersInput';
import { useDispatch, useSelector } from 'react-redux';
import { gettingCurtains, gettingTulles, gettingCurtainsSuppliers, gettingTullesSuppliers, gettingFoundTulles, gettingFoundCurtains } from '../../store/actions/actions';
import axios from 'axios';
import './ItemInList.scss';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import history from '../../history';


const useStyles = makeStyles(theme => ({
  textField: {
    width: '15%',
    margin: '1%'
  },
  supplier: {
    textAlign: 'center',
  },
  name: {
    width: '200px'
  },
  number: {
    width: '10px'
  },
  hl:{
    width: '50px'
  },
  supplierText:{
    width: '55px'
  }
}));

const ItemsList = props => {
  const classes = useStyles();
  const [suppliersDialog, setSuppliersDialog] = useState(false);
  const [supplier, setSupplier] = useState(props.item.suplier ? props.item.suplier : 'Невідомий');
  const dispatch = useDispatch();
  const curtainsSuppliers = useSelector(state => state.suppliers.curtainsSuppliers);
  const tullesSuppliers = useSelector(state => state.suppliers.tullesSuppliers);
  const searchText = useSelector(state => state.items.searchText);
  
  const [name, setName] = useState('');
  const [length, setLength] = useState('');
  const [high, setHigh] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [outputPrice, setOutputPrice] = useState('');

  const handleClick = e => {
    if (e.target.type !== 'checkbox')
      props.setOpen(props.value);
    if (props.open === props.value)
      props.setOpen(-1);
  }

  const handleInputChange = e => {
    const target = e.target;
    switch(target.name){
      case 'name': setName(target.value);
        break;
      case 'length': 
        if(!isNaN(target.value))
          setLength(target.value);
        break;
      case 'high': 
        if(!isNaN(target.value))
          setHigh(target.value);
        break;
      case 'inputPrice':
        if(!isNaN(target.value))
          setInputPrice(target.value);
        break;
      case 'outputPrice': 
        if(!isNaN(target.value))
          setOutputPrice(target.value);
        break;
    }
  }

  const handleClickSupplierDialog = () => {
    setSuppliersDialog(true);
  }

  const handleCloseSupplierDialog = (newValue, code) => {
    setSuppliersDialog(false);

  if (newValue) {
    const data = { id: props.item.name, suplier: newValue };
    if (props.item.type === 'curtain' && code === 'add') {
      if (curtainsSuppliers.filter(item => item.name === newValue).length === 0) {
        axios.post('/api/curtainsSupliers/addCurtainSuplier', { name: newValue })
          .then(res =>
            fetch('/api/curtainsSupliers/getAllSupliers')
              .then(res => res.json())
              .then(res => {
                dispatch(gettingCurtainsSuppliers(res));
              }));
      }
    }
    if (props.item.type  === 'tulle' && code === 'add') {
      if (tullesSuppliers.filter(item => item.name === newValue).length === 0) {
        axios.post('/api/tullesSupliers/addTullesSuplier', { name: newValue })
          .then(res =>
            fetch('/api/tullesSupliers/getAllSupliers')
              .then(res => res.json())
              .then(res => {
                dispatch(gettingTullesSuppliers(res));
              }));
      }
    }
    switch (props.item.type) {
      case 'curtain':
        axios.post('/api/curtains/updateCurtain', data)
          .then(res => axios.post('/api/curtains/reidentificationCurtains', { suplier: newValue }))
          .then(res =>
            fetch('/api/curtains/getAllCurtains')
              .then(res => res.json())
              .then(res => {
                dispatch(gettingCurtains(res));
                setSupplier(newValue);
              })
              .then(res => {
                if(history.location.pathname === '/foundItems'){
                  if (searchText !== '') {
                    fetch(`/api/curtains/getCurtainsWithName?name=${searchText}`)
                      .then(res => res.json())
                      .then(items => dispatch(gettingFoundCurtains(items)))
                  }
                }
              }));
        break;
      case 'tulle':
        axios.post('/api/tulles/updateTulle', data)
          .then(res => axios.post('/api/tulles/reidentificationTulles', { suplier: newValue }))
          .then(res =>
            fetch('/api/tulles/getAllTulles')
              .then(res => res.json())
              .then(res => {
                dispatch(gettingTulles(res));
                setSupplier(newValue);
              }).then(res => {
                if(history.location.pathname === '/foundItems'){
                  if (searchText !== '') {
                    fetch(`/api/tulles/getTullesWithName?name=${searchText}`)
                      .then(res => res.json())
                      .then(items => dispatch(gettingFoundTulles(items)))
                  }
                }
              }));
        break;
      }
    }
  }

  const hanldeUpdateClick = () => {
    if (name || length || high || inputPrice || outputPrice) {
      let data = { id: props.item.name };
      name? data.name = name: data = data;
      length? data.length = parseFloat(length).toFixed(2): data = data;
      high? data.high = parseFloat(high).toFixed(2) : data = data;
      inputPrice? data.inputPrice = parseFloat(inputPrice).toFixed(2) : data = data;
      outputPrice? data.outputPrice = parseFloat(outputPrice).toFixed(2) : data = data;
      switch (props.item.type) {
        case 'curtain':
          axios.post('/api/curtains/updateCurtain', data)
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
          break;
        case 'tulle':
          axios.post('/api/tulles/updateTulle', data)
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
          break;
        }
      }
    setName('');
    setLength('')
    setHigh('')
    setInputPrice('');
    setOutputPrice('');
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <Checkbox
          edge="start"
          onChange={props.handleToggle(props.value)}
          checked={props.checked.indexOf(props.value) !== -1}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText className={classes.number} primary={`${props.item.number}`} />
        <ListItemText className={classes.name} primary={`${props.item.name}`} />
        <ListItemText className={classes.supplierText} primary={`${props.item.suplier}`} />
        <ListItemText className={classes.hl} primary={`${props.item.length}`} />
        <ListItemText className={classes.hl} primary={`${props.item.high}`} />
        <ListItemText className={classes.hl} primary={`${props.item.inputPrice}`} />
        <ListItemText className={classes.hl} primary={`${props.item.outputPrice}`} />
        <ListItemText className={classes.hl} primary={`${props.item.inputSummary}`} />
        <ListItemText className={classes.hl} primary={`${props.item.outputSummary}`} />
        {props.open === props.value ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={props.open === props.value} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <TextField
              name='name'
              value={name}
              className={classes.textField}
              label='Назва тканини'
              onChange={handleInputChange}
            />
            <ListItemText
              className={classes.supplier}
              primary={supplier}
              onClick={handleClickSupplierDialog}
            />
            <TextField
              name='length'
              value={length}
              className={classes.textField}
              label='Кількість, м'
              onChange={handleInputChange}
            />
            <TextField
              name='high'
              value={high}
              className={classes.textField}
              label='Висота'
              onChange={handleInputChange}
            />
            <TextField
              name='inputPrice'
              value={inputPrice}
              className={classes.textField}
              label='Вхідна ціна'
              onChange={handleInputChange}
            />
            <TextField
              name='outputPrice'
              value={outputPrice}
              className={classes.textField}
              label='Вихідна ціна'
              onChange={handleInputChange}
            />
            <Button 
              variant="outlined" 
              color="primary"
              onClick={hanldeUpdateClick}
            >
              Змінити
            </Button>
          </ListItem>
          <SuppliersInput
            keepMounted
            open={suppliersDialog}
            onClose={handleCloseSupplierDialog}
            value={supplier}
            suppliers={props.item.type === 'curtain'? curtainsSuppliers : tullesSuppliers}
          />
        </List>
      </Collapse>
    </>
  );
}

export default ItemsList;