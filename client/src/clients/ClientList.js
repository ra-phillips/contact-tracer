import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";


import {Row, Col, Card, Table, Button, DropdownButton, Dropdown} from 'react-bootstrap'
import { clientService } from '../_services';


function List({history, match }) {
    const { path } = match;
    const [clients, setClients] = useState([]);

    //Headers for Export Fields
    const headers = [
      { label: "Date", key: "Date" },
      { label: "FirstName", key: "FirstName" },
      { label: "Surname", key: "Surname" },
      { label: "Phone", key: "Phone" },
      { label: "Temperature", key: "Temperature" },
      { label: "Travlled", key: "Travelled" },
      { label: "Didn't Travel", key: "NotTravelled" }
    
    ];

    function deleteClient(id) {
        setClients(clients.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        clientService.delete(id).then(() => {
            setClients(clients => clients.filter(x => x.id !== id));
            window.location.reload(false);
        });
    }

    //Export CSV data info
    const csvReport = {
      data: clients,
      headers: headers,
      filename: 'Clients_Report.csv'
    };

    useEffect(() => {
      clientService.getAllPost().then(x => setClients(x));
    }, []);


    return (
      <div>
        <h1>Clients</h1>
        <Row>
        <Col md="12">
          <Card className="card-plain table-plain-bg">
            
            <Card.Header >          
             
              <Row>
                <Col md="4">
                  <DropdownButton id="dropdown-basic-button" variant="" className="rounded-pill" title="Filter by All">
                    <Dropdown.Item href="#/action-1">Names</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Position</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Status</Dropdown.Item>
                  </DropdownButton>
                </Col>

                <Col md="4">
                  
                </Col>
                
                <Col md="4">
                  <Link to={`${path}/add`}>
                    <Button 
                      variant="outline-info" 
                      size="sm" style={{float: 'right'}} 
                      className="float-right rounded-pill" 
                    >
                        <i className="fas fa-plus-circle"></i> Create New Client
                    </Button>
                  </Link>
                  <Button 
                    variant="info" 
                    size="sm" style={{float: 'right'}} 
                    className="float-right rounded-pill mr-2" 
                    > 
                      <i className="fas fa-download"></i>
                      {/* <CSVLink {...csvReport} className="text-light export-btn"> Export to CSV</CSVLink> */}
                  </Button>     
                </Col>
              </Row>
              
            </Card.Header>

            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table table-hover">
              <thead >
                  <tr >
                    <th className="border-0 ">#</th>
                    <th className="border-0 " style={{ width: '25%' }}>Name</th>
                    <th className="border-0" style={{ width: '15%' }}>Mobile</th>
                    <th className="border-0 text-center" style={{ width: '15%' }}>Temperature</th>
                    <th className="border-0 text-center" style={{ width: '15%' }}>Travelled</th>
                    <th className="border-0 text-center" style={{ width: '15%' }}>Didn't Travel</th>
                    <th className="border-0 " style={{ width: '10%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {clients && clients.map((client, index) => (
                        <tr key={client._id}>
                            <td>{index + 1}</td>
                            <td>{client.FirstName} {client.Surname}</td>
                            <td>{client.Phone}</td>
                            <td className=" text-center">{client.Temperature}</td>
                            <td className=" text-center">{client.Travelled 
                                    ?<p>Yes</p>
                                    :<p>No</p>}
                            </td>
                            <td className=" text-center">{client.NotTravelled 
                                    ?<p>Yes</p>
                                    :<p>No</p>}
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <React.Fragment>
                                  <Link to={`${path}/edit/${client._id}`}>
                                    <Button 
                                      variant="outline-secondary" 
                                      className="rounded-circle mr-1"
                                      data-toggle="tooltip" 
                                      data-placement="bottom" 
                                      title="Edit Client"
                                    >  
                                      <i className="far fa-edit"></i>
                                    </Button>
                                  </Link>
                                
                                  <Button
                                    variant="outline-danger" 
                                    className="rounded-circle"
                                    data-toggle="tooltip" 
                                    data-placement="bottom" 
                                    title="Delete Client"
                                    onClick={() => deleteClient(client._id)}
                                    disabled={client.isDeleting}
                                  >
                                    {client.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <i className="far fa-trash-alt"></i>
                                    }
                                    
                                  </Button> 
                                  
                                </React.Fragment>
                            </td>
                        </tr>
                    ))}
                    {!clients &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {clients && !clients.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No clients To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>       
        </div>
    );
}

export default List ;