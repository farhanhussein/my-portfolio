'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, ChevronDown, Award, Calendar } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  // Custom Image Component to replace <img> and avoid Next.js warning
  type CustomImageProps = {
    src: string;
    alt?: string;
    className?: string;
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    [key: string]: unknown;
  };

  const CustomImage: React.FC<CustomImageProps> = ({ src, alt, className, onError, ...props }) => {
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setImageError(true);
      if (onError) onError(e);
    };

    if (imageError || !src.startsWith('/')) {
      return null;
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img 
        src={src} 
        alt={alt} 
        className={className}
        onError={handleImageError}
        loading="lazy"
        {...props}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Certificates', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-purple-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 bg-gray-800 rounded-lg p-4">
              {['Home', 'About', 'Projects', 'Certificates', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I&apos;m <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Muhammad Farhan Al Hussein</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Computer Engineer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                My Portfolio
              </button>
              <button className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                Contact me
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About me
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Beginner Engineer
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="max-w-4xl">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-2xl">
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">My Journey</h3>
                  <p className="text-gray-300 mb-6">
                    I am a Computer Engineering graduate from Diponegoro University with a strong interest in IT Security or Cyber Security. I have a deep understanding of computer networks, network defense, incident handling, and programming especially Java and Javascript. I am enthusiastic about learning and developing skills in cybersecurity, focusing on protecting systems and data from cyber threats.

I am passionate about learning and developing skills in cybersecurity, focusing on protecting systems and data from cyber threats. I believe that this technical knowledge will prepare me for a successful career in the IT industry. I am eager to engage in projects that allow me to apply this knowledge practically and collaborate with other professionals in the field.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mr-4"></div>
                      <span>IT Security</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                      <span>IT Network</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-pink-500 rounded-full mr-4"></div>
                      <span>System Engineer</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-pink-500 rounded-full mr-4"></div>
                      <span>Web Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Project Saya
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Beberapa project terbaru yang menunjukkan keahlian dan pengalaman saya
            </p>
            <p className="text-sm text-gray-500 mt-2">← Scroll ke samping untuk melihat semua project →</p>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex space-x-6 min-w-max">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl flex-shrink-0 w-80"
                >
                  <div className={`h-48 relative overflow-hidden ${project.image.startsWith('/') ? '' : project.fallbackImage || project.image}`}>
                    {project.image.startsWith('/') ? (
                      <CustomImage 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          if (img.nextSibling && img.nextSibling instanceof HTMLElement) {
                            (img.nextSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full flex items-center justify-center ${project.image.startsWith('/') ? 'hidden' : ''} ${project.fallbackImage || project.image}`}
                    >
                      {/* No imageIcon property in project object */}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="bg-purple-600 text-xs px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                        <ExternalLink size={16} className="mr-1" />
                        Demo
                      </button>
                      <button className="text-gray-400 hover:text-gray-300 transition-colors flex items-center">
                        <Github size={16} className="mr-1" />
                        GitHub
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicator Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {projects.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-gray-600 rounded-full hover:bg-purple-400 transition-colors cursor-pointer"
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Certificates & Certifications
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional certifications that validate my expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="h-80 flex items-center justify-center relative p-4">
                  {cert.image.startsWith("/") ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <CustomImage 
                        src={cert.image}
                        alt={cert.title}
                        className="max-w-full max-h-full object-contain rounded-lg" onError={undefined}                      />
                    </div>
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${cert.image} rounded-lg`}>
                      <Award size={48} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <div className="flex items-center mb-2 text-gray-400">
                    <span className="font-medium">{cert.issuer}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{cert.description}</p>
                  <div className="flex justify-between items-center">
                    <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm">
                      <ExternalLink size={14} className="mr-1" />
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Certifications Badge */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-3">
              <Award size={20} className="mr-2" />
              <span className="font-semibold">4 Professional Certifications</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Teknologi
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Teknologi dan tools yang saya gunakan untuk mewujudkan ide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-8">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-8">Tools & Technologies</h3>
              <div className="grid grid-cols-3 gap-6">
                {['React', 'Next.js', 'Express.js', 'MySQL', 'Kali Linux', 'Cisco Packet Tracer', 'Burpsuite'].map((tool, index) => (
                  <div key={index} className="text-center p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-3xl mb-2">
                      {tool === 'React' && '⚛️'}
                      {tool === 'Next.js' && '🚀'}
                      {tool === 'Express.js' && '🟢'}
                      {tool === 'MySQL' && '🍃'}
                      {tool === 'Kali Linux' && '🐧'}
                      {tool === 'Cisco Packet Tracer' && '🌐'}
                      {tool === 'Burpsuite' && '🔒'}
                    </div>
                    <div className="text-sm">{tool}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let&apos;s Collab
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Siap untuk bekerja sama? Mari diskusikan project Anda dan wujudkan ide menjadi kenyataan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-400">farhan.hussein04@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-400">+62 821 7520 3156</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Lokasi</div>
                    <div className="text-gray-400">Lampung, Indonesia</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Github size={20} />
                </button>
                <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin size={20} />
                </button>
              </div>
            </div>
            
            <div>
              <div className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Nama Anda" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Anda" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <textarea 
                    rows={5} 
                    placeholder="Pesan Anda"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  onClick={() => alert('Form submitted! (Ini hanya demo)')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Kirim Pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Portfolio. Made with ❤️ using Next.js
          </p>
        </div>
      </footer>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom Scrollbar for horizontal scroll */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scroll behavior for project container */
        .overflow-x-auto {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar styling (optional - shows thin scrollbar) */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 2px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 2px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;