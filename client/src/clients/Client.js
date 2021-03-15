import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Button, Container} from 'react-bootstrap'

import { clientService, alertService } from '../_services';

function Client({ history, match }) {

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
        FirstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(2, "Must be at least 2 characters")
        .required("This Field is required"),
        Surname: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(20, "Must be 20 characters or less")
        .required("This Field is required"),
        Phone: Yup.string().required("This Field is required")
        .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        "Phone number must be 10 digits, including the area code."),
        Temperature: Yup.string().required("This Field is required").matches(/^(\d+)?([.]?\d{0,2})?$/),
        Travelled: Yup.bool(),
        NotTravelled: Yup.bool()
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        createClient(fields, setSubmitting);

    }

    function createClient(fields, setSubmitting) {
        clientService.create(fields)
            .then(() => {
                alertService.success('Client added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch((error) => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const [user, setUser] = useState({});
    //const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
                    
    }, []);

    return(
        <div>
            <Container fluid>
                <div className="row client-row">
                    <div className="col-md-4 bg-info split-client left">
                            <div className="bg-image">
                                <img
                                    src={require("../assets/img/Co_workers.svg").default}
                                    alt="..."
                                />
                            </div> 
                    </div>
                    <div className="col-md-8 split-client right">
                    <Container>
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ errors, touched, isSubmitting, handleChange, setFieldValue }) => {
                                    
                                return (
                                    
                                    <Form>
                                    <h1 className="d-flex justify-content-center">Visitor's Contact Tracing Form</h1>
                                    <div className="form-row mt-5">
                                    
                                        <div className="form-group col-xs-12 col-md-6">
                                            <label>First Name</label>
                                            <Field name="FirstName" type="text" className={'form-control' + (errors.FirstName && touched.FirstName ? ' is-invalid' : '')} />
                                            <ErrorMessage name="FirstName" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group col-xs-12 col-md-6">
                                            <label>Surname</label>
                                            <Field name="Surname" type="text" className={'form-control' + (errors.Surname && touched.Surname ? ' is-invalid' : '')} />
                                            <ErrorMessage name="Surname" component="div" className="invalid-feedback" />
                                        </div>
                                        
                                    </div>
                                    <div className="form-row mt-3">
                                        <div className="form-group col-xs-12 col-md-6">
                                            <label>Mobile</label>
                                            <Field name="Phone" type="text" className={'form-control' + (errors.Phone && touched.Phone ? ' is-invalid' : '')} />
                                            <ErrorMessage name="Phone" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group col-xs-12 col-md-6">
                                            <label>Temperature</label>
                                            <Field name="Temperature" type="number" className={'form-control' + (errors.Temperature && touched.Temperature ? ' is-invalid' : '')} />
                                            <ErrorMessage name="Temperature" component="div" className="invalid-feedback" />
                                        </div>
                                    
                                    </div>
                                    
                                    
                                    <div className="form-check form-check-inline mt-3 col-xs-12 col-md-6">
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
                                    <div className="form-check form-check-inline mt-3 col-xs-12 col-md-6">
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
                                    

                                    <div className="form-row mt-5">
                                        <div className="form-group col-xs-12 col-md-6 d-flex justify-content-center">
                                            <Button variant="info" type="submit" disabled={isSubmitting} className="btn-block">
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                SUBMIT
                                            </Button>
                                        </div>
                                        <div className="form-group col-xs-12 col-md-6">
                                            <Link to='.' className="">
                                                <Button
                                                    variant="secondary" 
                                                    className="btn-block"
                                                    data-toggle="tooltip" 
                                                    data-placement="bottom" 
                                                    title="Cancel"
                                                >
                                                    <span>CANCEL</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                </Form>
                                );
                            }}
                        </Formik>
                        </Container>
                    </div>
                </div>
            </Container>
        </div>   
                
    );
}

export default Client;