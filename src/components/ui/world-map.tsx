"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#F5A623",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
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

  const svgMap = useMemo(() => map.getSVG({
    radius: 0.22,
    color: "#FFFFFF40",
    shape: "circle",
    backgroundColor: "#0B0E11",
  }), [map]);

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

  return (
    <div className="w-full aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[2.2/1] bg-navy-950 rounded-lg relative font-sans overflow-hidden">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-contain"
        alt="Indonesia map"
        height={map.image.height}
        width={map.image.width}
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle cx={projectPoint(dot.start.lat, dot.start.lng).x} cy={projectPoint(dot.start.lat, dot.start.lng).y} r="2" fill={lineColor} />
              <circle cx={projectPoint(dot.start.lat, dot.start.lng).x} cy={projectPoint(dot.start.lat, dot.start.lng).y} r="2" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="2" fill={lineColor} />
              <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="2" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
