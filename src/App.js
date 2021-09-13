import { useState } from 'react'
import Header from './components/header/Header.js'
import ProductsTable from './components/products_table/ProductsTable.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [tableId, setTableId] = useState(1);

  return (
    <div className="App">
      <Header setTableId={setTableId}/>
      <ProductsTable tableId={tableId}/>
    </div>
  );
}

export default App;
