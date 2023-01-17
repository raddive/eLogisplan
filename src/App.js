import {React,useContext} from 'react';
import { BrowserRouter, Routes, Route,Navigate, } from "react-router-dom";
import { UserDataProvider,UserDataConsumer,UserContext} from "./contexts/userData";
import { ResourceDataProvider,ResourceDataConsumer,ResourceContext} from "./contexts/resourceData";

import Landing from './pages/Landing';
import Plan from './pages/Plan';
import Viaje from './pages/Viaje';
import Servicio from './pages/Servicio';
import NoPage from './pages/NoPage';
import Map from './pages/Map';
import AdminLanding from './pages/AdminLanding';
import AdminPlan from './pages/AdminPlan';

function App() {
  
  const ProtectedRoute = ({ children }) => {
    const userData = useContext(UserContext).userData;
    const adminData = useContext(UserContext).adminData;
    const isAdmin = useContext(UserContext).isAdmin;
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
          <Route path="/" element={<Landing/>} />
          <Route path="/admin" element={<AdminLanding/>} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </ResourceDataProvider>
      </UserDataProvider>
    </BrowserRouter>
  );
}
export default App;
