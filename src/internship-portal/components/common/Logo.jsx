import React from 'react';

export default function Logo({ 
  size = 'md', 
  layout = 'default',
  variant = 'default', // 'default' (light backgrounds) or 'light' (dark backgrounds)
  className = '',
  style = {}
}) {
  const isLight = variant === 'light';
  const isHorizontal = layout === 'horizontal';

  const logoHeights = {
    sm: isHorizontal ? 36 : 44,
    md: isHorizontal ? 48 : 58,
    lg: isHorizontal ? 60 : 72,
    xl: isHorizontal ? 76 : 90
  };

  const currentHeight = logoHeights[size] || (isHorizontal ? 48 : 58);

  let logoSrc;
  if (isHorizontal) {
    logoSrc = isLight ? '/avp-logo-horizontal-light.png' : '/avp-logo-horizontal.png';
  } else {
    logoSrc = isLight ? '/logos/white-logo.png' : '/logos/logo.png';
  }

  return (
    <div 
      className={`logo-brand-container ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        userSelect: 'none',
        textDecoration: 'none',
        lineHeight: 1,
        ...style
      }}
    >
      <img
        src={logoSrc}
        alt="AVP FUTURETECH"
        style={{
          height: `${currentHeight}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}
