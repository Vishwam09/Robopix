/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { AuditTable } from './components/AuditTable';
import { ExecutiveDossier } from './components/ExecutiveDossier';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ConsultationModal } from './components/ConsultationModal';
import { AuthModal } from './components/AuthModal';
import { ConsultationHistoryModal } from './components/ConsultationHistoryModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { PROJECTS_DATA } from './data/projectsData';
import { Project, DesignSystemTheme, VisualMode } from './types/portfolio';

function MainApp() {
  const [currentTheme, setCurrentTheme] = useState<DesignSystemTheme>('lime');
  const [visualMode, setVisualMode] = useState<VisualMode>('bento');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const isLime = currentTheme === 'lime';

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-200 ${
        isLime ? 'bg-[#FFFFFF] text-[#191A23]' : 'bg-[#000000] text-[#E5E5E5]'
      }`}
    >
      {/* Primary Header with Auth and Navigation */}
      <Header
        onOpenConsultation={() => setConsultationOpen(true)}
        currentTheme={currentTheme}
      />

      {/* Main Content Sections */}
      <main className="w-full flex flex-col">
        {/* Split-Screen Hero & Telemetry Cluster */}
        <HeroSection
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onOpenConsultation={() => setConsultationOpen(true)}
          totalProjects={PROJECTS_DATA.length}
        />

        {/* Minimalist Portfolio Gallery (Bento & Grid with Category Filtering) */}
        <PortfolioGallery
          projects={PROJECTS_DATA}
          onSelectProject={(project) => setSelectedProject(project)}
          currentTheme={currentTheme}
          visualMode={visualMode}
          onVisualModeChange={setVisualMode}
        />

        {/* Systems & Hardware Compliance Field Audit */}
        <AuditTable
          projects={PROJECTS_DATA}
          onSelectProject={(project) => setSelectedProject(project)}
          currentTheme={currentTheme}
        />

        {/* Founder Dossier & Engineering Creed */}
        <ExecutiveDossier
          currentTheme={currentTheme}
          onOpenConsultation={() => setConsultationOpen(true)}
        />
      </main>

      {/* Minimalist Footer */}
      <Footer
        currentTheme={currentTheme}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Fullscreen Interactive Project Lightbox & Simulator */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        currentTheme={currentTheme}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Direct Systems Consultation Booking Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        currentTheme={currentTheme}
      />

      {/* Client Authentication Modal (Sign In / Sign Up) */}
      <AuthModal currentTheme={currentTheme} />

      {/* Consultation Booking History Modal */}
      <ConsultationHistoryModal
        currentTheme={currentTheme}
        onOpenNewBooking={() => setConsultationOpen(true)}
      />

      {/* Admin Portal Modal */}
      <AdminPortalModal currentTheme={currentTheme} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
