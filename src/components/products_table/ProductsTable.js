import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CgClose } from 'react-icons/cg'
import { AiOutlineEdit } from 'react-icons/ai'
import AddProductModal from './AddProductModal'
import EditProductModal from './EditProductModal'
import DeleteProductModal from './DeleteProductModal'

export default function ProductsTable(props) {

    const [products, setProducts] = useState([]);
    const [tableName, setTableName] = useState("");
    const [tableDescription, setTableDescription] = useState("");
    const [loading, setLoading] = useState(true)
    const [refreshTable, setRefreshTable] = useState('')
    const [searchProduct, setSearchProduct] = useState('')

    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleShowAddModal = () => setShowAddModal(true);

    const [productIdEdit, setEditProductId] = useState('')
    const handleShowEditModal = (productId) => {
        setShowEditModal(true)
        setEditProductId(productId)
    }

    const [productIdDelete, setDeleteProductId] = useState('')
    const handleShowDeleteModal = (productId) => {
        setShowDeleteModal(true)
        setDeleteProductId(productId)
    }


    const getProducts = () => {
        axios.get('https://products-mnich.herokuapp.com/api/products', {
            params: {
                tableId: props.tableId
            }
        }).then((response)=>{
            if(response.data.length > 0)
            {
                setProducts(response.data)
                setTableName(response.data[0].TABLE_NAME)
                setTableDescription(response.data[0].DESCRIPTION)
                setLoading(false)      
            }
        })
    }

    useEffect(()=>{
        getProducts()
    }, [props.tableId, refreshTable])

    return (
        <>
        {loading ? <></> :
            <div>
                <div className="px-5">
                    <div className="row justify-content-center mt-2">
                        <div className="col-12">
                            <p className="fw-bold fs-5 text-center">{tableName}</p>
                        </div>
                        <div className="col-4">
                            <p className="text-break text-center">{tableDescription}</p>
                        </div>

                    </div>

                    <div className="my-3">
                        <input type="text" className="form-control" id="search-product-name" placeholder="Wyszukaj produkt" value={searchProduct} onInput={e => setSearchProduct(e.target.value)} autoComplete="off"/>
                    </div>
                    <div class="table-responsive-md">
                        <table className="table table-sm shadow-sm">
                            <thead style={{"backgroundColor": "#1089ff"}}>
                                <tr>
                                    <th scope="col" className="text-white py-3 px-3">#</th>
                                    <th scope="col" className="text-white py-3">Asortyment</th>
                                    <th scope="col" className="text-white py-3">Szacunkowa ilość</th>
                                    <th scope="col" className="text-white py-3">Szt/kg</th>
                                    <th scope="col" className="text-white py-3">Zamówiono</th>
                                    <th scope="col" className="text-white py-3">Zamówiono ost.</th>
                                    <th scope="col" className="text-white py-3">Pozostało</th>
                                    <th scope="col" className="text-white py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {products[0].NAME ?
                                    products.filter(products => products.NAME.toLowerCase().includes(searchProduct.toLowerCase()) || products.NAME.toUpperCase().includes(searchProduct.toUpperCase()) || products.NAME.includes(searchProduct)).map((products, idx) =>(
                                        <tr key={products.ID}>
                                            <td className="px-3">{idx}</td>
                                            <td>{products.NAME}</td>
                                            <td>{products.QUANTITY}</td>
                                            <td>{products.TYPE}</td>
                                            <td>{products.ORDERED}</td>
                                            <td>{products.LAST_ORDER}</td>
                                            <td>{products.PRODUCTS_LEFT}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <a href="#" class="link-secondary"><AiOutlineEdit className="mx-3 fs-5" id={products.ID} onClick={() => handleShowEditModal(products.ID)}/></a> 
                                                    <a href="#" class="link-danger"><CgClose className="fs-5" id={products.ID} onClick={() => handleShowDeleteModal(products.ID)}/></a> 
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                : 
                                <tr>
                                    <td colSpan="11" className="text-center">Brak danych</td>
                                </tr> }

                                <tr>
                                    <td colSpan="11"> 
                                        <button type="button" className="btn btn-link" onClick={() => handleShowAddModal()}>Dodaj produkt</button>
                                    </td>                          
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        }
            <AddProductModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} tableId={props.tableId} setRefreshTable={setRefreshTable}/>
            <EditProductModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} productIdEdit={productIdEdit} setRefreshTable={setRefreshTable}/>
            <DeleteProductModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} productIdDelete={productIdDelete} setRefreshTable={setRefreshTable}/>
            
        </>
    )
}
