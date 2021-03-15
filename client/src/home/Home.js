import React from "react";
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

//Importing Components
//import clientRoutes from "../clientRoutes";
// function  nextPath (path) {
//     this.props.history.push(path);
// }

function Home() {

    const history = useHistory();

    return(
        <div>
            <Container fluid>
                <div className="row home-row">
                    <div className="col-md-3 bg-info split-home left">
                    <div className="bg-image">
                            <img
                                src={require("../assets/img/social_distancing.svg").default}
                                alt="..."
                            />
                        </div> 
                    </div>
                    <div className="col-md-9 split-home right">
                        <Container className="">
                            <h1 className="text-info">Contact Tracing</h1>
                            <span className="text-secondary">As a precautionary measure to <b>COVID-19</b>, 
                            this app was implemented to record personal information for the purposes of contact tracing. 
                            Select the requisite button below and complete the corresponding form. </span>
                            <div className=" row buttons">
                                <div className="col-xs-12 col-md-6">
                                    <Button 
                                        variant="outline-info" 
                                        onClick={() => history.push('/clients')}
                                        className="btn btn-block"
                                    ><b>VISITORS</b></Button>
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <Button 
                                        variant="outline-dark" 
                                        onClick={() => history.push('/employeesLog')}
                                        className="btn btn-block"
                                    ><b>EMPLOYEES</b></Button>
                                </div>
                            </div>
                        </Container>
                        
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;

