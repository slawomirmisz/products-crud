import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'


export default function AddHeaderTableModal(props) {

    const [tableName, setTableName] = useState('')
    const [tableDescription, setTableDescription] = useState('')

    const handleCloseAddModal = ()  =>{
        props.setShowAddModal(false)
      };

    const postTable = (event) =>{
        event.preventDefault()
        if(tableName){
            axios.post('https://products-mnich.herokuapp.com/api/tables', {
                    tableName: tableName,
                    tableDescription: tableDescription,
            }).then((response)=>{
                if(response.data)
                {
                    setTableName('')
                    setTableDescription('')
                    props.setShowAddModal(false)
                    props.setRefreshHeader(response.data)
                }
            })
        }
    }

    
    return (
        <>
            <Modal show={props.showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj Tabele</Modal.Title>
                </Modal.Header>
                <form onSubmit={postTable}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="table-name" className="form-label">Nazwa</label>
                            <input type="text" className="form-control" id="table-name" placeholder="Nazwa tabeli" value={tableName} onInput={e => setTableName(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="table-description" className="form-label">Opis</label>
                            <input type="text" className="form-control" id="table-description" placeholder="Opis tabeli" value={tableDescription} onInput={e => setTableDescription(e.target.value)}/>
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
