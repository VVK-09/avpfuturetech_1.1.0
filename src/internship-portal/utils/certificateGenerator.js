/**
 * Ultra-High-Resolution (3508 x 2480 px - 300 DPI Print Ready A4)
 * Professional Certificate Generator for AVP FutureTech LLP.
 * Designed with rich corporate security graphics and executive signatory footer.
 */
export function generateCertificateCanvas(canvas, internData) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Standard 300 DPI A4 Landscape Resolution (3508 x 2480 pixels)
  const width = 3508;
  const height = 2480;
  canvas.width = width;
  canvas.height = height;

  // 1. Base Canvas Background (Crisp Ivory-White to Cool Slate Radial Gradient)
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    220,
    width / 2,
    height / 2,
    width * 0.75
  );
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.65, '#FAFCFF');
  bgGrad.addColorStop(1, '#F1F5F9');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Guilloché Concentric Security Watermark (Concentric modulated sine waves)
  ctx.save();
  ctx.strokeStyle = 'rgba(30, 99, 214, 0.035)';
  ctx.lineWidth = 2;
  const cx = width / 2;
  const cy = height / 2 + 35;
  for (let radius = 260; radius <= 1320; radius += 52) {
    ctx.beginPath();
    for (let angle = 0; angle <= 360; angle += 2) {
      const rad = (angle * Math.PI) / 180;
      const mod = Math.sin(angle * 8 * (Math.PI / 180)) * 14;
      const x = cx + (radius + mod) * Math.cos(rad);
      const y = cy + (radius + mod) * Math.sin(rad);
      if (angle === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Fine geometric hatch security pattern in outer margins
  ctx.strokeStyle = 'rgba(30, 99, 214, 0.05)';
  ctx.lineWidth = 2;
  for (let i = 150; i < width - 150; i += 48) {
    ctx.beginPath();
    ctx.moveTo(i, 130);
    ctx.lineTo(i + 26, 148);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, height - 148);
    ctx.lineTo(i + 26, height - 130);
    ctx.stroke();
  }
  for (let i = 150; i < height - 150; i += 48) {
    ctx.beginPath();
    ctx.moveTo(130, i);
    ctx.lineTo(148, i + 26);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 148, i);
    ctx.lineTo(width - 130, i + 26);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Multi-Stroke Security Borders
  // Outer Solid Midnight Navy Border
  ctx.strokeStyle = '#0B1E3D';
  ctx.lineWidth = 30;
  ctx.strokeRect(52, 52, width - 104, height - 104);

  // Secondary Gold Hairline Accent
  ctx.strokeStyle = '#C5A059';
  ctx.lineWidth = 4.5;
  ctx.strokeRect(92, 92, width - 184, height - 184);

  // Inset Royal Blue Hairline
  ctx.strokeStyle = '#1E63D6';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(118, 118, width - 236, height - 236);

  // Inset Fine Inner Hairline
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.strokeRect(150, 150, width - 300, height - 300);

  // 4. Ornate Geometric Corner Brackets with Gold Accents & Micro-Diamonds
  const cornerLength = 118;
  const corners = [
    { x: 128, y: 128, dx: 1, dy: 1 },
    { x: width - 128, y: 128, dx: -1, dy: 1 },
    { x: 128, y: height - 128, dx: 1, dy: -1 },
    { x: width - 128, y: height - 128, dx: -1, dy: -1 },
  ];

  corners.forEach(({ x, y, dx, dy }) => {
    // Primary royal blue L-bracket
    ctx.strokeStyle = '#1E63D6';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(x, y + dy * cornerLength);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * cornerLength, y);
    ctx.stroke();

    // Inner gold fine bracket
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(x + dx * 18, y + dy * (cornerLength - 14));
    ctx.lineTo(x + dx * 18, y + dy * 18);
    ctx.lineTo(x + dx * (cornerLength - 14), y + dy * 18);
    ctx.stroke();

    // Tertiary fine bracket
    ctx.strokeStyle = '#1E63D6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + dx * 30, y + dy * (cornerLength - 30));
    ctx.lineTo(x + dx * 30, y + dy * 30);
    ctx.lineTo(x + dx * (cornerLength - 30), y + dy * 30);
    ctx.stroke();

    // Corner micro-diamond
    ctx.fillStyle = '#0B1E3D';
    ctx.beginPath();
    const mx = x + dx * 52;
    const my = y + dy * 52;
    ctx.moveTo(mx, my - 13);
    ctx.lineTo(mx + 13, my);
    ctx.lineTo(mx, my + 13);
    ctx.lineTo(mx - 13, my);
    ctx.closePath();
    ctx.fill();
  });

  // 5. Header Corporate Identity & Official Logo
  ctx.textAlign = 'center';

  // Load & Render Official Cropped AVP FutureTech Logo (Crisp, 300 DPI scaled)
  const logoWidth = 570;
  const logoHeight = 408;
  const logoX = width / 2 - logoWidth / 2;
  const logoY = 154;

  if (typeof window !== 'undefined') {
    const logoImg = new window.Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.src = '/logos/avp_logo_cropped.png';

    if (logoImg.complete && logoImg.naturalWidth > 0) {
      ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
    } else {
      logoImg.onload = () => {
        // Redraw with the newly loaded logo
        generateCertificateCanvas(canvas, internData);
      };

      // Fallback text while loading
      ctx.fillStyle = '#0B1E3D';
      ctx.font = 'bold 70px "Outfit", "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('AVP FUTURETECH LLP', width / 2, 300);
    }
  }

  // Accreditation Pill Subtitle under logo
  const accText = '★ MINISTRY OF CORPORATE AFFAIRS (GOVT. OF INDIA) · ISO 9001:2015 CERTIFIED ★';
  ctx.save();
  ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  const accW = ctx.measureText(accText).width + 80;
  const accH = 58;
  const accX = width / 2 - accW / 2;
  const accY = 584;

  ctx.fillStyle = '#F8FAFC';
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(accX, accY, accW, accH, 29);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(accX, accY, accW, accH);
    ctx.strokeRect(accX, accY, accW, accH);
  }

  ctx.fillStyle = '#64748B';
  ctx.fillText(accText, width / 2, accY + 38);
  ctx.restore();

  // 6. Main Certificate Title with Decorative Flanking Gold Wings
  const titleY = 746;
  ctx.fillStyle = '#0B1E3D';
  ctx.font = '800 96px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('CERTIFICATE OF INTERNSHIP', width / 2, titleY);

  // Left & Right Flanking Gold Accent Wings
  ctx.save();
  ctx.strokeStyle = '#C5A059';
  ctx.lineWidth = 4;
  // Left wing
  ctx.beginPath();
  ctx.moveTo(width / 2 - 746, titleY - 30);
  ctx.lineTo(width / 2 - 960, titleY - 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(width / 2 - 746, titleY - 30, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#C5A059';
  ctx.fill();

  // Right wing
  ctx.beginPath();
  ctx.moveTo(width / 2 + 746, titleY - 30);
  ctx.lineTo(width / 2 + 960, titleY - 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(width / 2 + 746, titleY - 30, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Subtitle
  ctx.fillStyle = '#64748B';
  ctx.font = '600 33px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '9px';
  ctx.fillText('THIS IS PROUDLY PRESENTED TO', width / 2, 866);

  // 7. Recipient Candidate Name
  const candidateName = (internData?.name || 'Diya Patel').toUpperCase();
  ctx.fillStyle = '#0B1E3D';
  ctx.font = '800 105px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText(candidateName, width / 2, 1020);

  // Tapered Line under name with central diamond medallion
  ctx.save();
  const lineGrad = ctx.createLinearGradient(width / 2 - 650, 1075, width / 2 + 650, 1075);
  lineGrad.addColorStop(0, 'rgba(30, 99, 214, 0)');
  lineGrad.addColorStop(0.25, '#1E63D6');
  lineGrad.addColorStop(0.5, '#C5A059');
  lineGrad.addColorStop(0.75, '#1E63D6');
  lineGrad.addColorStop(1, 'rgba(30, 99, 214, 0)');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 5.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 650, 1075);
  ctx.lineTo(width / 2 + 650, 1075);
  ctx.stroke();

  // Center Diamond Medallion
  ctx.fillStyle = '#0B1E3D';
  ctx.beginPath();
  ctx.moveTo(width / 2, 1075 - 13);
  ctx.lineTo(width / 2 + 13, 1075);
  ctx.lineTo(width / 2, 1075 + 13);
  ctx.lineTo(width / 2 - 13, 1075);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#C5A059';
  ctx.lineWidth = 3.5;
  ctx.stroke();
  ctx.restore();

  // 8. Certificate Narrative & Executive Domain Plaque
  ctx.fillStyle = '#475569';
  ctx.font = '500 44px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0px';
  ctx.fillText('for successfully completing the rigorous 3-Month Industry Internship Program in', width / 2, 1188);

  // Executive Specialization Domain Plaque (Midnight Navy & Blue Gradient with Gold Border)
  const domainTitle = internData?.chosenDomainName || 'Artificial Intelligence & Machine Learning';
  ctx.save();
  ctx.font = '800 52px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  const trackWidth = Math.max(1050, ctx.measureText(domainTitle).width + 175);
  const trackHeight = 105;
  const trackX = width / 2 - trackWidth / 2;
  const trackY = 1245;

  // Rich gradient background for domain
  const plaqueGrad = ctx.createLinearGradient(trackX, trackY, trackX + trackWidth, trackY + trackHeight);
  plaqueGrad.addColorStop(0, '#0B1E3D');
  plaqueGrad.addColorStop(0.5, '#1E3A8A');
  plaqueGrad.addColorStop(1, '#0B1E3D');
  ctx.fillStyle = plaqueGrad;
  ctx.strokeStyle = '#C5A059';
  ctx.lineWidth = 4.5;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(trackX, trackY, trackWidth, trackHeight, 26);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(trackX, trackY, trackWidth, trackHeight);
    ctx.strokeRect(trackX, trackY, trackWidth, trackHeight);
  }

  // Domain Text inside plaque
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(domainTitle, width / 2, trackY + 70);
  ctx.restore();

  // Citation Paragraph Lines
  ctx.fillStyle = '#475569';
  ctx.font = '500 42px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('demonstrating exceptional technical competence, hands-on engineering rigor,', width / 2, 1445);
  ctx.fillText('and verified production milestone delivery under the mentorship of AVP FutureTech.', width / 2, 1522);

  // 9. Verification Credential Strip
  const stripY = 1710;
  const issueDateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const credId = internData?.internId || 'INT-2026-AI-1002';
  const stripText = `Credential ID: ${credId}   ·   Issue Date: ${issueDateStr}   ·   Verification: https://internship.avpfuturetech.com/verify`;

  ctx.save();
  ctx.font = '600 29px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  const stripW = ctx.measureText(stripText).width + 105;
  const stripH = 75;
  const stripX = width / 2 - stripW / 2;

  ctx.fillStyle = '#F8FAFC';
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(stripX, stripY, stripW, stripH, 37);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(stripX, stripY, stripW, stripH);
    ctx.strokeRect(stripX, stripY, stripW, stripH);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748B';
  ctx.fillText(stripText, width / 2, stripY + 48);
  ctx.restore();

  // 10. Three Executive Signatures Across Footer (Left, Center, Right)
  const sigY = 2060;
  const signatories = [
    {
      x: 746,
      sigName: 'Avishkar Kamble',
      printedName: 'Avishkar Kamble',
      role: 'Director of Academics & Strategy',
      org: 'AVP FutureTech LLP',
    },
    {
      x: 1754,
      sigName: 'Vaishnav Kubade',
      printedName: 'Vaishnav Kubade',
      role: 'Director of Technology & R&D',
      org: 'AVP FutureTech LLP',
    },
    {
      x: 2762,
      sigName: 'Prathmesh Narvekar',
      printedName: 'Prathmesh Narvekar',
      role: 'Director of Training & Operations',
      org: 'AVP FutureTech LLP',
    },
  ];

  signatories.forEach((sig) => {
    ctx.save();
    ctx.textAlign = 'center';

    // Digital Cursive Signature
    ctx.fillStyle = '#0B1E3D';
    ctx.font = 'italic bold 70px "Brush Script MT", "Caveat", cursive, sans-serif';
    ctx.fillText(sig.sigName, sig.x, sigY - 30);

    // Fine signature underline
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(sig.x - 275, sigY + 14);
    ctx.lineTo(sig.x + 275, sigY + 14);
    ctx.stroke();

    // Printed Name
    ctx.fillStyle = '#0B1E3D';
    ctx.font = 'bold 35px "Outfit", "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(sig.printedName, sig.x, sigY + 66);

    // Executive Functional Role (Without 'Founder')
    ctx.fillStyle = '#475569';
    ctx.font = '600 29px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(sig.role, sig.x, sigY + 110);

    // Organization
    ctx.fillStyle = '#64748B';
    ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(sig.org, sig.x, sigY + 150);

    ctx.restore();
  });
}

export function downloadCertificatePNG(canvas, internName) {
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `AVP_Internship_Certificate_${(internName || 'Student').replace(/\s+/g, '_')}_300DPI.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}
