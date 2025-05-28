import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth context
import { AuthProvider } from './contexts/AuthContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DataEntryPage from './pages/DataEntryPage';
import ComplaintsPage from './pages/ComplaintsPage';
import DeliveryPage from './pages/DeliveryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-900 text-white">
        <Toaster 
          position="top-left"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#334155',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="data-entry" element={<DataEntryPage />} />
            <Route path="complaints" element={<ComplaintsPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* Redirect any other route to dashboard */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;