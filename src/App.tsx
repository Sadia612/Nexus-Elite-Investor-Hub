import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MeetingProvider } from './context/MeetingContext';
import { PaymentsPage } from './pages/payments/PaymentsPage';

// Layout
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboard & Profiles
import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';
import { EntrepreneurProfile } from './pages/profile/EntrepreneurProfile';
import { InvestorProfile } from './pages/profile/InvestorProfile';

// All Feature Pages
import { InvestorsPage } from './pages/investors/InvestorsPage';
import { EntrepreneursPage } from './pages/entrepreneurs/EntrepreneursPage';
import { MeetingsPage } from './pages/meetings/MeetingsPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { DocumentsPage } from './pages/documents/DocumentsPage'; // Milestone 4
import { SettingsPage } from './pages/settings/SettingsPage';
import { HelpPage } from './pages/help/HelpPage';
import { DealsPage } from './pages/deals/DealsPage';

// Chat & Video
import { ChatPage } from './pages/chat/ChatPage';
import { VideoCallPage } from './pages/video/VideoCallPage';

function App() {
  return (
    <MeetingProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* 1. Login/Register (No Sidebar) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* 2. Main App Features (With Sidebar Layout) */}
            <Route element={<DashboardLayout />}>
              {/* Dashboards */}
              <Route path="/dashboard/entrepreneur" element={<EntrepreneurDashboard />} />
              <Route path="/dashboard/investor" element={<InvestorDashboard />} />
              
              {/* Core Features */}
              <Route path="/investors" element={<InvestorsPage />} />
              <Route path="/entrepreneurs" element={<EntrepreneursPage />} />
              <Route path="/meetings" element={<MeetingsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              
              {/* DOCUMENT CHAMBER (Milestone 4) */}
              <Route path="/documents" element={<DocumentsPage />} />
              
              {/* Profiles & Others */}
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/profile/entrepreneur/:id" element={<EntrepreneurProfile />} />
              <Route path="/profile/investor/:id" element={<InvestorProfile />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:userId" element={<ChatPage />} />
            </Route>
            
            {/* 3. Full Screen Features */}
            <Route path="/video-call" element={<VideoCallPage />} />
            
            {/* 4. Default Redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </MeetingProvider>
  );
}

export default App;