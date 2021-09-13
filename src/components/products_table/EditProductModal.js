import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

export default function EditProductModal(props) {

    const [productEdit, setEditProduct] = useState('')
    const [quantityEdit, setEditQuantity] = useState('')
    const [typeEdit, setEditType] = useState('')
    const [orderedEdit, setEditOrdered] = useState(0)

    const handleCloseEditModal = ()  =>{
        props.setShowEditModal(false)
      }


    const putProdukt = (event) =>{
        event.preventDefault()

        axios.put('https://products-mnich.herokuapp.com/api/products', {
            productIdEdit: props.productIdEdit,
            productEdit: productEdit,
            quantityEdit: quantityEdit,
            typeEdit: typeEdit,
            orderedEdit: orderedEdit,
        }).then((response)=>{
            if(response.data)
            {
                props.setShowEditModal(false)
                props.setRefreshTable(response.data)
                setEditProduct('')
                setEditQuantity('')
                setEditType('')
                setEditOrdered(0)
            }
        })
    }

    return (
        <>
            <Modal show={props.showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edytuj Produkt</Modal.Title>
                </Modal.Header>
                <form onSubmit={putProdukt}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="product-name" className="form-label">Nazwa Produktu</label>
                            <input type="text" className="form-control" id="product-name" placeholder="Nazwa produktu" value={productEdit} onInput={e => setEditProduct(e.target.value)} autoComplete="off"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="product-quantity" className="form-label">Szacunkowa ilość</label>
                            <input type="number" className="form-control" id="product-quantity" placeholder="Szacunkowa ilośc" value={quantityEdit} onInput={e => setEditQuantity(e.target.value)} autoComplete="off"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="product-type-list" className="form-label">Szt/kg</label>
                            <input className="form-control" list="datalistOptions" id="product-type-list" placeholder="Szt/Kg" value={typeEdit} onChange={e => setEditType(e.target.value)} autoComplete="off"/>
                                <datalist id="datalistOptions">
                                <option value="Szt" />
                                <option value="Kg" />
                            </datalist>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="product-order" className="form-label">Zamówiono</label>
                            <input type="number" className="form-control" id="product-order" placeholder="Zamówiono" value={orderedEdit} onInput={e => setEditOrdered(e.target.value)} autoComplete="off"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Zamknij
                        </Button>
                        <Button variant="primary" type="submit" >
                            Zapisz
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
