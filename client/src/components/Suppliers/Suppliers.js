import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux';
import { gettingCheckedSupplier } from '../../store/actions/actions';

const useStyles = makeStyles(theme => ({
  suppliers: {
    marginTop: '60px'
  },
  name: {
    width: '150px'
  },
  supplier: {
    width: '65px'
  },
  number: {
    width: '35px'
  },
  hl: {
    width: '50px'
  },
  topList: {
  },
  suppliersTabs: {
    borderBottom: '2px solid #ffffff',
    background: '#dfe8f7'
  },
  end: {
    width: '70px'
  }
}));

const Suppliers = props => {
  const classes = useStyles();
  const [supplier, setSupplier] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if(props.suppliers.length > 1)
      dispatch(gettingCheckedSupplier({name: props.suppliers[supplier].name, type: props.name}));
  }, [supplier])

  const handleChange = (e, newSupplier) => {
    setSupplier(newSupplier);
  }

  const handleClick = name => {
    props.changeSupplier(name);
  }

  return (
    <div>
      <AppBar position="fixed" color="default" className={classes.suppliers}>
        <Tabs
          value={supplier}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          className={classes.suppliersTabs}
        >
        {props.suppliers.map((item, i) => <Tab key={i+1} label={`${item.name}`} onClick={() => handleClick(item.name)}/>)}
        </Tabs>
        <ListItem className={classes.topList}>
          <ListItemText className={classes.number} primary='Номер' />
          <ListItemText className={classes.name} primary='Назва' />
          <ListItemText className={classes.supplier} primary='Поставщик' />
          <ListItemText className={classes.hl} primary='Кількість, м' />
          <ListItemText className={classes.hl} primary='Висота' />
          <ListItemText className={classes.hl} primary='Вхідна ціна' />
          <ListItemText className={classes.hl} primary='Вихідна ціна' />
          <ListItemText className={classes.hl} primary='Вхідна сума' />
          <ListItemText className={classes.end} primary='Вихідна сума' />
        </ListItem>
      </AppBar>
    </div>
  );
}

export default Suppliers;
