import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'


export default function EditHeaderTableModal(props) {

    const [tableName, setTableName] = useState('')
    const [tableDescription, setTableDescription] = useState('')
    

    const handleCloseEditModal = ()  =>{
        props.setShowEditModal(false)
      };

      const putTable = (event) =>{
        event.preventDefault()

        axios.put('https://products-mnich.herokuapp.com/api/tables', {
            tableName: tableName,
            tableDescription: tableDescription,
            tableIdEdit: props.tableIdEdit,
        }).then((response)=>{
            if(response.data)
            { 
                setTableName('')
                setTableDescription('')
                props.setShowEditModal(false)
                props.setRefreshHeader(response.data)
            }
        })
    }
    
    return (
        <>
            <Modal show={props.showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj Tabele</Modal.Title>
                </Modal.Header>
                <form onSubmit={putTable}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="table-name" className="form-label">Nazwa</label>
                            <input type="text" className="form-control" id="table-name" placeholder="Nazwa tabeli" value={tableName} onInput={e => setTableName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="table-description" className="form-label">Opis</label>
                            <input type="text" className="form-control" id="table-description" placeholder="Opis tabeli" value={tableDescription} onInput={e => setTableDescription(e.target.value)}/>
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
