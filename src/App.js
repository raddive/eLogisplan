import {React,useContext} from 'react';
import { BrowserRouter, Routes, Route,Navigate, } from "react-router-dom";
import { UserDataProvider,UserDataConsumer,UserContext} from "./contexts/userData";
import { ResourceDataProvider,ResourceDataConsumer,ResourceContext} from "./contexts/resourceData";

import Landing from './pages/Landing';
import Plan from './pages/Plan';
import Viaje from './pages/Viaje';
import Servicio from './pages/Servicio';
import ServicioWarning from './pages/ServicioWarning';
import NoPage from './pages/NoPage';
import Map from './pages/Map';

function App() {

  

  const ProtectedRoute = ({ children }) => {
    const userData = useContext(UserContext).userData;
    if (userData.name==="") {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
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
            <Route path="/warning" element={
              <ProtectedRoute>
                <Servicio warning={true} />
              </ProtectedRoute>
            }/>
          <Route path="/login" element={<Landing/>} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/map" element={<Map/>} />
        </Routes>
      </ResourceDataProvider>
      </UserDataProvider>
    </BrowserRouter>
  );
}
export default App;
