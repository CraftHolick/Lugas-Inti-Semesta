"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

export interface MapLocation {
  lat: number;
  lng: number;
  label?: string;
  labelOffset?: { x?: number; y?: number };
}

interface MapProps {
  dots?: Array<{
    start: MapLocation;
    end: MapLocation;
  }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
}

export function WorldMap({ 
  dots = [], 
  lineColor = "#0ea5e9",
  showLabels = true,
  labelClassName = "text-sm",
  animationDuration = 2,
  loop = true
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const { theme } = useTheme();
  // Default to dark during SSR/initial hydration when theme is undefined to guarantee matching SVG strings
  const isDark = theme === "dark" || !theme;

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal", countries: ["IDN"] }),
    []
  );

  const VIEW_WIDTH = 800;
  const VIEW_HEIGHT = useMemo(() => {
    return (map.image.width && map.image.height)
      ? 800 * (map.image.height / map.image.width)
      : 400;
  }, [map]);

  const svgMap = useMemo(
    () => map.getSVG({
      radius: 0.22,
      color: isDark ? "#FFFF7F40" : "#00000040",
      shape: "circle",
      backgroundColor: isDark ? "black" : "white",
    }),
    [map, isDark]
  );

  const projectPoint = useMemo(() => {
    return (lat: number, lng: number) => {
      const pin = map.getPin({ lat, lng });
      let rawX = 0;
      let rawY = 0;

      if (pin && typeof pin.x === "number" && typeof pin.y === "number") {
        rawX = pin.x;
        rawY = pin.y;
      } else {
        const reg = map.image.region;
        rawX = ((lng - reg.lng.min) / (reg.lng.max - reg.lng.min)) * map.image.width;
        rawY = ((reg.lat.max - lat) / (reg.lat.max - reg.lat.min)) * map.image.height;
      }

      const x = (rawX / map.image.width) * VIEW_WIDTH;
      const y = (rawY / map.image.height) * VIEW_HEIGHT;
      return { x, y };
    };
  }, [map, VIEW_WIDTH, VIEW_HEIGHT]);

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const dist = Math.hypot(end.x - start.x, end.y - start.y);
    const midY = (start.y + end.y) / 2 - Math.max(15, dist * 0.25);
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const uniqueLocations = useMemo(() => {
    const locMap = new Map<string, { point: { x: number; y: number }; label: string; offset: { x: number; y: number }; idx: number }>();
    
    dots.forEach((dot, idx) => {
      if (dot.start.label) {
        const key = `${dot.start.label}-${Math.round(dot.start.lat * 100)}-${Math.round(dot.start.lng * 100)}`;
        if (!locMap.has(key)) {
          const pt = projectPoint(dot.start.lat, dot.start.lng);
          locMap.set(key, {
            point: pt,
            label: dot.start.label,
            offset: { x: dot.start.labelOffset?.x ?? -50, y: dot.start.labelOffset?.y ?? -22 },
            idx: idx * 2
          });
        }
      }
      if (dot.end.label) {
        const key = `${dot.end.label}-${Math.round(dot.end.lat * 100)}-${Math.round(dot.end.lng * 100)}`;
        if (!locMap.has(key)) {
          const pt = projectPoint(dot.end.lat, dot.end.lng);
          locMap.set(key, {
            point: pt,
            label: dot.end.label,
            offset: { x: dot.end.labelOffset?.x ?? -50, y: dot.end.labelOffset?.y ?? -22 },
            idx: idx * 2 + 1
          });
        }
      }
    });
    return Array.from(locMap.values());
  }, [dots, projectPoint]);

  // Calculate animation timing
  const staggerDelay = 0.3;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 2; // Pause for 2 seconds when all paths are drawn
  const fullCycleDuration = totalAnimationTime + pauseTime;

  return (
    <div 
      className="w-full bg-transparent relative font-sans"
      style={{ aspectRatio: `${map.image.width} / ${map.image.height}` }}
    >
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none object-contain"
        alt="Indonesia map"
        height={map.image.height}
        width={map.image.width}
        draggable={false}
        priority
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          
          // Calculate keyframe times for this specific path
          const startTime = (i * staggerDelay) / fullCycleDuration;
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;
          
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={loop ? {
                  pathLength: [0, 0, 1, 1, 0],
                } : {
                  pathLength: 1
                }}
                transition={loop ? {
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, resetTime, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0,
                } : {
                  duration: animationDuration,
                  delay: i * staggerDelay,
                  ease: "easeInOut",
                }}
              />
              
              {loop && (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: [null, "0%", "100%", "100%", "100%"],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{
                    offsetPath: `path('${createCurvedPath(startPoint, endPoint)}')`,
                  }}
                />
              )}
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          
          return (
            <g key={`points-group-${i}`}>
              {/* Start Point */}
              <g key={`start-${i}`}>
                <motion.g
                  onHoverStart={() => setHoveredLocation(dot.start.label || `Location ${i}`)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <circle
                    cx={startPoint.x}
                    cy={startPoint.y}
                    r="3"
                    fill={lineColor}
                    filter="url(#glow)"
                    className="drop-shadow-lg"
                  />
                  <circle
                    cx={startPoint.x}
                    cy={startPoint.y}
                    r="3"
                    fill={lineColor}
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="3"
                      to="12"
                      dur="2s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </motion.g>
              </g>
              
              {/* End Point */}
              <g key={`end-${i}`}>
                <motion.g
                  onHoverStart={() => setHoveredLocation(dot.end.label || `Destination ${i}`)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <circle
                    cx={endPoint.x}
                    cy={endPoint.y}
                    r="3"
                    fill={lineColor}
                    filter="url(#glow)"
                    className="drop-shadow-lg"
                  />
                  <circle
                    cx={endPoint.x}
                    cy={endPoint.y}
                    r="3"
                    fill={lineColor}
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="3"
                      to="12"
                      dur="2s"
                      begin="0.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      begin="0.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </motion.g>
              </g>
            </g>
          );
        })}

        {/* Deduplicated, Neatly Positioned, Sleek Labels */}
        {showLabels && uniqueLocations.map((loc, i) => (
          <motion.g
            key={`label-${i}-${loc.label}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i + 0.2, duration: 0.4 }}
            className="pointer-events-none select-none"
          >
            <foreignObject
              x={loc.point.x + loc.offset.x}
              y={loc.point.y + loc.offset.y}
              width="100"
              height="24"
              className="overflow-visible"
            >
              <div className="flex items-center justify-center w-full">
                <span className="text-[9px] sm:text-[10px] font-semibold leading-none px-1.5 py-0.5 rounded bg-black/90 dark:bg-black/90 text-white dark:text-cyan-300 border border-cyan-500/40 shadow-[0_2px_6px_rgba(0,0,0,0.8)] whitespace-nowrap backdrop-blur-md">
                  {loc.label}
                </span>
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
      
      {/* Mobile Tooltip */}
      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 text-black dark:text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm sm:hidden border border-gray-200 dark:border-gray-700"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
