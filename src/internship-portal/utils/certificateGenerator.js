/**
 * High Resolution Canvas Certificate Generator for AVP FutureTech LLP
 */
export function generateCertificateCanvas(canvas, internData) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // Set dimensions for high-res 16:9 certificate
  const width = 1600;
  const height = 1130;
  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Subtle gradient background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.5, '#F8FAFC');
  bgGrad.addColorStop(1, '#F0F4FA');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Decorative Outer Borders
  ctx.strokeStyle = '#0B1E3D';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.strokeStyle = '#1E63D6';
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Corner Gold/Blue Accents
  const cornerSize = 40;
  ctx.fillStyle = '#1E63D6';
  // Top-Left
  ctx.fillRect(52, 52, cornerSize, 4);
  ctx.fillRect(52, 52, 4, cornerSize);
  // Top-Right
  ctx.fillRect(width - 52 - cornerSize, 52, cornerSize, 4);
  ctx.fillRect(width - 56, 52, 4, cornerSize);
  // Bottom-Left
  ctx.fillRect(52, height - 56, cornerSize, 4);
  ctx.fillRect(52, height - 52 - cornerSize, 4, cornerSize);
  // Bottom-Right
  ctx.fillRect(width - 52 - cornerSize, height - 56, cornerSize, 4);
  ctx.fillRect(width - 56, height - 52 - cornerSize, 4, cornerSize);

  // Header Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0B1E3D';
  ctx.font = 'bold 38px "Outfit", sans-serif';
  ctx.fillText('AVP FUTURE TECH LLP', width / 2, 140);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('LEARN · INNOVATE · TRANSFORM', width / 2, 175);

  // Certificate Heading
  ctx.fillStyle = '#1E63D6';
  ctx.font = 'bold 52px "Outfit", sans-serif';
  ctx.fillText('CERTIFICATE OF INTERNSHIP', width / 2, 260);

  ctx.fillStyle = '#475569';
  ctx.font = 'italic 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('This is proudly presented to', width / 2, 320);

  // Intern Name
  ctx.fillStyle = '#0B1E3D';
  ctx.font = 'bold 48px "Outfit", sans-serif';
  ctx.fillText((internData.name || 'Candidate Name').toUpperCase(), width / 2, 400);

  // Divider Line under name
  ctx.strokeStyle = '#1E63D6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 250, 425);
  ctx.lineTo(width / 2 + 250, 425);
  ctx.stroke();

  // Certificate Body Paragraph
  ctx.fillStyle = '#334155';
  ctx.font = '22px "Plus Jakarta Sans", sans-serif';
  const domainName = internData.chosenDomainName || 'Advanced Technology Track';
  const bodyText1 = `for successfully completing the 3-Month Industry Internship Program in`;
  const bodyText2 = `demonstrating exceptional technical competence, hands-on engineering rigor,`;
  const bodyText3 = `and verified milestone completion under the mentorship of AVP FutureTech.`;

  ctx.fillText(bodyText1, width / 2, 490);
  
  ctx.fillStyle = '#1E63D6';
  ctx.font = 'bold 28px "Outfit", sans-serif';
  ctx.fillText(domainName, width / 2, 545);

  ctx.fillStyle = '#334155';
  ctx.font = '22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(bodyText2, width / 2, 605);
  ctx.fillText(bodyText3, width / 2, 645);

  // Performance Badge / Score info
  if (internData.scoreData) {
    ctx.fillStyle = '#DCEBFF';
    ctx.roundRect ? ctx.roundRect(width / 2 - 220, 690, 440, 48, 24) : ctx.fillRect(width / 2 - 220, 690, 440, 48);
    ctx.fill();
    ctx.fillStyle = '#1E63D6';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Aptitude Score: ${internData.scoreData.percentage}% | Grade: Excellent`, width / 2, 722);
  }

  // Footer Details: Verification ID, Date, Signatures
  // Left: Verification & Issue Date
  ctx.textAlign = 'left';
  ctx.fillStyle = '#64748B';
  ctx.font = '16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Credential ID: ${internData.internId || 'AVP-CERT-2026-992'}`, 140, 920);
  ctx.fillText(`Issue Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 140, 950);
  ctx.fillText(`Verification: https://avpfuturetech.com/verify`, 140, 980);

  // Center: Official Emblem / Seal
  ctx.textAlign = 'center';
  ctx.beginPath();
  ctx.arc(width / 2, 920, 52, 0, Math.PI * 2);
  ctx.fillStyle = '#0B1E3D';
  ctx.fill();
  ctx.strokeStyle = '#1E63D6';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 13px "Outfit", sans-serif';
  ctx.fillText('AVP FUTURETECH', width / 2, 915);
  ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('★ VERIFIED ★', width / 2, 932);

  // Right: Signature
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0B1E3D';
  ctx.font = 'italic bold 26px "Brush Script MT", cursive, sans-serif';
  ctx.fillText('Dr. V. Pradhan', width - 260, 915);

  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width - 380, 935);
  ctx.lineTo(width - 140, 935);
  ctx.stroke();

  ctx.fillStyle = '#0B1E3D';
  ctx.font = 'bold 16px "Outfit", sans-serif';
  ctx.fillText('Managing Director & Head of Academics', width - 260, 960);
  ctx.fillStyle = '#64748B';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('AVP FutureTech LLP', width - 260, 982);
}

export function downloadCertificatePNG(canvas, internName) {
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `AVP_Internship_Certificate_${(internName || 'Student').replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}
