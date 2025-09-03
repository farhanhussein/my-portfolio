/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, ChevronDown, Award, Calendar } from 'lucide-react';

// Komponen gambar yang stabil dengan animasi
type StableImageProps = {
  src: string;
  alt: string;
  className?: string;
  [key: string]: unknown;
};

const StableImage = ({ src, alt, className, ...props }: StableImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Cek jika gambar sudah di-cache
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Fallback untuk error */}
      {hasError ? (
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <ExternalLink size={24} />
            <p className="text-sm mt-2">Image not available</p>
          </div>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Intersection Observer untuk animasi scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  // Scroll effect untuk navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = ['home', 'about', 'projects', 'certificates', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "A Progressive Web Application-Based Learning Management System",
      description: "Developed a Progressive Web Application-based Learning Management System for Computer Engineering practicum at Diponegoro University using Next.js, Express.js, and MySQL. The system enables assistants to efficiently manage practicum modules, videos, and quizzes, improving content organization and learning accessibility.",
      tech: ["Next.js", "Express.js", "MySQL", "Tailwind CSS"],
      image: "/pwa.jpeg",
      fallbackImage: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      title: "Books App",
      description: "Book Reads is a Progressive Web App that uses React JS and is useful for displaying the synopsis of novels. Book Reads allows readers to see the title, synopsis, authors, and genre of a novel. This PWA is the final assignment of the Mobile Device Programming practicum.",
      tech: ["React.js"],
      image: "/books.jpeg",
    },
    {
      title: "Covid Dashboard",
      description: "A web-based dashboard built to monitor Covid-19 cases in Indonesia and globally, providing users with real-time insights and historical data analysis. The system was developed using Next.js, and MySQL, with daily automated data synchronization from the Covid-19 API",
      tech: ["Next.js", "MySQL"],
      image: "/covid.png"
    },
    {
      title: "Intrusion Detection System",
      description: "Developed an Intrusion Detection System (IDS) on Kali Linux to monitor and analyze network traffic for potential threats. The system was configured using open-source security tools and customized rules to detect suspicious activities such as port scanning, brute-force attempts, and abnormal traffic patterns.",
      tech: ["Kali Linux"],
      image: "/ids.jpeg",
    },
  ];

  const certificates = [
    {
      title: "Certified Network Defender (CND)",
      issuer: "EC-Council",
      date: "2024 - 2027",
      description: "Fundamental understanding of the construct of data transfer, network technologies, understand how networks operate, understand what software is automating and how to analyze the subject material.",
      image: "/cnd.png",
    },
    {
      title: "EC-Council Certified Incident Handler (ECIH)",
      issuer: "EC-Council",
      date: "2024 - 2027",
      description: "Create incident handling and response policies and deal with various types of computer security incidents such as network security incidents, malicious code incidents, and insider attack threats.",
      image: "/ecih.png"
    },
    {
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco",
      date: "2023",
      description: "The earner has a foundation in switching operations, wired and wireless LAN configuration using security best practices, redundancy protocols, and developed problem-solving skills.",
      image: "/srwe.png"
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      date: "2023",
      description: "Earner has knowledge of networking including IP addressing, how physical, data link protocols support Ethernet, can configure connectivity between switches, routers and end devices to provide access to local and remote resources.",
      image: "/itn.png"
    }
  ];

  const skills = [
    { name: "Next.js", level: 85 },
    { name: "Express.js", level: 85 },
    { name: "Linux", level: 88 },
    { name: "Database Management", level: 90 },
    { name: "IT Security", level: 70 }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation dengan animasi */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold tracking-tight transition-all duration-500">
              Portfolio
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {['Home', 'About', 'Projects', 'Certificates', 'Skills', 'Contact'].map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-white bg-white/10' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/10">
              {['Home', 'About', 'Projects', 'Certificates', 'Skills', 'Contact'].map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-white bg-white/10' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section dengan animasi */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-50 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-50 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600 rounded-full blur-3xl opacity-50 animate-float-slow"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-on-scroll">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 animate-fade-in">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-light">
                MF
              </div>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-extralight mb-8 tracking-tight animate-fade-in">
            Hi, I&apos;m <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Muhammad Farhan Al Hussein</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-gray-400 font-light animate-fade-in">
            Computer Engineer
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30"
            >
              <span className="flex items-center justify-center">
                View My Work
                <ExternalLink size={18} className="ml-2" />
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/20 border border-white/20 hover:scale-105"
            >
              <span className="flex items-center justify-center">
                Get in Touch
                <Mail size={18} className="ml-2" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" onClick={() => scrollToSection('about')}>
          <div className="flex flex-col items-center text-gray-500 hover:text-white transition-all duration-500">
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center mb-2">
              <div className="w-1 h-3 bg-current rounded-full mt-2"></div>
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </section>

      {/* About Section dengan animasi */}
      <section id="about" className="py-32 bg-gray-950/50 backdrop-blur-xl relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 tracking-tight">
              About Me
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating secure, innovative solutions
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="max-w-4xl animate-on-scroll">
              <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 transition-all duration-500 hover:border-purple-500/30">
                <h3 className="text-3xl font-light mb-8">My Journey</h3>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    I am a Computer Engineering graduate from Diponegoro University with a strong interest in IT Security and Cyber Security. I have a deep understanding of computer networks, network defense, incident handling, and programming especially Java and Javascript.
                  </p>
                  <p>
                    I am enthusiastic about learning and developing skills in cybersecurity, focusing on protecting systems and data from cyber threats. I believe that this technical knowledge will prepare me for a successful career in the IT industry.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-12">
                  {[
                    { name: "IT Security", color: "bg-purple-500" },
                    { name: "Network Engineering", color: "bg-blue-500" },
                    { name: "System Administration", color: "bg-pink-500" },
                    { name: "Web Development", color: "bg-green-500" }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center transition-transform duration-300 hover:translate-x-2">
                      <div className={`w-3 h-3 ${skill.color} rounded-full mr-4`}></div>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section dengan animasi */}
      <section id="projects" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 tracking-tight">
              Featured Work
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A selection of projects that demonstrate my technical expertise
            </p>
          </div>
          
          {/* Project grid dengan animasi */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 animate-on-scroll`}
              >
                <div className="flex-1">
                  <div className="overflow-hidden rounded-2xl transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20">
                    <div className={`aspect-video overflow-hidden rounded-2xl ${project.image.startsWith('/') ? '' : project.fallbackImage || project.image}`}>
                      {project.image.startsWith('/') ? (
                        <StableImage 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${project.fallbackImage || project.image}`}>
                          <ExternalLink size={32} className="text-white/80" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-light leading-tight">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-purple-500 hover:text-white">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6 pt-4">
                    <button className="text-purple-400 flex items-center gap-2 hover:text-purple-300 transition-all duration-300 hover:gap-3">
                      <ExternalLink size={16} />
                      <span>View Project</span>
                    </button>
                    <button className="text-purple-400 flex items-center gap-2 hover:text-purple-300 transition-all duration-300 hover:gap-3">
                      <Github size={16} />
                      <span>Source Code</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section dengan animasi */}
      <section id="certificates" className="py-32 bg-gray-950/50 backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 tracking-tight">
              Certifications
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Professional certifications validating my expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6 transition-all duration-500 hover:border-purple-500/30 hover:translate-y-2 animate-on-scroll"
              >
              <div className="aspect-video mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                {cert.image.startsWith("/") ? (
<div className="w-full h-full flex items-center justify-center p-0">
  <div className="flex justify-center items-center w-105">
    <StableImage 
      src={cert.image}
      alt={cert.title}
      className="max-w-full max-h-full object-contain"
    />
  </div>
</div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Award size={48} className="text-gray-500" />
                  </div>
                )}
              </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">{cert.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span>{cert.issuer}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section dengan animasi */}
      <section id="skills" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 tracking-tight">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Technologies and tools that bring ideas to life
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="animate-on-scroll">
              <h3 className="text-3xl font-light mb-12">Technical Proficiency</h3>
              <div className="space-y-8">
                {skills.map((skill, index) => (
                  <div key={index} className="">
                    <div className="flex justify-between mb-3">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <h3 className="text-3xl font-light mb-12">Tools & Technologies</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { name: 'React', emoji: '⚛️' },
                  { name: 'Next.js', emoji: '🚀' },
                  { name: 'Node.js', emoji: '🟢' },
                  { name: 'MySQL', emoji: '🍃' },
                  { name: 'Linux', emoji: '🐧' },
                  { name: 'Network', emoji: '🌐' },
                  { name: 'IT Security', emoji: '🔒' },
                  { name: 'Cloud', emoji: '☁️' },
                  { name: 'QA Testing', emoji: '🔧' }
                ].map((tool, index) => (
                  <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center transition-all duration-300 hover:border-purple-500/50 hover:scale-105">
                    <div className="text-3xl mb-3">
                      {tool.emoji}
                    </div>
                    <div className="text-sm font-medium">{tool.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section dengan animasi */}
      <section id="contact" className="py-32 bg-gray-950/50 backdrop-blur-xl relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 tracking-tight">
              Let&apos;s Connect
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Ready to collaborate on something amazing?
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="animate-on-scroll">
              <h3 className="text-3xl font-light mb-12">Get in Touch</h3>
              <div className="space-y-8">
                {[
                  { icon: Mail, title: 'Email', info: 'farhan.hussein04@gmail.com', color: 'bg-purple-600' },
                  { icon: Phone, title: 'Phone', info: '+62 821 7520 3156', color: 'bg-blue-600' },
                  { icon: MapPin, title: 'Location', info: 'Lampung, Indonesia', color: 'bg-green-600' }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center transition-all duration-300 hover:translate-x-2">
                    <div className={`w-12 h-12 ${contact.color} rounded-2xl flex items-center justify-center`}>
                      <contact.icon size={20} />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium mb-1">{contact.title}</div>
                      <div className="text-gray-400">{contact.info}</div>
                    </div>
                  </div>
                ))}
              </div>
              
<div className="flex gap-4 mt-12">
  {[
    { 
      icon: Github, 
      color: 'hover:bg-gray-700',
      url: 'https://github.com/farhanhussein' // Ganti dengan URL GitHub Anda
    },
    { 
      icon: Linkedin, 
      color: 'hover:bg-blue-600',
      url: 'https://www.linkedin.com/in/farhanhusseinn/' // Ganti dengan URL LinkedIn Anda
    }
  ].map((social, index) => (
    <a
      key={index}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110`}
    >
      <social.icon size={20} />
    </a>
  ))}
</div>
            </div>
            
            <div className="animate-on-scroll">
              <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 transition-all duration-500 hover:border-purple-500/30">
                <div className="space-y-6">
                  {[
                    { placeholder: 'Full Name', type: 'text' },
                    { placeholder: 'Email Address', type: 'email' },
                    { placeholder: 'Subject', type: 'text' }
                  ].map((input, index) => (
                    <input 
                      key={index}
                      type={input.type}
                      placeholder={input.placeholder}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  ))}
                  <textarea 
                    rows={6} 
                    placeholder="Tell me about your project"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  ></textarea>
                  <button 
                    onClick={() => alert('Message sent! (Demo only)')}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30"
                  >
                    <span className="flex items-center justify-center">
                      Send Message
                      <Mail size={18} className="ml-2" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 relative">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-2xl font-light tracking-tight">
              Portfolio
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 Muhammad Farhan Al Hussein. Crafted with passion.
            </p>
            <div className="flex space-x-8">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* CSS untuk animasi */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .animate-on-scroll.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;