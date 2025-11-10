import React, { useEffect, useRef } from "react";

export default function AuthBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, radius: 150 });
  const touchActive = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(52, 211, 153, 0.9)", // emerald
      "rgba(250, 204, 21, 0.8)", // yellow
      "rgba(163, 230, 53, 0.8)", // lime
      "rgba(255, 255, 255, 0.5)", // blanco
    ];

    // 💫 Más partículas y más velocidad
    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 2,
      dx: (Math.random() - 0.5) * 1.4, // más rápido
      dy: (Math.random() - 0.5) * 1.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + mouse.current.x * 0.2,
        canvas.height / 2 + mouse.current.y * 0.2,
        200,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, "#041318");
      gradient.addColorStop(0.4, "#082129");
      gradient.addColorStop(1, "#0c2f36");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
    };

    const update = () => {
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        // Rebote bordes
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // 🎇 Interacción con mouse o tacto
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.current.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.current.radius - dist) / mouse.current.radius;
          const repulse = 8 * force; // 💥 más fuerza visible
          p.x += Math.cos(angle) * repulse;
          p.y += Math.sin(angle) * repulse;
        }

        // Movimiento continuo tipo “energía”
        p.x += Math.sin(p.y * 0.01) * 0.5;
        p.y += Math.cos(p.x * 0.01) * 0.5;
      });
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };
    animate();

    // 👇 Eventos de interacción
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      mouse.current.x = touch.clientX;
      mouse.current.y = touch.clientY;
    };

    const handleTouchStart = () => {
      touchActive.current = true;
    };

    const handleTouchEnd = () => {
      touchActive.current = false;
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        position: "fixed",
        backgroundColor: "#082129",
      }}
    />
  );
}
