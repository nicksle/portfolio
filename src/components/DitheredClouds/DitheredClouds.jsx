import React, { useRef, useEffect, useState } from 'react';
import './DitheredClouds.css';

const DitheredClouds = ({
  isHovered = false,
  dotSize = 2,
  dotSpacing = 5,
  color = '#ffffe3',
  layer = 'back' // 'back' or 'front'
}) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const cloudsRef = useRef([]);
  const scrollOffsetRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const CANVAS_MULTIPLIER = 3; // Canvas is 3x wider than viewport
  const SCROLL_SPEED = 80; // pixels per second

  // Generate cloud shapes
  useEffect(() => {
    const generateClouds = () => {
      // Create clouds distributed across the extended canvas width
      // Using viewport width as reference, clouds will be positioned across 3x that width
      return [
        {
          x: 0.1, // Position as fraction of extended canvas (0-1)
          y: 0.7,
          width: 80,
          height: 40,
        },
        {
          x: 0.25,
          y: 0.8,
          width: 100,
          height: 50,
        },
        {
          x: 0.45,
          y: 0.65,
          width: 70,
          height: 35,
        },
        {
          x: 0.6,
          y: 0.75,
          width: 90,
          height: 45,
        },
        {
          x: 0.75,
          y: 0.7,
          width: 85,
          height: 42,
        },
        {
          x: 0.9,
          y: 0.65,
          width: 75,
          height: 38,
        },
      ];
    };

    cloudsRef.current = generateClouds();
  }, []);

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        const viewportWidth = parent.offsetWidth;
        const height = parent.offsetHeight;

        // Canvas is wider than viewport to create scrolling effect
        const canvasWidth = viewportWidth * CANVAS_MULTIPLIER;

        setDimensions({ width: viewportWidth, height, canvasWidth });

        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = height;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate dots for a single cloud
  const generateCloudDots = (cloud, canvasWidth, height) => {
    const dots = [];
    const centerX = cloud.x * canvasWidth;
    const centerY = cloud.y * height;

    // Create cloud shape using overlapping circles (ellipses)
    const circles = [
      { offsetX: 0, offsetY: 0, radiusX: cloud.width * 0.4, radiusY: cloud.height * 0.4 },
      { offsetX: cloud.width * 0.25, offsetY: -cloud.height * 0.1, radiusX: cloud.width * 0.35, radiusY: cloud.height * 0.35 },
      { offsetX: -cloud.width * 0.25, offsetY: -cloud.height * 0.1, radiusX: cloud.width * 0.35, radiusY: cloud.height * 0.35 },
      { offsetX: cloud.width * 0.15, offsetY: cloud.height * 0.15, radiusX: cloud.width * 0.3, radiusY: cloud.height * 0.3 },
      { offsetX: -cloud.width * 0.15, offsetY: cloud.height * 0.15, radiusX: cloud.width * 0.3, radiusY: cloud.height * 0.3 },
    ];

    // Sample dots within the cloud shape
    for (let x = centerX - cloud.width; x < centerX + cloud.width; x += dotSpacing) {
      for (let y = centerY - cloud.height; y < centerY + cloud.height; y += dotSpacing) {
        // Check if point is inside any of the circles
        const isInCloud = circles.some(circle => {
          const dx = (x - (centerX + circle.offsetX)) / circle.radiusX;
          const dy = (y - (centerY + circle.offsetY)) / circle.radiusY;
          return (dx * dx + dy * dy) <= 1;
        });

        if (isInCloud) {
          dots.push({ x, y });
        }
      }
    }

    return dots;
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    let lastTimestamp = null;

    const animate = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
      lastTimestamp = timestamp;

      // Update scroll offset when hovered
      if (isHovered) {
        scrollOffsetRef.current += SCROLL_SPEED * deltaTime;

        // Wrap around when we've scrolled one viewport width
        if (scrollOffsetRef.current >= dimensions.width) {
          scrollOffsetRef.current -= dimensions.width;
        }
      }

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.canvasWidth, dimensions.height);

      // Draw each cloud
      cloudsRef.current.forEach((cloud, cloudIndex) => {
        const dots = generateCloudDots(cloud, dimensions.canvasWidth, dimensions.height);

        dots.forEach((dot) => {
          // Apply scroll offset
          let x = dot.x - scrollOffsetRef.current;

          // Wrap cloud around: draw it again on the right if it's exiting on the left
          // This creates the infinite scroll effect
          const drawPositions = [x];
          if (x < dimensions.width) {
            // Also draw a copy shifted by viewport width to the right
            drawPositions.push(x + dimensions.width);
          }

          drawPositions.forEach(drawX => {
            ctx.fillStyle = color;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(drawX, dot.y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          });
        });
      });

      ctx.globalAlpha = 1;

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, dimensions, dotSize, dotSpacing, color]);

  return (
    <div className={`dithered-clouds dithered-clouds-${layer}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DitheredClouds;
