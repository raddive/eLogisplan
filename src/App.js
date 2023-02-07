import {React,useContext} from 'react';
import { BrowserRouter, Routes, Route,Navigate, } from "react-router-dom";
import { UserDataProvider,UserDataConsumer,UserContext} from "./contexts/userData";
import { ResourceDataProvider,ResourceDataConsumer,ResourceContext} from "./contexts/resourceData";

import Landing from './pages/Landing';
import NoPage from './pages/NoPage';

import Plan from './pages/Usuario/Plan';
import Viaje from './pages/Usuario/Viaje';
import Servicio from './pages/Usuario/Servicio';

import AdminLanding from './pages/Administracion/AdminLanding';
import AdminPlan from './pages/Administracion/AdminPlan';
import AdminMap from 'pages/Administracion/AdminMap';

function App() {
  
  const ProtectedRoute = ({ children }) => {
    const userData = useContext(UserContext).userData;
    const adminData = useContext(UserContext).adminData;
    const isAdmin = useContext(UserContext).isAdmin;

    console.log("usuario: " + userData.name);
    console.log("administrador " + adminData.name);
    if (userData.name!=="" || adminData.name!=="" ) {
      return children      
    }
    else if (isAdmin===false) {
      return <Navigate to="/" replace />;
    }
    else if (isAdmin===true) {
      return <Navigate to="/admin" replace />;
    }
  };

  return (
    <BrowserRouter basename="">
      <UserDataProvider>
      <ResourceDataProvider>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/plan" element={
              <UserDataConsumer>
                {user => (
                    <ProtectedRoute>
                      <Plan />
                    </ProtectedRoute>
                )}
            </UserDataConsumer>
          }/>
          <Route path="/viaje" element={
              <UserDataConsumer>
                {user =>
                    <ProtectedRoute>
                      <Viaje />
                    </ProtectedRoute>
                }
              </UserDataConsumer>
            }/>
          <Route path="/servicio" element={
              <ProtectedRoute>
                <Servicio />
              </ProtectedRoute>
            }/>
          <Route path="/adminPlan" element={
              <ProtectedRoute>
                <AdminPlan/>
              </ProtectedRoute>
          }/>
          <Route path="/adminMap" element={
              <ProtectedRoute>
                <AdminMap/>
              </ProtectedRoute>
            }/>
            <Route path="/" element={<Landing/>} />
          <Route path="/admin" element={<AdminLanding/>} />
          <Route path="/adminMap2" element={<AdminMap/>} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </ResourceDataProvider>
      </UserDataProvider>
    </BrowserRouter>
  );
}
export default App;
