import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navbar, Nav} from 'react-bootstrap'
import { FaReact } from 'react-icons/fa'
import { AiOutlineEdit } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg'
import EditHeaderTableModal from './EditHeaderTableModal'
import DeleteHeaderTableModal from './DeleteHeaderTableModal'
import AddHeaderTableModal from './AddHeaderTableModal'

export default function Header(props) {

    const [tables, setTables] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTable, setActiveTable] = useState()
    const [refreshHeader, setRefreshHeader] = useState('')

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [tableIdEdit, setTableIdEdit] = useState()
    const handleShowEditModal = (tableId) => {
        setTableIdEdit(tableId)
        setShowEditModal(true)
    }

    const [tableIdDelete, setTableIdDelete] = useState()
    const handleShowDeleteModal = (tableId) => {
        setTableIdDelete(tableId)
        setShowDeleteModal(true)
    }  

    const handleShowAddModal = () => setShowAddModal(true);

    const changeTableId = (e)=>{
        props.setTableId(e.target.id)
        setActiveTable(e.target.id)
      }

    const getTables = () =>{
        axios.get('https://products-mnich.herokuapp.com/api/tables').then((response)=>{
            if(response.data)
            {
                setTables(response.data) 
                setActiveTable(response.data[0].ID)
                props.setTableId(response.data[0].ID)  
                setLoading(false) 
            }
        })
    }
      
    useEffect(()=>{
        getTables()
    }, [refreshHeader])

    return (
        <>
            {loading ? 
                <></>
            :
                <Navbar expand="lg" className="border-bottom px-4">               
                    <Nav.Link>
                        <FaReact className="fs-4" />
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {tables.map((tables) =>(
                                <div key={tables.ID}>
                                    <Nav.Link className={activeTable ==  tables.ID ? 'text-primary d-flex align-items-center': 'd-flex align-items-center'} key={tables.ID} onClick={changeTableId} id={tables.ID}>{tables.NAME}</Nav.Link>
                                    {activeTable ==  tables.ID ?
                                        <div className="d-flex justify-content-evenly">
                                            <a href="#" class="link-secondary"><AiOutlineEdit className="fs-5" id={tables.ID} onClick={() => handleShowEditModal(tables.ID)}/></a>
                                            <a href="#" class="link-danger"><CgClose className="fs-5" id={tables.ID} onClick={() => handleShowDeleteModal(tables.ID)}/></a>
                                        </div>
                                    : <></>}
                                </div>
                            ))}
                            <Nav.Link onClick={handleShowAddModal}>Dodaj</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>              
                </Navbar>
            }

            <AddHeaderTableModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} setRefreshHeader={setRefreshHeader}/>
            <EditHeaderTableModal tableIdEdit={tableIdEdit} showEditModal={showEditModal} setShowEditModal={setShowEditModal} setRefreshHeader={setRefreshHeader}/>
            <DeleteHeaderTableModal tableIdDelete={tableIdDelete} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setRefreshHeader={setRefreshHeader}/>
        </>  
    )
}
