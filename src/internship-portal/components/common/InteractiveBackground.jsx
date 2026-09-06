import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground({ className = '', style = {} }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Mouse tracker starts inactive and off-screen (No phantom center dot)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      prevX: -1000,
      prevY: -1000,
      radius: 180,
      active: false
    };

    // Click ripples
    let ripples = [];

    // Mouse velocity sparks
    let sparks = [];

    // Handle Resize
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
      initGeometricShapes();
    };

    window.addEventListener('resize', handleResize);

    // Mouse Move
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;

      // Calculate speed for spark trails
      const dist = Math.hypot(mouse.targetX - mouse.prevX, mouse.targetY - mouse.prevY);
      if (dist > 6 && sparks.length < 40) {
        sparks.push({
          x: mouse.targetX + (Math.random() - 0.5) * 12,
          y: mouse.targetY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 1.0,
          color: Math.random() > 0.5 ? 'rgba(30, 99, 214, ' : 'rgba(56, 189, 248, ',
          size: Math.random() * 2 + 1
        });
      }
      mouse.prevX = mouse.targetX;
      mouse.prevY = mouse.targetY;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    // Click Ripple
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      ripples.push({
        x: clickX,
        y: clickY,
        radius: 4,
        maxRadius: 160,
        alpha: 0.4
      });

      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 / 12) * i + Math.random() * 0.2;
        const speed = Math.random() * 2.5 + 1.5;
        sparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          color: 'rgba(30, 99, 214, ',
          size: Math.random() * 2.5 + 1.5
        });
      }
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    parent.addEventListener('click', handleClick);

    // Floating 3D Geometric Tech Elements
    let geoShapes = [];
    function initGeometricShapes() {
      geoShapes = [
        { type: 'cube', x: 0.1, y: 0.28, size: 24, rot: 0, rotSpeed: 0.007, color: 'rgba(30, 99, 214, 0.22)' },
        { type: 'ring', x: 0.9, y: 0.22, size: 28, rot: 0, rotSpeed: -0.006, color: 'rgba(56, 189, 248, 0.25)' },
        { type: 'cross', x: 0.35, y: 0.85, size: 16, rot: 0, rotSpeed: 0.01, color: 'rgba(99, 102, 241, 0.22)' },
        { type: 'diamond', x: 0.65, y: 0.8, size: 20, rot: 0, rotSpeed: -0.008, color: 'rgba(30, 99, 214, 0.2)' },
        { type: 'code', text: '</>', x: 0.18, y: 0.8, size: 15, rot: 0, rotSpeed: 0.004, color: 'rgba(30, 99, 214, 0.3)' },
        { type: 'code', text: '{ }', x: 0.84, y: 0.78, size: 15, rot: 0, rotSpeed: -0.005, color: 'rgba(56, 189, 248, 0.3)' },
        { type: 'code', text: 'AI', x: 0.8, y: 0.4, size: 14, rot: 0, rotSpeed: 0.006, color: 'rgba(99, 102, 241, 0.3)' }
      ];
    }
    initGeometricShapes();

    // 70 Floating Particles
    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 11000), 70);

    function initParticles() {
      particles = [];
      const colors = ['#1E63D6', '#0284C7', '#38BDF8', '#6366F1'];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.35 + 0.2,
          pulse: Math.random() * Math.PI,
          pulseSpeed: Math.random() * 0.025 + 0.012
        });
      }
    }
    initParticles();

    // Render loop
    const render = () => {
      // Smooth lerp mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // 1. Render Click Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 3.2;
        r.alpha *= 0.95;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(30, 99, 214, ${r.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        if (r.alpha < 0.02 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // 2. Render Mouse Sparks / Comet Dust
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.03;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${s.life * 0.5})`;
        ctx.fill();
      }

      // 3. Render 3D Floating Parallax Geometric Shapes
      geoShapes.forEach((shape) => {
        shape.rot += shape.rotSpeed;

        const px = shape.x * width + (mouse.active ? (mouse.x - width / 2) * 0.025 : 0);
        const py = shape.y * height + (mouse.active ? (mouse.y - height / 2) * 0.025 : 0);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(shape.rot);

        if (shape.type === 'cube') {
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = 1.4;
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          ctx.strokeRect(-shape.size / 4, -shape.size / 4, shape.size / 2, shape.size / 2);
        } else if (shape.type === 'ring') {
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (shape.type === 'cross') {
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-shape.size / 2, 0);
          ctx.lineTo(shape.size / 2, 0);
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(0, shape.size / 2);
          ctx.stroke();
        } else if (shape.type === 'diamond') {
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, 0);
          ctx.lineTo(0, shape.size / 2);
          ctx.lineTo(-shape.size / 2, 0);
          ctx.closePath();
          ctx.stroke();
        } else if (shape.type === 'code') {
          ctx.font = `700 ${shape.size}px "Outfit", sans-serif`;
          ctx.fillStyle = shape.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(shape.text, 0, 0);
        }

        ctx.restore();
      });

      // 4. Update & Draw Particles and Inter-Particle Constellation Lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulse += p.pulseSpeed;
        const dynamicAlpha = p.baseAlpha + Math.sin(p.pulse) * 0.12;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Bounds bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Magnetic Reaction to Mouse Cursor (Swirl and drift without drawing center dot)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distToMouse = Math.hypot(dx, dy);

          if (distToMouse < mouse.radius && distToMouse > 5) {
            const force = (1 - distToMouse / mouse.radius);
            p.x += (dx / distToMouse) * force * 1.2;
            p.y += (dy / distToMouse) * force * 1.2;

            // Subtle gentle tangential swirl
            p.x += (-dy / distToMouse) * force * 0.6;
            p.y += (dx / distToMouse) * force * 0.6;
          }
        }

        // Connect lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = 120;

          if (dist < maxDist) {
            const lineFactor = 1 - dist / maxDist;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            const isNearMouse = mouse.active && (Math.hypot(mouse.x - p.x, mouse.y - p.y) < mouse.radius);
            const lineAlpha = lineFactor * (isNearMouse ? 0.32 : 0.14);

            ctx.strokeStyle = isNearMouse ? `rgba(56, 189, 248, ${lineAlpha})` : `rgba(30, 99, 214, ${lineAlpha})`;
            ctx.lineWidth = lineFactor * 1.1;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(dynamicAlpha, 0.85);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`interactive-bg-wrapper ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
