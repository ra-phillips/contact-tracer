import Home from "./home/Home.js";
import Client from "./clients/Client.js";
import EmployeeLog from "./employees/EmployeeLog.js";

//Create dynamic routes for each page view 
const clientRoutes = [
    {
        path: "/",
        name: "Home",
        icon: "",
        component: Home,
        layout: "/",
      },
    {
        path: "clients",
        name: "Visitor",
        icon: "",
        component: Client,
        layout: "/",
      },
      {
        path: "employeesLog",
        name: "EmployeesLog",
        icon: "",
        component: EmployeeLog,
        layout: "/",
      }
];

export default clientRoutes;
