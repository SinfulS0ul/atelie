import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SuppliersInput from '../SuppliersInput/SuppliersInput';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from '@material-ui/core/ListItemText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import { gettingCurtainsSuppliers, gettingTullesSuppliers, gettingCurtains, gettingTulles } from '../../store/actions/actions';
import axios from 'axios';
import './NewItemDialog.scss';


const NewItemDialog = props => {
  const [type, setType] = useState('curtainsSuppliers');
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState('Виберіть поставщика');
  const curtainsSuppliers = useSelector(state => state.suppliers.curtainsSuppliers);
  const tullesSuppliers = useSelector(state => state.suppliers.tullesSuppliers);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [length, setLength] = useState('');
  const [high, setHigh] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [outputPrice, setOutputPrice] = useState('');

  useEffect(() => {
    if (type === 'curtainsSuppliers')
      setSuppliers(curtainsSuppliers)
    else
      setSuppliers(tullesSuppliers)
  }, [curtainsSuppliers, tullesSuppliers])

  const handleInputChange = e => {
    const target = e.target;
    switch (target.name) {
      case 'name': setName(target.value);
        break;
      case 'length':
        if (!isNaN(target.value))
          setLength(target.value);
        break;
      case 'high':
        if (!isNaN(target.value))
          setHigh(target.value);
        break;
      case 'inputPrice':
        if (!isNaN(target.value))
          setInputPrice(target.value);
        break;
      case 'outputPrice':
        if (!isNaN(target.value))
          setOutputPrice(target.value);
        break;
    }
  }

  const handleRadioChange = e => {
    setType(e.target.value);
    if (e.target.value === 'curtainsSuppliers')
      setSuppliers(curtainsSuppliers)
    else
      setSuppliers(tullesSuppliers)
    setSupplier('Виберіть поставщика')
  }

  const handleClickSupplierDialog = () => {
    setOpen(true);
  }

  const handleCloseSupplierDialog = (newValue, code) => {
    if (newValue)
      setSupplier(newValue)
    if (type === 'curtainsSuppliers' && code === 'add') {
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
    if (type === 'tullesSuppliers' && code === 'add') {
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
    setOpen(false);
  }

  const onCancel = () => {
    setName('');
    setLength('')
    setHigh('')
    setInputPrice('');
    setOutputPrice('');
    setSupplier('Виберіть поставщика');
    props.onClose();
  }

  const onSubmit = () => {
    if (name && supplier !== 'Виберіть поставщика') {
      let data = { name: name, suplier: supplier };
      length ? data.length = parseFloat(length).toFixed(2) : data = data;
      high ? data.high = parseFloat(high).toFixed(2) : data = data;
      inputPrice ? data.inputPrice = parseFloat(inputPrice).toFixed(2) : data = data;
      outputPrice ? data.outputPrice = parseFloat(outputPrice).toFixed(2) : data = data;
      switch (type) {
        case 'curtainsSuppliers':
          data.type = 'curtain';
          axios.post('/api/curtains/addCurtains', data)
            .then(res => axios.post('/api/curtains/reidentificationCurtains', { suplier: supplier }))
            .then(res =>
              fetch('/api/curtains/getAllCurtains')
                .then(res => res.json())
                .then(res => {
                  dispatch(gettingCurtains(res));
                }));
          break;
        case 'tullesSuppliers':
          data.type = 'tulle';
          axios.post('/api/tulles/addTulles', data)
            .then(res => axios.post('/api/tulles/reidentificationTulles', { suplier: supplier }))
            .then(res =>
              fetch('/api/tulles/getAllTulles')
                .then(res => res.json())
                .then(res => {
                  dispatch(gettingTulles(res));
                }));
          break;
      }
      setName('');
      setLength('')
      setHigh('')
      setInputPrice('');
      setOutputPrice('');
      setSupplier('Виберіть поставщика');
      props.onClose();
    }
  }

  const handleBackdropClick = () => {
    setName('');
    setLength('')
    setHigh('')
    setInputPrice('');
    setOutputPrice('');
    setSupplier('Виберіть поставщика');
  }


  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" onBackdropClick={handleBackdropClick}>
        <DialogTitle id="form-dialog-title">Додати тканину</DialogTitle>
        <DialogContent>
          <RadioGroup
            aria-label="gender"
            name="gender2"
            value={type}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel
              value="curtainsSuppliers"
              control={<Radio color="primary" />}
              label="Штори"
              labelPlacement="start"
            />
            <FormControlLabel
              value="tullesSuppliers"
              control={<Radio color="primary" />}
              label="Тюлі"
              labelPlacement="start"
            />
          </RadioGroup>
          <TextField
            fullWidth
            label="Назва"
            value={name}
            onChange={handleInputChange}
            name='name'
          />
          <ListItemText
            primary={supplier}
            onClick={handleClickSupplierDialog}
            className='suplier-text'
          />
          <TextField
            fullWidth
            label="Кількість, м"
            value={length}
            onChange={handleInputChange}
            name='length'
          />
          <TextField
            fullWidth
            label="Висота"
            value={high}
            onChange={handleInputChange}
            name='high'
          />
          <TextField
            fullWidth
            label="Вхідна ціна"
            value={inputPrice}
            onChange={handleInputChange}
            name='inputPrice'
          />
          <TextField
            fullWidth
            label="Вихідна ціна"
            value={outputPrice}
            onChange={handleInputChange}
            name='outputPrice'
          />
          <SuppliersInput
            keepMounted
            open={open}
            onClose={handleCloseSupplierDialog}
            value={supplier}
            suppliers={suppliers}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Відмінити
          </Button>
          <Button onClick={onSubmit} color="primary">
            Додати
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewItemDialog;