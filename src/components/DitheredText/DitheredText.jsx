import React, { useEffect, useRef, useState } from 'react';
import './DitheredText.css';

const DitheredText = ({
  text,
  fontSize = 64,
  dotSize = 2,
  dotSpacing = 5,
  color = '#ffffe3'
}) => {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const dotsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set up canvas size
    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Generate dots based on text
      generateDots();
      if (isHovered) {
        draw();
      }
    };

    const generateDots = () => {
      // Clear previous dots
      dotsRef.current = [];

      // Create temporary canvas to render text
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');

      // Set temp canvas size
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Configure text rendering - LED matrix style
      tempCtx.font = `500 ${fontSize}px Satoshi, sans-serif`;
      tempCtx.fillStyle = 'white';
      tempCtx.textBaseline = 'middle';
      tempCtx.textAlign = 'center';
      tempCtx.letterSpacing = '0.1em';

      // Draw text in center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      tempCtx.fillText(text, centerX, centerY);

      // Get pixel data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels = imageData.data;

      // Sample pixels and create dots
      for (let y = 0; y < tempCanvas.height; y += dotSpacing) {
        for (let x = 0; x < tempCanvas.width; x += dotSpacing) {
          const index = (Math.floor(y) * tempCanvas.width + Math.floor(x)) * 4;
          const alpha = pixels[index + 3];

          // If pixel is opaque enough, create a dot
          if (alpha > 128) {
            dotsRef.current.push({
              x: x,
              y: y
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each dot
      ctx.fillStyle = color;
      dotsRef.current.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    setupCanvas();

    // Handle window resize
    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [text, fontSize, dotSize, dotSpacing, color, isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const animationDuration = 500; // ms

    const animate = (timestamp) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (dotsRef.current.length === 0) return;

      ctx.fillStyle = color;

      dotsRef.current.forEach((dot, index) => {
        // Stagger animation: each dot starts slightly after the previous one
        const staggerDelay = (index / dotsRef.current.length) * 0.4;
        const dotProgress = Math.max(0, Math.min(1, (progress - staggerDelay) / 0.6));

        // Ease out cubic
        const eased = 1 - Math.pow(1 - dotProgress, 3);

        if (isHovered) {
          // Animate in: dots grow and fade in
          const currentSize = dotSize * eased;
          ctx.globalAlpha = eased;

          if (currentSize > 0.1) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, currentSize, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Animate out: dots shrink and fade out
          const reverseProgress = 1 - dotProgress;
          const currentSize = dotSize * reverseProgress;
          ctx.globalAlpha = reverseProgress;

          if (currentSize > 0.1) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, currentSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      ctx.globalAlpha = 1;

      // Continue animating until complete
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Reset and start animation
    startTimeRef.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, color, dotSize]);

  return (
    <div
      className="dithered-text-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span ref={textRef} className={`dithered-text-normal ${isHovered ? 'hidden' : ''}`}>
        {text}
      </span>
      <canvas
        ref={canvasRef}
        className={`dithered-text-canvas ${isHovered ? 'visible' : ''}`}
      />
    </div>
  );
};

export default DitheredText;
