import React from "react";
import { Route, Switch } from "react-router-dom";

import '../assets/css/App.css';

//Importing Components
import routes from "../routes";



function App() {
  //const location = useLocation();

  //const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      }
      else {
        return null;
      }
    });
  };

  return (
  
    <div className="wrapper">
     
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
      
    </div>
    
  );
}

export default App;
