import React from "react";
//import { useLocation } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'


//Importing Components
//import clientRoutes from "../../clientRoutes";

function Header() {

   return(
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/"> 
            <i className="fas fa-arrow-circle-left fa-2x"></i>
        </Navbar.Brand>
        <span className="justify-content-md-end">Contact Tracer</span>

    </Navbar>
   );
    

}

export default Header;