import React, { useState } from 'react';
import ItemsList from '../ItemsList/ItemsList';
import Suppliers from '../Suppliers/Suppliers';
import { useSelector } from 'react-redux';

const FoundItems = props => {
  const [supplierName, setSupplierName] =  useState('всі');
  const curtains = useSelector(state => state.items.foundCurtains);
  const tulles = useSelector(state => state.items.foundTulles);

  return (
    <div>
      <Suppliers suppliers={[{name: 'всі'}]} changeSupplier={setSupplierName} name={'curtains'}/>
      {curtains.length > 0 ? <p>Штори</p> : ''}
      {curtains.length > 0 ?
      <ItemsList 
        listItems={curtains}
        supplier={supplierName} 
      />: ''}
      {tulles.length > 0 ? <p>Тюлі</p> : ''}
      {tulles.length > 0 ?
      <ItemsList 
        listItems={tulles}
        supplier={supplierName} 
      /> : ''}
    </div>
  );
};

export default FoundItems;
