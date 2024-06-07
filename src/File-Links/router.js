import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Page/Home";
import Login from "../Page/Login"
import SigUp from "../Page/SigUp"
import Admin from '../Page/Admin'
import AllUser from "../Page/AllUser";
import AllDetails from "../Page/AllDetails";
import Download from '../Page/Download'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
          children:[{
            path: '',
            element: <Home/>
          },{
            path : 'login',
            element: <Login/>
          },{
            path: 'sigUp',
            element: <SigUp/>
          },
          {
            path:'downloade/:subject',
            element:<Download/>
          },
          {
            path: 'admin',
            element: <Admin/>,
            children :[
              {
                path : '',
                element : <AllUser/>
              },{
                path : 'all-details',
                element : <AllDetails/>
              }
            ]
          }
        ]
    }
])

export default router