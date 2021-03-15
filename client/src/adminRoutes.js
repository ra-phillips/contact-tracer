import Dashboard from "./misc/Dashboard.js";
import UserProfile from "./misc/UserProfile.js";
import Clients from './clients/Index'
import Employees from './employees/Index'
import Logs from './logs/Index'

//Create dynamic routes for each page view 
const adminRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "fas fa-chart-pie", 
        component: Dashboard,
        layout: "/admin",
      },
      {
        path: "/logs",
        name: "Logs",
        icon: "fas fa-archive",
        component: Logs, 
        layout: "/admin",
      },
      {
        path: "/clients",
        name: "Visitors",
        icon: "fas fa-users",
        component: Clients,
        layout: "/admin",
      },
      {
        path: "/employees",
        name: "Employees",
        icon: "fas fa-users-cog",
        component: Employees,
        layout: "/admin",
      },
      {
        path: "/user-profile",
        name: "User Profile",
        icon: "fas fa-user-circle", 
        component: UserProfile,
        layout: "/admin",
      }
];

export default adminRoutes;
