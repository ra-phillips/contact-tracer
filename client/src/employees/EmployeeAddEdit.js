import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Button, Container} from 'react-bootstrap'

import { employeeService, alertService } from '../_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    const initialValues = {
        FirstName: '',
        Surname: '',
        Email: '',
        Phone: '',
        Position: '',
        Status: ''
        
    };

    // Validate input values using yup
    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().required("This Field is required"),
        Surname: Yup.string().required("This Field is required"),
        Email: Yup.string().required("This Field is required"),
        Phone: Yup.string().required("This Field is required")
        .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        "Phone number must contain area code."),
        Position: Yup.string().required("This Field is required"),
        Status: Yup.string().required("This Field is required")
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createEmployee(fields, setSubmitting);
        } else {
            updateEmployee(id, fields, setSubmitting);
        }
    }

    function createEmployee(fields, setSubmitting) {
        employeeService.create(fields)
            .then(() => {
                alertService.success('Employee added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch((error) => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateEmployee(id, fields, setSubmitting) {
        employeeService.update(id, fields)
            .then(() => {
                alertService.success('Employee updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const [user, setUser] = useState({});
    //const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
                    
    }, []);

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, handleChange, setFieldValue }) => {
                
                if (!isAddMode) {
                    // get user and set form fields
                    employeeService.getById(id).then(user => {
                        const fields = ['FirstName', 'Surname','Email', 'Phone', 'Position','Status'];
                        fields.forEach(field => setFieldValue(field, user[field], false));
                        setUser(user);
                    });
                }

                return (
                    <Container fluid className="pl-5 pr-5">
                        <Form>
                        <h1>{isAddMode ? 'Add Employee' : 'Edit Employee'}</h1>
                        <div className="form-row mt-5">
                           
                            <div className="form-group col-6">
                                <label>First Name</label>
                                <Field name="FirstName" type="text" onChange={handleChange} className={'form-control' + (errors.FirstName && touched.FirstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="FirstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-6">
                                <label>Surname</label>
                                <Field name="Surname" type="text" onChange={handleChange} className={'form-control' + (errors.Surname && touched.Surname ? ' is-invalid' : '')} />
                                <ErrorMessage name="Surname" component="div" className="invalid-feedback" />
                            </div>
                            
                        </div>
                        <div className="form-row mt-3">
                            <div className="form-group col-6">
                                <label>Mobile</label>
                                <Field name="Phone" type="text" onChange={handleChange} className={'form-control' + (errors.Phone && touched.Phone ? ' is-invalid' : '')} />
                                <ErrorMessage name="Phone" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-6">
                                <label>Email</label>
                                <Field name="Email" type="text" onChange={handleChange} className={'form-control' + (errors.Email && touched.Email ? ' is-invalid' : '')} />
                                <ErrorMessage name="Email" component="div" className="invalid-feedback" />
                            </div>
                           
                        </div>
                        
                        <div className="form-row mt-3">
                            <div className="form-group col-6">
                                <label>Position</label>
                                <Field name="Position" type="text" onChange={handleChange} className={'form-control' + (errors.Position && touched.Position ? ' is-invalid' : '')} />
                                <ErrorMessage name="Position" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Status</label>
                                <select name="Status" onChange={handleChange} id="Status" className={'form-control' + (errors.Status && touched.Status ? ' is-invalid' : '')}>
                                    <option>Choose...</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Consultant">Consultant</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Terminated">Terminated</option>
                                </select>
                                <ErrorMessage name="Status" component="div" className="invalid-feedback" />
                            </div>
                           
                        </div>
                         

                        <div className="form-row mt-5">
                            <div className="form-group col-6 d-flex justify-content-end">
                                <Button variant="primary" type="submit" disabled={isSubmitting} className="btn-block col-6 ">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </Button>
                            </div>
                            <div className="form-group col-6">
                                <Link to={isAddMode ? '.' : '..'} className="">
                                    <Button
                                        variant="danger" 
                                        className="btn-block col-6"
                                        data-toggle="tooltip" 
                                        data-placement="bottom" 
                                        title="Cancel"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        
                    </Form>
                    </Container>
                    
                );
            }}
        </Formik>
    );
}

export default AddEdit;