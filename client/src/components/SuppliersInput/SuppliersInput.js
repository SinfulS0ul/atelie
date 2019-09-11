import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  suppliersInput:{
    margin: '10px'
  }
}));

const SuppliersInput = props => {
  const classes = useStyles();
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const [supplierText, setSupplierText] = useState('');
  const [suppliers, setSuppliers] = useState('');
  const radioGroupRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    setSuppliers('');
    setSupplierText('');
  }, [props.suppliers]);

  const handleSupplierText = e => {
    setSupplierText(e.target.value);
    let supp = props.suppliers.filter(item => item.name.includes(e.target.value));
    setSuppliers(supp);
  }

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  }

  const handleCancel = () => {
    setSupplierText('')
    onClose();
  }

  const handleOk = () => {
    onClose(value);
  }

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const onAddingNewSupplier = () => {
    onClose(supplierText, 'add');
  }

  return (
    <Dialog
      maxWidth="xs"
      onEntering={handleEntering}
      open={open}
      {...other}
    >
      <DialogTitle>Поставщики</DialogTitle>
      <TextField
        label="Поставщик"
        className={classes.suppliersInput}
        onChange={handleSupplierText}
        value={supplierText}
      />
      <Button onClick={onAddingNewSupplier} color="primary">
        Додати поставщика
      </Button>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          value={value}
          onChange={handleChange}
        >
          {suppliers? suppliers.map((supplier, i) => (
            <FormControlLabel value={supplier.name} key={i} control={<Radio />} label={supplier.name} />
          )) : props.suppliers.map((supplier, i) => (
            <FormControlLabel value={supplier.name} key={i} control={<Radio />} label={supplier.name} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Відмінити
        </Button>
        <Button onClick={handleOk} color="primary">
          Вибрати
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuppliersInput