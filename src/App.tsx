import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { CandidatePage } from './pages/CandidatePage';
import { CandidateNotFound } from './components/CandidateNotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main public / landing experience */}
        <Route path="/" element={<HomePage />} />

        {/* Confidential Candidate Administration System */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Dynamic Candidate Personalized Routes */}
        <Route path="/candidate/:slug" element={<CandidatePage />} />

        {/* Direct dynamic candidate route alias support (e.g. /aarush -> /candidate/aarush) */}
        <Route path="/:slug" element={<CandidatePage />} />

        {/* Catch-all 404 handler */}
        <Route path="*" element={<CandidateNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
