import React, { useState } from 'react';
import ItemsList from '../ItemsList/ItemsList';
import Suppliers from '../Suppliers/Suppliers';
import { useSelector } from 'react-redux';

const Curtains = props => {
  const [supplierName, setSupplierName] =  useState('всі');
  const curtains = useSelector(state => state.items.curtains);
  const curtainsSuppliers = useSelector(state => state.suppliers.curtainsSuppliers);

  return (
    <div>
      <Suppliers suppliers={[{name: 'всі'}, ...curtainsSuppliers]} changeSupplier={setSupplierName} name={'curtains'}/>
      <ItemsList 
        listItems={supplierName === 'всі'?curtains : curtains.filter(item => item.suplier === supplierName)}
        supplier={supplierName}
      />
    </div>
  );
};

export default Curtains;
