import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";


import {Row, Col, Card, Table, Button, DropdownButton, Dropdown} from 'react-bootstrap'
import { logService } from '../_services';


function List({history, match }) {
    const { path } = match;
    const [logs, setLogs] = useState([]);

    //Headers for Export Fields
    const headers = [
      { label: "Date", key: "Date" },
      { label: "FirstName", key: "FirstName" },
      { label: "Surname", key: "Surname" },
      { label: "Phone", key: "Phone" },
      { label: "Temperature", key: "Temperature" },
      { label: "Travelled", key: "Travelled" },
      { label: "Didn't Travel", key: "NotTravelled" }
    
    ];

   
    function deleteLog(id) {
        setLogs(logs.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        logService.delete(id).then(() => {
            setLogs(logs => logs.filter(x => x.id !== id));
            window.location.reload(false);
        });
    }
    
    //Export CSV data info
    const csvReport = {
      data: logs,
      headers: headers,
      filename: 'Employee-log_Report.csv'
    };


    useEffect(() => {
      logService.getAll().then(data => setLogs(data));
      
    }, []);

    return (
      <div>
        <h1>Log</h1>
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
                        <i className="fas fa-plus-circle"></i> Create New Log Item
                    </Button>
                  </Link>
                  <Button 
                    variant="info" 
                    size="sm" style={{float: 'right'}} 
                    className="float-right rounded-pill mr-2" 
                  > 
                      <i className="fas fa-download"></i>
                      <CSVLink {...csvReport} className="text-light export-btn"> Export to CSV</CSVLink>
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
                    {logs && logs.map((log, index) => (
                        <tr key={log._id}>
                            <td>{index + 1}</td>
                            <td>{log.FirstName} {log.Surname}</td>
                            <td>{log.Phone}</td>
                            <td className=" text-center">{log.Temperature}</td>
                            <td className=" text-center">{log.Travelled 
                                    ?<i className="far fa-check-circle text-success"></i>
                                    :<i className="far fa-times-circle text-danger"></i>}
                            </td>
                            <td className=" text-center">{log.NotTravelled 
                                    ?<i className="far fa-check-circle text-success"></i>
                                    :<i className="far fa-times-circle text-danger"></i>}
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <React.Fragment>
                                  <Link to={`${path}/edit/${log._id}`}>
                                    <Button 
                                      variant="outline-secondary" 
                                      className="rounded-circle mr-1"
                                      data-toggle="tooltip" 
                                      data-placement="bottom" 
                                      title="Edit Employee Log Item"
                                    >  
                                      <i className="far fa-edit"></i>
                                    </Button>
                                  </Link>
                                
                                  <Button
                                    variant="outline-danger" 
                                    className="rounded-circle"
                                    data-toggle="tooltip" 
                                    data-placement="bottom" 
                                    title="Delete Employee Log Item"
                                    onClick={() => deleteLog(log._id)}
                                    disabled={log.isDeleting}
                                  >
                                    {log.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <i className="far fa-trash-alt"></i>
                                    }
                                    
                                  </Button> 
                                  
                                </React.Fragment>
                            </td>
                        </tr>
                    ))}
                    {!logs &&
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {logs && !logs.length &&
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="p-2">No logs To Display</div>
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