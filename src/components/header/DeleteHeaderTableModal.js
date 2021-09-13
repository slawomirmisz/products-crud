import React from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'


export default function DeleteHeaderTableModal(props) {


    const handleCloseDeleteModal = ()  =>{
        props.setShowDeleteModal(false)
      };

    const deleteTable = () =>{
        axios.delete('https://products-mnich.herokuapp.com/api/tables', {
            params: {
                tableId: props.tableIdDelete
            }
        }).then((response)=>{
            if(response.data)
            {
                handleCloseDeleteModal()
                props.setRefreshHeader(response.data)
            }
        })
    }
    
    return (
        <>
            <Modal show={props.showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Czy na pewno chcesz usunąć tabelę?</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-evenly">
                            <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                Zamknij
                            </Button>
                            <Button variant="primary" type="submit" onClick={deleteTable}>
                                Usuń
                            </Button>
                        </div>
                    </Modal.Body>
            </Modal>
        </>
    )
}
