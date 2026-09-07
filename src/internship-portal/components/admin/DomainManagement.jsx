import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Save, 
  X, 
  BookOpen, 
  Users, 
  Image as ImageIcon, 
  Upload, 
  Sparkles,
  DollarSign,
  Tag,
  Star,
  Clock,
  FolderArchive,
  Award,
  Cpu,
  Brain,
  ShieldCheck,
  BarChart3,
  Code2,
  Briefcase,
  Megaphone,
  Smartphone,
  Globe2,
  Check,
  Search,
  Zap,
  Info,
  AlertCircle,
  Laptop,
  Shield
} from 'lucide-react';
import { DOMAIN_CATEGORIES } from '../../data/initialDomains';

export default function DomainManagement() {
  const { domains, addDomain, updateDomain, deleteDomain, showToast } = useApp();
  
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDomain, setEditingDomain] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState('general'); // 'general' | 'media' | 'pricing' | 'skills' | 'perks' | 'syllabus'

  // Curated Preset Tech Images across all 6 categories for 1-click selection
  const presetImages = [
    // Computer Science & IT
    { category: 'Computer Science & IT', label: 'Full Stack Web Dev', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80' },
    { category: 'Computer Science & IT', label: 'Enterprise Java / Spring', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80' },
    { category: 'Computer Science & IT', label: 'Mobile App / Flutter', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80' },
    { category: 'Computer Science & IT', label: 'Cloud DevOps / Docker', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },

    // Artificial Intelligence & Data
    { category: 'Artificial Intelligence & Data', label: 'AI & Neural Networks', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80' },
    { category: 'Artificial Intelligence & Data', label: 'Data Science & BI', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
    { category: 'Artificial Intelligence & Data', label: 'Deep Learning / Vision', url: 'https://images.unsplash.com/photo-1507146426996-ef0538821a3e?auto=format&fit=crop&w=800&q=80' },

    // Cybersecurity
    { category: 'Cybersecurity', label: 'Ethical Hacking / SOC', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80' },
    { category: 'Cybersecurity', label: 'Cloud Security / Defense', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80' },

    // Electronics, IoT & Embedded
    { category: 'Electronics, IoT & Embedded', label: 'IoT & Microcontrollers', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
    { category: 'Electronics, IoT & Embedded', label: 'Robotics & Hardware', url: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80' },

    // Business & Management
    { category: 'Business & Management', label: 'Product & Strategic Mgmt', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
    { category: 'Business & Management', label: 'Operations & Finance', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },

    // Marketing & Media
    { category: 'Marketing & Media', label: 'Digital Growth & Media', url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?auto=format&fit=crop&w=800&q=80' },
    { category: 'Marketing & Media', label: 'Content & Brand Strategy', url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80' }
  ];

  const default12WeekModules = [
    { week: 1, title: 'Foundations, Development Environment & Core Principles', deliverable: 'Environment setup & foundational milestone report' },
    { week: 2, title: 'Applied Fundamentals & Essential Tooling Architecture', deliverable: 'Functional core module prototype' },
    { week: 3, title: 'Data Structures, Pipelines & Architecture Design', deliverable: 'Data schema and architectural blueprint' },
    { week: 4, title: 'Module Integration & Phase 1 Lab Milestone', deliverable: 'Connected milestone component & test suite' },
    { week: 5, title: 'Advanced Systems, Logic & Asynchronous Processing', deliverable: 'Asynchronous service & logic implementation' },
    { week: 6, title: 'Integration, Middleware & Event Processing', deliverable: 'Integrated subsystem with error handling' },
    { week: 7, title: 'Security Hardening, Optimization & Testing Suite', deliverable: 'Unit & integration test report (>80% coverage)' },
    { week: 8, title: 'Phase 2 Systems Audit & Milestone Deliverable', deliverable: 'Intermediate working system demonstration' },
    { week: 9, title: 'Production Tooling, Containerization & CI/CD Pipelines', deliverable: 'Production build script & container manifest' },
    { week: 10, title: 'Cloud Staging, Telemetry & Performance Tuning', deliverable: 'Cloud staging deployment & benchmark audit' },
    { week: 11, title: 'Enterprise Production Capstone Engineering', deliverable: 'Full production capstone project codebase' },
    { week: 12, title: 'Final Project Defense, Code Audit & LOR Portfolio', deliverable: 'Live demo URL, video defense & verified documentation' }
  ];

  const initialFormState = {
    name: '',
    category: 'Computer Science & IT',
    tagline: '',
    shortDescription: '',
    fullDescription: '',
    duration: '3 Months (Flexible / Remote)',
    badge: 'High Demand',
    icon: 'Code2',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tools: 'Python, React, Docker, Git',
    skills: 'Full Stack Architecture, RESTful API Engineering, Database Design, CI/CD Deployment',
    perks: [
      'Live 1-on-1 Industry Mentorship & Weekly Code Reviews',
      'Verified ISO 9001:2015 & MCA Recognized Internship Certificate',
      'Production Capstone Platform with GitHub Code Defense',
      'Guaranteed Letter of Recommendation (LOR) & Career Referral Assistance',
      '24/7 LMS Milestone Access & Flexible Hours'
    ].join('\n'),
    totalSeats: 100,
    enrolledCount: 0,
    isOpen: true,
    priceMerit: 699,
    priceStandard: 5999,
    discountText: '88% OFF via Aptitude Test',
    rating: 4.9,
    reviewsCount: 120,
    modules: default12WeekModules
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleOpenAdd = (prefilledCategory = null) => {
    setFormState({
      ...initialFormState,
      category: prefilledCategory || (selectedCategoryTab !== 'All' ? selectedCategoryTab : 'Computer Science & IT')
    });
    setModalActiveTab('general');
    setIsAddingNew(true);
    setEditingDomain(null);
  };

  const handleOpenEdit = (dom) => {
    setFormState({
      name: dom.name || '',
      category: dom.category || 'Computer Science & IT',
      tagline: dom.tagline || '',
      shortDescription: dom.shortDescription || '',
      fullDescription: dom.fullDescription || '',
      duration: dom.duration || '3 Months (Flexible / Remote)',
      badge: dom.badge || 'Active Track',
      icon: dom.icon || 'Code2',
      image: dom.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      tools: Array.isArray(dom.tools) ? dom.tools.join(', ') : dom.tools || '',
      skills: Array.isArray(dom.skills) ? dom.skills.join(', ') : dom.skills || '',
      perks: Array.isArray(dom.perks) ? dom.perks.join('\n') : dom.perks || '',
      totalSeats: dom.totalSeats || 100,
      enrolledCount: dom.enrolledCount || 0,
      isOpen: dom.isOpen !== undefined ? dom.isOpen : true,
      priceMerit: dom.price?.merit || 699,
      priceStandard: dom.price?.standard || 5999,
      discountText: dom.price?.discountText || '88% OFF via Aptitude Test',
      rating: dom.rating || 4.9,
      reviewsCount: dom.reviewsCount || 120,
      modules: Array.isArray(dom.modules) && dom.modules.length > 0 ? dom.modules : default12WeekModules
    });
    setModalActiveTab('general');
    setEditingDomain(dom);
    setIsAddingNew(false);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image size exceeds 10MB limit.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const rawDataUrl = uploadEvent.target.result;
      
      // Auto-optimize uploaded image using Canvas to ensure compact storage and fast rendering
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1000;
        const maxHeight = 625;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.86);
        setFormState(prev => ({
          ...prev,
          image: optimizedDataUrl
        }));
        showToast('Local image uploaded and optimized successfully!', 'success');
      };
      img.onerror = () => {
        setFormState(prev => ({
          ...prev,
          image: rawDataUrl
        }));
        showToast('Image uploaded successfully!', 'success');
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleModuleChange = (index, field, value) => {
    setFormState(prev => {
      const updatedModules = [...prev.modules];
      updatedModules[index] = {
        ...updatedModules[index],
        [field]: value
      };
      return { ...prev, modules: updatedModules };
    });
  };

  const handleAddModuleWeek = () => {
    setFormState(prev => {
      const nextWeekNum = (prev.modules?.length || 0) + 1;
      const newModule = {
        week: nextWeekNum,
        title: `Week ${nextWeekNum} Advanced Technical Milestone`,
        deliverable: `Milestone ${nextWeekNum} project submission`
      };
      return {
        ...prev,
        modules: [...(prev.modules || []), newModule]
      };
    });
  };

  const handleRemoveModuleWeek = (index) => {
    setFormState(prev => {
      const updated = prev.modules.filter((_, i) => i !== index).map((m, idx) => ({
        ...m,
        week: idx + 1
      }));
      return { ...prev, modules: updated };
    });
  };

  const handleLoadDefaultTemplate = () => {
    setFormState(prev => ({
      ...prev,
      modules: default12WeekModules
    }));
    showToast('Loaded 12-week curriculum template!', 'info');
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formState.name.trim()) {
      showToast('Please enter a domain track name.', 'warning');
      return;
    }

    const toolsArray = typeof formState.tools === 'string'
      ? formState.tools.split(',').map(t => t.trim()).filter(Boolean)
      : formState.tools;

    const skillsArray = typeof formState.skills === 'string'
      ? formState.skills.split(',').map(s => s.trim()).filter(Boolean)
      : formState.skills;

    const perksArray = typeof formState.perks === 'string'
      ? formState.perks.split('\n').map(p => p.trim()).filter(Boolean)
      : formState.perks;

    const payload = {
      name: formState.name.trim(),
      category: formState.category || 'Computer Science & IT',
      tagline: formState.tagline.trim(),
      shortDescription: formState.shortDescription.trim(),
      fullDescription: formState.fullDescription.trim() || formState.shortDescription.trim(),
      duration: formState.duration.trim() || '3 Months (Flexible / Remote)',
      badge: formState.badge.trim() || 'Active Track',
      icon: formState.icon || 'Code2',
      image: formState.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      tools: toolsArray,
      skills: skillsArray,
      perks: perksArray,
      totalSeats: Number(formState.totalSeats) || 100,
      enrolledCount: Number(formState.enrolledCount) || 0,
      isOpen: Boolean(formState.isOpen),
      price: {
        merit: Number(formState.priceMerit) || 699,
        standard: Number(formState.priceStandard) || 5999,
        discountText: formState.discountText || '88% OFF via Aptitude Test'
      },
      rating: Number(formState.rating) || 4.9,
      reviewsCount: Number(formState.reviewsCount) || 120,
      modules: formState.modules || []
    };

    if (editingDomain) {
      updateDomain(editingDomain.id, payload);
      setEditingDomain(null);
    } else {
      addDomain(payload);
      setIsAddingNew(false);
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: domains.length };
    DOMAIN_CATEGORIES.forEach(cat => {
      counts[cat] = domains.filter(d => d.category === cat).length;
    });
    return counts;
  }, [domains]);

  // Filtered domains by tab and search
  const filteredDomains = useMemo(() => {
    return domains.filter(dom => {
      const matchesCategory = selectedCategoryTab === 'All' || dom.category === selectedCategoryTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        dom.name.toLowerCase().includes(q) || 
        (dom.tagline && dom.tagline.toLowerCase().includes(q)) ||
        (dom.shortDescription && dom.shortDescription.toLowerCase().includes(q)) ||
        (dom.tools && Array.isArray(dom.tools) && dom.tools.some(t => t.toLowerCase().includes(q)));
      
      return matchesCategory && matchesSearch;
    });
  }, [domains, selectedCategoryTab, searchQuery]);

  return (
    <div>
      {/* Top Header Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid var(--border-light)',
        padding: '2rem 2.25rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Layers size={14} /> Domain Architecture & Tracks
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
            Internship Domain Management
          </h2>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Configure tracks, 6 official categories, cover images, 12-week syllabus roadmaps, and enrollment capacity
          </div>
        </div>

        <button 
          onClick={() => handleOpenAdd()} 
          className="btn btn-primary" 
          style={{ borderRadius: '12px', padding: '0.75rem 1.4rem', boxShadow: '0 4px 14px var(--electric-blue-glow)' }}
        >
          <Plus size={18} /> Add New Domain Track
        </button>
      </div>

      {/* 6 Category Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '1.5rem'
      }}>
        <button
          type="button"
          onClick={() => setSelectedCategoryTab('All')}
          style={{
            padding: '0.5rem 1.1rem',
            borderRadius: '9999px',
            border: selectedCategoryTab === 'All' ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
            backgroundColor: selectedCategoryTab === 'All' ? 'var(--electric-blue)' : '#FFFFFF',
            color: selectedCategoryTab === 'All' ? '#FFFFFF' : 'var(--primary-navy)',
            fontSize: '0.85rem',
            fontWeight: selectedCategoryTab === 'All' ? 700 : 600,
            cursor: 'pointer',
            boxShadow: selectedCategoryTab === 'All' ? '0 4px 12px rgba(30, 99, 214, 0.25)' : 'none',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <Sparkles size={14} />
          <span>All Categories ({categoryCounts['All'] || 0})</span>
        </button>

        {DOMAIN_CATEGORIES.map((cat) => {
          const isActive = selectedCategoryTab === cat;
          const count = categoryCounts[cat] || 0;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategoryTab(cat)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                border: isActive ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                backgroundColor: isActive ? 'var(--electric-blue)' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : 'var(--primary-navy)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 600,
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 12px rgba(30, 99, 214, 0.25)' : 'none',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              {cat === 'Computer Science & IT' && <Laptop size={14} />}
              {cat === 'Artificial Intelligence & Data' && <Brain size={14} />}
              {cat === 'Cybersecurity' && <Shield size={14} />}
              {cat === 'Electronics, IoT & Embedded' && <Cpu size={14} />}
              {cat === 'Business & Management' && <Briefcase size={14} />}
              {cat === 'Marketing & Media' && <Megaphone size={14} />}
              <span>{cat} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search & Stats Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search domains by title, tools, keywords..."
            className="form-input"
            style={{ paddingLeft: '2.4rem', borderRadius: '10px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredDomains.length}</strong> of <strong>{domains.length}</strong> domain tracks
        </div>
      </div>

      {/* Empty State when no domains in category */}
      {filteredDomains.length === 0 && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1.5px dashed var(--border-light)',
          padding: '4rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: 'var(--badge-blue-bg)',
            color: 'var(--electric-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Layers size={32} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', fontWeight: 800, marginBottom: '0.4rem' }}>
            No Domain Tracks in {selectedCategoryTab === 'All' ? 'Database' : `"${selectedCategoryTab}"`} Yet
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
            You can create and configure new internships under this category with full 12-week syllabus, tools, cover images, and capacity limits.
          </p>
          <button
            type="button"
            onClick={() => handleOpenAdd(selectedCategoryTab !== 'All' ? selectedCategoryTab : null)}
            className="btn btn-primary"
            style={{ borderRadius: '10px' }}
          >
            <Plus size={16} /> Add First Domain in {selectedCategoryTab === 'All' ? 'System' : selectedCategoryTab}
          </button>
        </div>
      )}

      {/* Domain Cards Grid - Standard 3 columns per row strictly */}
      <div className="domain-admin-grid">
        {filteredDomains.map((dom) => {
          const moduleCount = dom.modules?.length || 12;
          return (
            <div
              key={dom.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Domain Cover Image Header */}
              <div style={{ position: 'relative', height: '150px', width: '100%', backgroundColor: '#0B1E3D', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={dom.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'}
                  alt={dom.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.88)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(11,30,61,0.15) 0%, rgba(11,30,61,0.75) 100%)'
                }} />

                {/* Top Badges */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 2
                }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.72rem', backgroundColor: 'rgba(255,255,255,0.95)', color: 'var(--primary-navy)', fontWeight: 700 }}>
                    {dom.badge || 'Active Track'}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(11,30,61,0.85)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontWeight: 600
                  }}>
                    {dom.duration ? dom.duration.split('(')[0].trim() : '3 Months'}
                  </span>
                </div>

                {/* Bottom Category Tag on Image */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  zIndex: 2
                }}>
                  <span style={{
                    backgroundColor: 'rgba(30, 99, 214, 0.95)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                  }}>
                    {dom.category || 'Computer Science & IT'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ marginBottom: '0.4rem', minHeight: '3.6rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', fontWeight: 800, lineHeight: 1.25, margin: 0 }}>
                    {dom.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--electric-blue)', fontWeight: 600, marginTop: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={dom.tagline}>
                    {dom.tagline}
                  </div>
                </div>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.5,
                  margin: '0.4rem 0 1rem 0',
                  minHeight: '3.8rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {dom.shortDescription}
                </p>

                {/* Tools Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.15rem', minHeight: '1.8rem', alignItems: 'center' }}>
                  {dom.tools && (
                    <>
                      {(Array.isArray(dom.tools) ? dom.tools : []).slice(0, 3).map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.72rem', backgroundColor: 'var(--bg-subtle)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', color: 'var(--primary-navy)', fontWeight: 600 }}>
                          {t}
                        </span>
                      ))}
                      {(Array.isArray(dom.tools) ? dom.tools.length : 0) > 3 && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.2rem 0.35rem' }}>
                          +{dom.tools.length - 3} more
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Stats Row */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  padding: '0.6rem 0.8rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-light)'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Merit Fee: </span>
                    <strong style={{ color: 'var(--electric-blue)' }}>₹{dom.price?.merit || 699}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Seats: </span>
                    <strong style={{ color: 'var(--primary-navy)' }}>{dom.enrolledCount || 0}/{dom.totalSeats || 100}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Syllabus: </span>
                    <strong style={{ color: '#059669' }}>{moduleCount} Wks</strong>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div style={{
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span className={`badge ${dom.isOpen !== false ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                    {dom.isOpen !== false ? 'Open for Enrollment' : 'Closed'}
                  </span>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleOpenEdit(dom)}
                      className="btn btn-outline-blue btn-sm"
                      style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', gap: '0.35rem' }}
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${dom.name}"?`)) {
                          deleteDomain(dom.id);
                        }
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '0.4rem 0.6rem', borderRadius: '8px' }}
                      title="Delete Domain Track"
                    >
                      <Trash2 size={14} color="#DC2626" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Add / Edit Domain Modal with All Sections */}
      {(isAddingNew || editingDomain) && (
        <div className="modal-backdrop" onClick={() => { setIsAddingNew(false); setEditingDomain(null); }}>
          <div className="modal-content" style={{ maxWidth: '820px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="modal-header" style={{ backgroundColor: 'var(--primary-navy)', color: '#FFFFFF', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Layers size={22} color="#38BDF8" />
                <div>
                  <h3 className="modal-title" style={{ color: '#FFFFFF', fontSize: '1.2rem' }}>
                    {editingDomain ? `Edit Domain Track: ${editingDomain.name}` : 'Create New Internship Domain Track'}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.15rem' }}>
                    Configure identity, category, media, pricing, skills, perks & 12-week syllabus roadmap
                  </div>
                </div>
              </div>
              <button className="modal-close" onClick={() => { setIsAddingNew(false); setEditingDomain(null); }} style={{ color: '#94A3B8' }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Section Navigation Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-light)',
              backgroundColor: '#F8FAFC',
              overflowX: 'auto',
              flexShrink: 0,
              padding: '0 1rem'
            }}>
              {[
                { id: 'general', label: '1. General & Category' },
                { id: 'media', label: '2. Media & Presets' },
                { id: 'pricing', label: '3. Pricing & Seats' },
                { id: 'skills', label: '4. Tools & Skills' },
                { id: 'perks', label: '5. Perks & Highlights' },
                { id: 'syllabus', label: `6. 12-Week Syllabus (${formState.modules?.length || 12})` }
              ].map((tab) => {
                const isActive = modalActiveTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setModalActiveTab(tab.id)}
                    style={{
                      padding: '0.85rem 1rem',
                      border: 'none',
                      borderBottom: isActive ? '2.5px solid var(--electric-blue)' : '2.5px solid transparent',
                      backgroundColor: 'transparent',
                      color: isActive ? 'var(--electric-blue)' : 'var(--text-muted)',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 700 : 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Body with Scrollable Area */}
            <div className="modal-body" style={{ padding: '1.75rem 2rem', overflowY: 'auto', flex: 1 }}>
              <form id="domain-edit-form" onSubmit={handleSave}>
                
                {/* SECTION 1: GENERAL & CATEGORY */}
                {modalActiveTab === 'general' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Domain Track Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. AI & Machine Learning, Cloud DevOps, Embedded IoT..."
                          className="form-input"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Category *</label>
                        <select
                          required
                          className="form-input"
                          value={formState.category}
                          onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                          style={{ cursor: 'pointer', fontWeight: 600 }}
                        >
                          {DOMAIN_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Tagline (One-line Hook) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Build Intelligent LLM Agents, Neural Networks & Computer Vision Models"
                        className="form-input"
                        value={formState.tagline}
                        onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Badge Tag</label>
                        <input
                          type="text"
                          placeholder="e.g. High Demand, Popular, Critical Need, Enterprise Core..."
                          className="form-input"
                          value={formState.badge}
                          onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 3 Months (Flexible / Remote)"
                          className="form-input"
                          value={formState.duration}
                          onChange={(e) => setFormState({ ...formState, duration: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Short Summary (Shown on Explorer Cards) *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Brief overview summary explaining what students learn..."
                        className="form-textarea"
                        value={formState.shortDescription}
                        onChange={(e) => setFormState({ ...formState, shortDescription: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Full In-Depth Curriculum Description</label>
                      <textarea
                        rows={4}
                        placeholder="Detailed technical description for syllabus view and domain details..."
                        className="form-textarea"
                        value={formState.fullDescription}
                        onChange={(e) => setFormState({ ...formState, fullDescription: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* SECTION 2: MEDIA & PRESETS */}
                {modalActiveTab === 'media' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{
                      backgroundColor: 'var(--bg-subtle)',
                      padding: '1.5rem',
                      borderRadius: '14px',
                      border: '1px solid var(--border-light)'
                    }}>
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                        <ImageIcon size={16} color="var(--electric-blue)" />
                        Domain Display Cover Image *
                      </label>

                      {/* Live Image Preview & URL */}
                      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <div style={{
                          width: '140px',
                          height: '90px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          backgroundColor: '#0B1E3D',
                          border: '2px solid var(--border-light)',
                          flexShrink: 0,
                          position: 'relative'
                        }}>
                          <img
                            src={formState.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'}
                            alt="Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>

                        <div style={{ flex: 1 }}>
                          <input
                            type="text"
                            placeholder="Paste image web address (https://... or data:...)"
                            className="form-input"
                            value={formState.image}
                            onChange={(e) => setFormState({ ...formState, image: e.target.value.trim() })}
                          />
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.3rem' }}>
                            <span>Supports direct URLs, Unsplash links, or local uploads.</span>
                            {formState.image && (
                              <button
                                type="button"
                                onClick={() => setFormState({ ...formState, image: '' })}
                                style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.74rem', cursor: 'pointer', padding: 0, fontWeight: 600 }}
                              >
                                Clear Image
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Upload Button */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                        <label className="btn btn-outline-blue btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                          <Upload size={14} /> Upload Custom Local Image File (Auto-Optimized)
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageFileUpload}
                          />
                        </label>
                      </div>

                      {/* Curated Presets for Current Category */}
                      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                          <Zap size={14} color="var(--electric-blue)" /> 1-Click Curated Presets for "{formState.category}":
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {presetImages.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setFormState({ ...formState, image: preset.url })}
                              style={{
                                fontSize: '0.74rem',
                                padding: '0.3rem 0.65rem',
                                borderRadius: '8px',
                                border: formState.image === preset.url ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                                backgroundColor: formState.image === preset.url ? 'var(--badge-blue-bg)' : '#FFFFFF',
                                color: formState.image === preset.url ? 'var(--electric-blue)' : 'var(--text-primary)',
                                cursor: 'pointer',
                                fontWeight: formState.image === preset.url ? 700 : 500
                              }}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Icon Selection */}
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Theme Icon</label>
                      <select
                        className="form-input"
                        value={formState.icon}
                        onChange={(e) => setFormState({ ...formState, icon: e.target.value })}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="Brain">Brain (AI & ML, Neural Nets)</option>
                        <option value="BarChart3">BarChart3 (Data Science, Analytics)</option>
                        <option value="ShieldCheck">ShieldCheck (Cybersecurity, Defense)</option>
                        <option value="Code2">Code2 (Python, Software Eng)</option>
                        <option value="Layers">Layers (Java, Enterprise Arch)</option>
                        <option value="Smartphone">Smartphone (Mobile App Dev)</option>
                        <option value="Cpu">Cpu (IoT, Embedded Systems, Hardware)</option>
                        <option value="Briefcase">Briefcase (Business & Management)</option>
                        <option value="Megaphone">Megaphone (Marketing & Media)</option>
                        <option value="Globe2">Globe2 (Cloud & Distributed Systems)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* SECTION 3: PRICING & SEATS */}
                {modalActiveTab === 'pricing' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{
                      backgroundColor: 'var(--bg-subtle)',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '0.95rem' }}>
                          Admissions & Enrollment Status
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Allow new candidates to register and take aptitude tests for this track
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormState({ ...formState, isOpen: !formState.isOpen })}
                        className={`btn btn-sm ${formState.isOpen ? 'btn-primary' : 'btn-outline'}`}
                        style={{ borderRadius: '8px' }}
                      >
                        {formState.isOpen ? 'Open for Enrollment' : 'Closed / Waitlist'}
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Total Seat Capacity</label>
                        <input
                          type="number"
                          min="1"
                          className="form-input"
                          value={formState.totalSeats}
                          onChange={(e) => setFormState({ ...formState, totalSeats: e.target.value })}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Current Enrolled Interns</label>
                        <input
                          type="number"
                          min="0"
                          className="form-input"
                          value={formState.enrolledCount}
                          onChange={(e) => setFormState({ ...formState, enrolledCount: e.target.value })}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Aptitude Merit Fee Tier (₹)</label>
                        <input
                          type="number"
                          className="form-input"
                          value={formState.priceMerit}
                          onChange={(e) => setFormState({ ...formState, priceMerit: e.target.value })}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Standard Fee Tier (₹)</label>
                        <input
                          type="number"
                          className="form-input"
                          value={formState.priceStandard}
                          onChange={(e) => setFormState({ ...formState, priceStandard: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Discount & Subsidy Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. 88% OFF via Aptitude Test"
                        className="form-input"
                        value={formState.discountText}
                        onChange={(e) => setFormState({ ...formState, discountText: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Average Placement Rating (Out of 5.0)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          className="form-input"
                          value={formState.rating}
                          onChange={(e) => setFormState({ ...formState, rating: e.target.value })}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Alumni Reviews Count</label>
                        <input
                          type="number"
                          min="1"
                          className="form-input"
                          value={formState.reviewsCount}
                          onChange={(e) => setFormState({ ...formState, reviewsCount: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 4: TOOLS & SKILLS */}
                {modalActiveTab === 'skills' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Tools & Frameworks (Comma-Separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Python, PyTorch, LangChain, FastAPI, Docker, PostgreSQL..."
                        className="form-input"
                        value={formState.tools}
                        onChange={(e) => setFormState({ ...formState, tools: e.target.value })}
                      />
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                        Displayed as tech chips on landing cards and exploration views.
                      </div>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Core Technical Skills (Comma-Separated)</label>
                      <textarea
                        rows={4}
                        placeholder="e.g. Deep Neural Networks, Natural Language Processing, Model Serving, Vector Databases, RESTful Microservices..."
                        className="form-textarea"
                        value={formState.skills}
                        onChange={(e) => setFormState({ ...formState, skills: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* SECTION 5: PERKS & HIGHLIGHTS */}
                {modalActiveTab === 'perks' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Program Perks & Verified Deliverables (One per line)</label>
                      <textarea
                        rows={7}
                        placeholder="Enter each perk on a new line (e.g. Live 1-on-1 Industry Mentorship...)"
                        className="form-textarea"
                        value={formState.perks}
                        onChange={(e) => setFormState({ ...formState, perks: e.target.value })}
                      />
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                        Displayed as checkmark highlight points in the domain syllabus popup.
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 6: 12-WEEK SYLLABUS ROADMAP */}
                {modalActiveTab === 'syllabus' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
                          12-Week Milestone Roadmap ({formState.modules?.length || 0} Weeks)
                        </h4>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Milestones for Month 1 (W1–4), Month 2 (W5–8), and Month 3 (W9–12)
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={handleLoadDefaultTemplate}
                          className="btn btn-outline btn-sm"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          <Zap size={13} /> Reset to 12-Week Template
                        </button>
                        <button
                          type="button"
                          onClick={handleAddModuleWeek}
                          className="btn btn-primary btn-sm"
                        >
                          <Plus size={14} /> Add Week
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '380px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                      {(formState.modules || []).map((mod, mIdx) => {
                        const monthNum = mod.week <= 4 ? 1 : mod.week <= 8 ? 2 : 3;
                        return (
                          <div
                            key={mIdx}
                            style={{
                              backgroundColor: 'var(--bg-subtle)',
                              borderRadius: '10px',
                              padding: '0.85rem 1rem',
                              border: '1px solid var(--border-light)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--electric-blue)', textTransform: 'uppercase' }}>
                                Month {monthNum} · Week {mod.week}
                              </span>
                              {(formState.modules?.length || 0) > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveModuleWeek(mIdx)}
                                  className="btn btn-ghost btn-sm"
                                  style={{ padding: '0.15rem 0.4rem', color: '#DC2626' }}
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>

                            <input
                              type="text"
                              required
                              placeholder="Week Topic / Module Title"
                              className="form-input"
                              style={{ padding: '0.45rem 0.75rem', fontSize: '0.84rem' }}
                              value={mod.title}
                              onChange={(e) => handleModuleChange(mIdx, 'title', e.target.value)}
                            />

                            <input
                              type="text"
                              required
                              placeholder="Expected Output / Required Deliverable"
                              className="form-input"
                              style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                              value={mod.deliverable}
                              onChange={(e) => handleModuleChange(mIdx, 'deliverable', e.target.value)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Modal Footer with Actions */}
            <div className="modal-footer" style={{ flexShrink: 0, padding: '1rem 2rem' }}>
              <button
                type="button"
                onClick={() => { setIsAddingNew(false); setEditingDomain(null); }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="domain-edit-form"
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.4rem' }}
              >
                <Save size={16} /> {editingDomain ? 'Save Domain Track' : 'Create Domain Track'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
