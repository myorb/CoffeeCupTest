"use client";

import { useState } from "react";
import AnnotationFlag from "./AnnotationFlag";
import { AnnotationType, Annotation, constructionOptions } from "./types";

const initialAnnotations: Annotation[] = [
  { x: 438, y: 473, label: "#45", type: 'Damage' },
  { x: 354, y: 900, label: "#46", type: 'Damage' },
  { x: 689, y: 711, label: "#47", type: 'Damage' },
  { x: 795, y: 283, label: "#48", type: 'Incomplete' },
  { x: 563, y: 100, label: "#50", type: 'Observation' },
  { x: 908, y: 114, label: "#55", type: 'Resolved' },
];

export default function Home() {
  const typeOrder = Object.keys(constructionOptions) as AnnotationType[];
  const [annotations, setAnnotations] = useState<Annotation[]>(initialAnnotations);
  const [nextAnnotationLabel, setNextAnnotationLabel] = useState(56);
  const [filters, setFilters] = useState<Record<AnnotationType, boolean>>({
    Damage: true,
    Incomplete: true,
    Observation: true,
    Resolved: true,
    Unconfirmed: true,
  });

  // Cycle through the annotation types
  const cycleType = (current: AnnotationType): AnnotationType => {
    const currentIndex = typeOrder.indexOf(current);
    const nextIndex = (currentIndex + 1) % typeOrder.length;
    return typeOrder[nextIndex];
  };

  const handlePlanClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newAnnotation: Annotation = {
      x: x,
      y: y,
      label: `#${nextAnnotationLabel}`,
      type: 'Unconfirmed',
    };

    setAnnotations([...annotations, newAnnotation]);
    setNextAnnotationLabel(nextAnnotationLabel + 1);
  };

  // Update flag type when a flag is clicked.
  const handleFlagClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent adding a new flag.
    setAnnotations((prev) =>
      prev.map((ann, i) =>
        i === index ? { ...ann, type: cycleType(ann.type) } : ann
      )
    );
  };

  // Toggle individual filter button.
  const toggleFilter = (type: AnnotationType) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Toggle all filters on/off.
  const toggleAllFilters = () => {
    const allOn = Object.values(filters).every(Boolean);
    const newState = {
      Damage: !allOn,
      Incomplete: !allOn,
      Observation: !allOn,
      Resolved: !allOn,
      Unconfirmed: !allOn,
    };
    setFilters(newState);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(filters).map((type) => (
          <button
            key={type}
            onClick={() => toggleFilter(type as AnnotationType)}
            className={`px-4 py-2 rounded text-white font-medium cursor-pointer ${filters[type as AnnotationType] ? "opacity-100" : "opacity-50"
              }`}
            style={{ backgroundColor: constructionOptions[type as AnnotationType] }}
          >
            {type}
          </button>
        ))}
        <button
          onClick={toggleAllFilters}
          className="px-4 py-2 rounded bg-gray-500 text-white font-medium"
        >
          Toggle All
        </button>
      </div>

      <div
        onClick={handlePlanClick}
        className="relative border"
        style={{
          width: "1026px",
          height: "1132px",
          backgroundImage: "url('/construction_blueprint.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        {annotations.map((ann, index) =>
          filters[ann.type] ? (
            <AnnotationFlag
              key={index}
              annotation={{ ...ann, color: constructionOptions[ann.type] }}
              onClick={(e) => handleFlagClick(index, e)} />
          ) : null
        )}
      </div>
    </div>
  );
}
