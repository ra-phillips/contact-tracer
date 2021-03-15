import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Button, Container} from 'react-bootstrap'

import { logService, alertService } from '../_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    const initialValues = {
        FirstName: '',
        Surname: '',
        Phone: '',
        Temperature: '',
        Travelled: false,
        NotTravelled: false
    };

    // Validate input values using yup
    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().required("This Field is required"),
        Surname: Yup.string().required("This Field is required"),
        Phone: Yup.string().required("This Field is required")
        .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        "Phone number must contain area code."),
        Temperature: Yup.string().required("This Field is required").matches(/^(\d+)?([.]?\d{0,2})?$/),
        Travelled: Yup.bool(),
        NotTravelled: Yup.bool()
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createLog(fields, setSubmitting);
        } else {
            updateLog(id, fields, setSubmitting);
        }
    }

    function createLog(fields, setSubmitting) {
        logService.create(fields)
            .then(() => {
                alertService.success('Client added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch((error) => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateLog(id, fields, setSubmitting) {
        logService.update(id, fields)
            .then(() => {
                alertService.success('Client updated', { keepAfterRouteChange: true });
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
                    logService.getById(id).then(user => {
                        const fields = ['FirstName', 'Surname', 'Phone', 'Temperature','Travelled','NotTravelled'];
                        fields.forEach(field => setFieldValue(field, user[field], false));
                        setUser(user);
                    });
                }

                return (
                    <Container fluid>
                        <Form>
                        <h1>{isAddMode ? 'Add Log Item' : 'Edit Log Item'}</h1>
                        <div className="form-row mt-5">
                           
                            <div className="form-group col-6">
                                <label>First Name</label>
                                <Field name="FirstName" type="text" className={'form-control' + (errors.FirstName && touched.FirstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="FirstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-6">
                                <label>Surname</label>
                                <Field name="Surname" type="text" className={'form-control' + (errors.Surname && touched.Surname ? ' is-invalid' : '')} />
                                <ErrorMessage name="Surname" component="div" className="invalid-feedback" />
                            </div>
                            
                        </div>
                        <div className="form-row mt-3">
                            <div className="form-group col-6">
                                <label>Mobile</label>
                                <Field name="Phone" type="text" className={'form-control' + (errors.Phone && touched.Phone ? ' is-invalid' : '')} />
                                <ErrorMessage name="Phone" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-6">
                                <label>Temperature</label>
                                <Field name="Temperature" type="text" className={'form-control' + (errors.Temperature && touched.Temperature ? ' is-invalid' : '')} />
                                <ErrorMessage name="Temperature" component="div" className="invalid-feedback" />
                            </div>
                           
                        </div>
                        
                        
                        <div className="form-check form-check-inline">
                            <ErrorMessage name="Travelled" component="div" className="invalid-feedback" />
                            <input 
                                name="Travelled"
                                className={(errors.Travelled && touched.Travelled ? 'form-check-input is-invalid' : 'form-check-input')} 
                                type="checkbox" 
                                onChange={handleChange}
                                id="inlineCheckbox1" 
                                value="option1"
                            />
                            <label className="form-check-label">Travelled within the last 14 days!</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <ErrorMessage name="NotTravelled" component="div" className="invalid-feedback"/> 
                            <input 
                            name="NotTravelled"
                            className={(errors.NotTravelled && touched.NotTravelled ? 'form-check-input is-invalid' : 'form-check-input')} 
                            type="checkbox" 
                            onChange={handleChange}
                            id="inlineCheckbox2"
                            value="option2"/>
                            <label className="form-check-label">Didn't travel within the last 14 days!</label>
                        </div>
                         

                        <div className="form-row mt-3">
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