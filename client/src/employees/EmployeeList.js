import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";


import {Row, Col, Card, Table, Button, DropdownButton, Dropdown} from 'react-bootstrap'
import { employeeService } from '../_services';


function EmpList({history, match }) {
    const { path } = match;
    const [employees, setEmployees] = useState([]);

    //Headers for Export Fields
    const headers = [
      { label: "FirstName", key: "FirstName" },
      { label: "Surname", key: "Surname" },
      { label: "Email", key: "Email" },
      { label: "Phone", key: "Phone" },
      { label: "Position", key: "Position" },
      { label: "Status", key: "Status" }
    
    ];


    function deleteEmployee(id) {
        setEmployees(employees.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        employeeService.delete(id).then(() => {
            setEmployees(employees => employees.filter(x => x.id !== id));
            //history.push('..');
            window.location.reload(false);
        });
    }

    //Export CSV data info
    const csvReport = {
      data: employees,
      headers: headers,
      filename: 'Employee_Report.csv'
    };

    useEffect(() => {
      employeeService.getAll().then(x => setEmployees(x));
    }, []);

    return (
      <div>
        <h1>Employee List</h1>
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
                        <i className="fas fa-plus-circle"></i> Create New Employee
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
                    <th className="border-0" style={{ width: '15%' }}>Position</th>
                    <th className="border-0 text-center" style={{ width: '15%' }}>Email</th>
                    <th className="border-0 text-center" style={{ width: '15%' }}>Mobile</th>
                    <th className="border-0 text-center" style={{ width: '15%' }}>Status</th>
                    <th className="border-0 " style={{ width: '10%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {employees && employees.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>{employee.FirstName} {employee.Surname}</td>
                            <td>{employee.Position}</td>
                            <td className=" text-center">{employee.Email}</td>
                            <td className=" text-center">{employee.Phone}</td>
                            <td className=" text-center">{employee.Status}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <React.Fragment>
                                  <Link to={`${path}/edit/${employee._id}`}>
                                    <Button 
                                      variant="outline-secondary" 
                                      className="rounded-circle mr-1"
                                      data-toggle="tooltip" 
                                      data-placement="bottom" 
                                      title="Edit Employee Item"
                                    >  
                                      <i className="far fa-edit"></i>
                                    </Button>
                                  </Link>
                                
                                  <Button
                                    variant="outline-danger" 
                                    className="rounded-circle"
                                    data-toggle="tooltip" 
                                    data-placement="bottom" 
                                    title="Delete Employe Item"
                                    onClick={() => deleteEmployee(employee._id)}
                                    disabled={employee.isDeleting}
                                  >
                                    {employee.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <i className="far fa-trash-alt"></i>
                                    }
                                    
                                  </Button> 
                                  
                                </React.Fragment>
                            </td>
                        </tr>
                    ))}
                    {!employees &&
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {employees && !employees.length &&
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="p-2">No Employees To Display</div>
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

export default EmpList ;