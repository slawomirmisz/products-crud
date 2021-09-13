import React from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

export default function DeleteProductModal(props) {

    const handleCloseDeletetModal = ()  =>{
        props.setShowDeleteModal(false)
      }

    const deleteProdukt = () =>{
        axios.delete('https://products-mnich.herokuapp.com/api/products', {
            params: {
                productId: props.productIdDelete
            }
        }).then((response)=>{
            if(response.data)
            {
                props.setShowDeleteModal(false)
                props.setRefreshTable(response.data)
            }
        })
    }

    return (
        <>
            <Modal show={props.showDeleteModal} onHide={handleCloseDeletetModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Czy na pewno chcesz usunąć produkt?</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-evenly">
                            <Button variant="secondary" onClick={handleCloseDeletetModal}>
                                Zamknij
                            </Button>
                            <Button variant="primary" type="submit" onClick={deleteProdukt}>
                                Usuń
                            </Button>
                        </div>
                    </Modal.Body>
            </Modal>
        </>
    )
}
