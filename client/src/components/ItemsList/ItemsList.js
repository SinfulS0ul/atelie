import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ItemInList from '../ItemInList/ItemInList';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch } from 'react-redux';
import { gettingChecked } from '../../store/actions/actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  nameSum: {
    width: '1080px'
  },
  sum: {
    width: '70px',
  },
  itemNameSum: {
    borderBottom: '2px solid #3f51b5'
  }
}));

const ItemsList = props => {
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(-1);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    const checkedItems = props.listItems.filter((item, i) =>  newChecked.includes(i));
    dispatch(gettingChecked(checkedItems));
  };

  useEffect(() => {
    setChecked([]);
    setOpen(-1);    
  }, [props.listItems])

  return (
    <List
      component="nav"
    >
      <ListItem className={classes.itemNameSum}>
        <ListItemText className={classes.nameSum} primary='В загальному' />
        {props.listItems.length > 0? <ListItemText className={classes.sum} primary={`${props.listItems.map(item => item.inputSummary).reduce((prev, cur) => prev + cur)}`} /> : ''}
        {props.listItems.length > 0? <ListItemText className={classes.sum} primary={`${props.listItems.map(item => item.outputSummary).reduce((prev, cur) => prev + cur)}`} /> : ''}
      </ListItem>
      {props.listItems.map((item, i) => 
        <ItemInList 
          suppliers={props.suppliers}
          item={item}
          key={i}
          value={i}
          handleToggle={handleToggle}
          checked={checked}
          open={open}
          setOpen={setOpen}
          name={props.name}
        />)}
    </List>
  );
}

export default ItemsList;
