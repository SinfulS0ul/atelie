import React, { useState } from 'react';
import ItemsList from '../ItemsList/ItemsList';
import { useSelector } from 'react-redux';
import Suppliers from '../Suppliers/Suppliers';


const Tulles = props => {
  const [supplierName, setSupplierName] =  useState('всі');
  const tulles = useSelector(state => state.items.tulles);
  const tullesSuppliers = useSelector(state => state.suppliers.tullesSuppliers);

  return (
    <div>
      <Suppliers suppliers={[{name: 'всі'}, ...tullesSuppliers]} changeSupplier={setSupplierName} name='tulles'/>
      <ItemsList 
        listItems={supplierName === 'всі'?tulles : tulles.filter(item => item.suplier === supplierName)}
        supplier={supplierName}
      />
    </div>
  );
};

export default Tulles;
