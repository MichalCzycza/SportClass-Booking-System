import './App.css';
import React, { useState, useEffect } from 'react';
import StronaGlowna from './elements/StronaGlowna';
import Logowanie from './elements/Logowanie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import KlientPanel from './elements/KlientPanel';
import TrenerPanel from './elements/TrenerPanel';
import PanelAdmina from './elements/AdminPanel';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = sessionStorage.getItem('user');
        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const ProtectedRoute = ({ element, requiredRole }) => {
        if (!user) {
            return <Navigate to="/logowanie" />;
        }

        if (requiredRole && user.rola !== requiredRole) {
            return <Navigate to="/" />;
        }

        return element;
    };


    return (
        <Router>
            <Routes>
                <Route path="/" element={<StronaGlowna />} />
                <Route path="/logowanie" element={<Logowanie setUser={setUser} />} />

                <Route
                    path="/panelKlienta/:id"
                    element={
                        <ProtectedRoute
                            element={<KlientPanel />}
                            requiredRole="klient"
                        />
                    }
                />

                <Route
                    path="/panelTrenera/:id"
                    element={
                        <ProtectedRoute
                            element={<TrenerPanel />}
                            requiredRole="trener"
                        />
                    }
                />

                <Route
                    path="/panelAdmina/:id"
                    element={
                        <ProtectedRoute
                            element={<PanelAdmina />}
                            requiredRole="admin"
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
