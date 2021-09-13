import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

export default function AddProductModal(props) {

    const [product, setProduct] = useState('')
    const [quantity, setQuantity] = useState('')
    const [type, setType] = useState('')

    const handleCloseAddModal = ()  =>{
        props.setShowAddModal(false)
      };

    const postProdukt = (event) =>{
        event.preventDefault()
        axios.post('https://products-mnich.herokuapp.com/api/products', {
                product: product,
                quantity: quantity,
                type: type,
                tableId: props.tableId,
        }).then((response)=>{
            if(response.data)
            {
                props.setShowAddModal(false)
                props.setRefreshTable(response.data)
                setProduct('')
                setQuantity('')
                setType('')
            }
        })
    }

    return (
        <>
            <Modal show={props.showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj Produkt</Modal.Title>
                </Modal.Header>
                <form onSubmit={postProdukt}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="product-name" className="form-label">Nazwa Produktu</label>
                            <input type="text" className="form-control" id="product-name" placeholder="Nazwa produktu" value={product} onInput={e => setProduct(e.target.value)} required autoComplete="off"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="product-quantity" className="form-label">Szacunkowa ilość</label>
                            <input type="number" className="form-control" id="product-quantity" placeholder="Szacunkowa ilośc" value={quantity} onInput={e => setQuantity(e.target.value)} required autoComplete="off"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="product-type-list" class="form-label">Szt/kg</label>
                            <input class="form-control" list="datalistOptions" id="product-type-list" placeholder="Szt/Kg" value={type} onChange={e => setType(e.target.value)} required autoComplete="off"/>
                                <datalist id="datalistOptions">
                                <option value="Szt" />
                                <option value="Kg" />
                            </datalist>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddModal}>
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
