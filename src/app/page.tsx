"use client";

import React, { useState } from 'react';

// Components
import Navigation from '../components/sections/Navigation';
import HeroSection from '../components/sections/HeroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CADSection, { CADProject } from '../components/sections/CADSection';
import ContactSection from '../components/sections/ContactSection';
import ScrollToTop from '../components/ui/ScrollToTop';
import Notification from '../components/ui/Notification';

// Hooks
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useEmailObfuscation } from '../hooks/useEmailObfuscation';

// Types
import { Project } from '../components/ui/ProjectCard';

const user = {
  name: "Issa Alkhoury",
  title: "Computer Engineer",
  bio: "",
  email: { encoded: "aXNzYWFsa2hvdXJ5MDVAZ21haWwuY29t", domain: "gmail.com" },
  social: {
    github: "https://github.com/busyissa",
    linkedin: "https://www.linkedin.com/in/issaalkhoury/",
    twitter: "#"
  }
};

const projects: Project[] = [
  {
    id: 1,
    title: "HotelGuard",
    shortDesc: "AI-Powered Hotel Risk Monitoring",
    description: "A hotel risk-monitoring dashboard integrating operational webhook events, computer vision frame analysis, and AI-powered risk scoring via Google Gemini.",
    detailedDescription: "Built at RebelHacks 2026, HotelGuard analyzes video feeds using Gemini AI and surfaces alerts through a real-time Next.js dashboard without relying on identity data. Features include operational event ingestion from property management systems, computer vision frame analysis with YOLO-based people tracking, room-level risk scoring, and real-time alerts — all metadata-focused for privacy.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Python", "Google Gemini", "YOLO", "Computer Vision"],
    techStack: [
      { name: "Next.js", color: "cyan" },
      { name: "Supabase", color: "green" },
      { name: "Python", color: "blue" },
      { name: "Gemini AI", color: "purple" },
    ],
    github: "https://github.com/randyp2/2026-rebelhacks-project",
    demo: "https://hotelguard.vercel.app",
    image: "/api/placeholder/600/400",
    status: "Completed",
    type: "Web Application",
    featured: true,
    year: "2026"
  },
  {
    id: 2,
    title: "16-bit Pipelined Processor",
    shortDesc: "Custom RISC CPU in Verilog",
    description: "A 16-bit RISC-style CPU implemented in Verilog featuring a 5-stage pipeline architecture with forwarding and hazard handling mechanisms.",
    detailedDescription: "A fully pipelined processor with IF, ID, EX, MEM, and WB stages. Supports R-type operations (ADD, SUB, AND, OR), memory operations (LW, SW), and branch operations (BEQ, BNE). Features a 4-register file with r0 hardwired to 0, 16-bit instruction format with 6-bit immediate field, load-use stall detection, branch flush mechanisms, and EX stage forwarding from MEM/WB pipeline stages. Compatible with Icarus Verilog, ModelSim, and Questa.",
    technologies: ["Verilog", "FPGA", "CPU Architecture", "Digital Design", "Pipelining"],
    techStack: [
      { name: "Verilog", color: "orange" },
      { name: "FPGA", color: "blue" },
      { name: "CPU Design", color: "red" },
      { name: "Digital Logic", color: "gray" },
    ],
    github: "https://github.com/busyissa/Custom-16-bit-Pipelined-processor",
    demo: undefined,
    image: "/api/placeholder/600/400",
    status: "Completed",
    type: "Hardware Design",
    featured: true,
    year: "2025"
  },
  {
    id: 3,
    title: "Smart Heart Rate Watch",
    shortDesc: "Wearable Health Monitor",
    description: "A wearable heart rate monitoring system built on an ATmega328P that detects pulse signals, calculates BPM, and alerts users to potential POTS episodes.",
    detailedDescription: "Real-time heart rate monitoring using an analog pulse sensor and ADC with BPM calculation over 10-second sampling windows. Features an SSD1306 OLED display with startup bitmap and live BPM readout, POTS detection with age-based configurable thresholds, piezo buzzer and flashing LED alerts, two-button menu navigation, and UART serial output for debugging.",
    technologies: ["C", "ATmega328P", "I2C", "UART", "OLED", "Embedded Systems"],
    techStack: [
      { name: "C", color: "blue" },
      { name: "ATmega328P", color: "green" },
      { name: "Embedded", color: "orange" },
      { name: "Hardware", color: "gray" },
    ],
    github: "https://github.com/busyissa/Smart-Heart-Rate-Watch-System",
    demo: undefined,
    image: "/api/placeholder/600/400",
    status: "Completed",
    type: "Embedded System",
    featured: true,
    year: "2025"
  },
  {
    id: 4,
    title: "DES Encryption on FPGA",
    shortDesc: "Hardware Cryptography Engine",
    description: "A hardware implementation of the DES encryption algorithm designed for FPGA deployment with FSM control logic and 7-segment display output.",
    detailedDescription: "Implements a 3-round DES encryption engine on an Altera/Intel DE2-115 board (Cyclone IV FPGA). The system accepts a 64-bit plaintext and key, producing ciphertext through initial permutation, Feistel rounds with S-box substitution, and final permutation. Features an FSM-controlled datapath with an 8-entry 64-bit register file operating through IDLE, EXECUTE, and WRITEBACK states. Built with Quartus Prime.",
    technologies: ["Verilog", "FPGA", "Cryptography", "DES", "Quartus Prime", "Digital Design"],
    techStack: [
      { name: "Verilog", color: "orange" },
      { name: "FPGA", color: "blue" },
      { name: "Cryptography", color: "red" },
      { name: "Quartus", color: "purple" },
    ],
    github: "https://github.com/busyissa/DES-Encryption-Algorithm-for-Enhanced-Data-Security-on-FPGA",
    demo: undefined,
    image: "/api/placeholder/600/400",
    status: "Completed",
    type: "Hardware Design",
    featured: true,
    year: "2025"
  },
];

const cadProjects: CADProject[] = [
  {
    id: 1,
    title: "Jetson Nano Case",
    description: "Custom 3D-designed protective case for NVIDIA Jetson Nano optimized for wearable computing applications",
    images: [
      "/cad-designs-optimized/jetson_nano_1.webp",
      "/cad-designs-optimized/jetson_nano_2.webp", 
      "/cad-designs-optimized/jetson_nano_3.webp"
    ],
    hdImages: [
      "/cad-designs-hd/jetson_nano_1.webp",
      "/cad-designs-hd/jetson_nano_2.webp", 
      "/cad-designs-hd/jetson_nano_3.webp"
    ],
    category: "Hardware Design"
  },
  {
    id: 2,
    title: "Raspberry Pi Case",
    description: "Custom 3D-designed protective case for Raspberry Pi Compute Module and carrier PCB assembly optimized for wearable computing applications", 
    images: [
      "/cad-designs-optimized/raspberry_pi_1.webp",
      "/cad-designs-optimized/raspberry_pi_2.webp",
      "/cad-designs-optimized/raspberry_pi_3.webp",
      "/cad-designs-optimized/raspberry_pi_4.webp"
    ],
    hdImages: [
      "/cad-designs-hd/raspberry_pi_1.webp",
      "/cad-designs-hd/raspberry_pi_2.webp",
      "/cad-designs-hd/raspberry_pi_3.webp",
      "/cad-designs-hd/raspberry_pi_4.webp"
    ],
    category: "Hardware Design"
  },
  {
    id: 3,
    title: "Soldering Fume Extractor",
    description: "Custom 3D-designed fume extraction system with integrated blower fan to remove harmful solder smoke and improve workshop air quality during electronics work",
    images: [
      "/cad-designs-optimized/extractor_1.webp",
      "/cad-designs-optimized/extractor_2.webp",
      "/cad-designs-optimized/extractor_3.webp",
      "/cad-designs-optimized/extractor_4.webp",
    ],
    hdImages: [
      "/cad-designs-hd/extractor_1.webp",
      "/cad-designs-hd/extractor_2.webp",
      "/cad-designs-hd/extractor_3.webp",
      "/cad-designs-hd/extractor_4.webp",
    ],
    category: "Workshop Tools"
  }
];

const skills = [
  { category: "Programming Languages", items: ["C/C++", "Python", "SystemVerilog/Verilog", "RISC-V/MIPS/AVR Assembly"] },
  { category: "Methodologies", items: ["Algorithms", "Digital/Analog Circuits", "FPGA", "Microcontrollers", "Git", "UART", "ADC", "I2C", "Linux OS"] },
  { category: "Software Tools", items: ["ModelSim", "Quartus II", "LTSpice", "Arduino IDE", "VS Code", "Microchip Studio", "Fusion 360", "KiCad"] },
];

export default function Portfolio() {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [notification, setNotification] = useState<{message: string, type: string} | null>(null);
  const [selectedCADImage, setSelectedCADImage] = useState<{ projectId: number | null; imageIndex: number }>({ projectId: null, imageIndex: 0 });
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; index: number; projectId: number } | null>(null);

  // Custom hooks
  const { activeSection, setActiveSection, showScrollTop, scrollToTop } = useScrollSpy();
  const decodedEmail = useEmailObfuscation(user.email.encoded);

  // Notification handler
  const showNotification = (message: string, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section */}
      <HeroSection user={user} skills={skills} />

      {/* Projects Section */}
      <ProjectsSection
        projects={projects}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        expandedProject={expandedProject}
        setExpandedProject={setExpandedProject}
      />

      {/* CAD Section */}
      <CADSection
        cadProjects={cadProjects}
        selectedCADImage={selectedCADImage}
        setSelectedCADImage={setSelectedCADImage}
        lightboxImage={lightboxImage}
        setLightboxImage={setLightboxImage}
      />

      {/* Contact Section */}
      <ContactSection
        decodedEmail={decodedEmail}
        showNotification={showNotification}
      />

      {/* Footer */}
      <footer className="border-t border-slate-700/40 py-10 px-4" style={{ background: '#0a0f1a' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs font-mono">
            © 2026 Issa Alkhoury. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/busyissa" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 text-xs transition-colors">
              GitHub
            </a>
            <a href="#contact" className="text-slate-500 hover:text-cyan-400 text-xs transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* UI Components */}
      <ScrollToTop showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
      <Notification notification={notification} />
    </div>
  );
};