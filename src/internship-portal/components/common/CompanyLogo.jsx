import React, { useState } from 'react';

// Built-in crisp SVG marks for top tech companies as immediate or fallback renders
export function CompanySvgMark({ shortName, name, size = 32 }) {
  const norm = (shortName || name || '').toLowerCase();

  if (norm.includes('micro') || norm.includes('msft')) {
    // Microsoft 4-color grid
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9.5" height="9.5" rx="1.5" fill="#F25022" />
        <rect x="12.5" y="2" width="9.5" height="9.5" rx="1.5" fill="#7FBA00" />
        <rect x="2" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#00A4EF" />
        <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#FFB900" />
      </svg>
    );
  }

  if (norm.includes('amazon') || norm.includes('aws')) {
    // Amazon AWS Smile / Icon
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#232F3E" />
        <path d="M6 13.5C9 16.5 15 16.5 18 13.5" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M16 14.5L18.5 13.5L17.5 11" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (norm.includes('google')) {
    // Google G icon
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"/>
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
      </svg>
    );
  }

  if (norm.includes('ibm')) {
    // IBM Blue bars
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#0530AD" />
        <text x="12" y="16" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">IBM</text>
      </svg>
    );
  }

  if (norm.includes('tcs') || norm.includes('tata')) {
    // TCS Tata icon
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#0A2540" />
        <path d="M7 8H17M12 8V18" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('infosys')) {
    // Infosys brand blue icon
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#007CC3" />
        <text x="12" y="16.5" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fontStyle="italic">inf</text>
      </svg>
    );
  }

  if (norm.includes('wipro')) {
    // Wipro multicolored dots mark
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="3.5" fill="#FF8200" />
        <circle cx="16" cy="8" r="3.5" fill="#78BE20" />
        <circle cx="8" cy="16" r="3.5" fill="#00A3E0" />
        <circle cx="16" cy="16" r="3.5" fill="#8A2BE2" />
      </svg>
    );
  }

  if (norm.includes('accenture')) {
    // Accenture Purple Chevron
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#1E1E1E" />
        <path d="M9 7L15 12L9 17" stroke="#A100FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (norm.includes('cognizant')) {
    // Cognizant Cyan/Blue C
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#0033A0" />
        <path d="M16 8C14.5 6.5 11 6.5 9 8.5C7 10.5 7 13.5 9 15.5C11 17.5 14.5 17.5 16 16" stroke="#00C9FF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('capgemini')) {
    // Capgemini Spade
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#0070AD" />
        <path d="M12 6C9 9 7 12 7 14C7 16 9 17 11 16L10.5 18H13.5L13 16C15 17 17 16 17 14C17 12 15 9 12 6Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes('lti') || norm.includes('mindtree')) {
    // LTIMindtree blue/teal
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#002B49" />
        <path d="M6 15L12 9L18 15" stroke="#FF5C35" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Default clean initials badge
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '8px',
      backgroundColor: 'var(--primary-navy)',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      fontSize: `${Math.round(size * 0.42)}px`
    }}>
      {(shortName || name || 'TC').slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function CompanyLogo({ company, size = 36 }) {
  const [imgError, setImgError] = useState(false);

  if (!company.logo || imgError) {
    return <CompanySvgMark shortName={company.shortName} name={company.name} size={size} />;
  }

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '8px',
      backgroundColor: company.bgColor || '#FFFFFF',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
    }}>
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
