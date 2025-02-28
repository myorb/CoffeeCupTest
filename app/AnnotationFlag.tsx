import React from 'react';
import { Annotation } from './types';

interface AnnotationFlagProps {
  annotation: Annotation & { color: string };
  onClick: (e: React.MouseEvent) => void;
}

const AnnotationFlag = ({ annotation, onClick }: AnnotationFlagProps) => {
  const { x, y, label, type, color } = annotation;
  const triangleSize = 15;

  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer z-10"
      style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(0, -130%)' }}
    >
      <div className="relative">
        <div
          className={`px-4 py-2 text-center font-bold text-[16px] min-w-[70px] min-h-[24px] shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${type === 'Unconfirmed' ? 'text-white' : 'text-black'
            }`}
          style={{
            backgroundColor: `${color}CC`,
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '0px',
          }}
        >
          {label}
        </div>
        <div
          className="absolute left-0"
          style={{
            bottom: `-${triangleSize}px`,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: `${triangleSize}px ${triangleSize}px 0 0`,
            borderColor: `${color}CC transparent transparent transparent`,
          }}
        />
      </div>
    </div>
  );
};

export default AnnotationFlag;
