import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Home from './pages/Home';
import Consulting from './pages/Consulting';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Background3D />
                <Navbar />

                <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>Loading 3D Assets...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/consult" element={<Consulting />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
