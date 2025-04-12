"use client";

import React from 'react';

interface PlaceholderImageProps {
  text?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  bgColor?: string;
  textColor?: string;
  fill?: boolean;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  text,
  width = '100%',
  height = '100%',
  className = '',
  bgColor = 'bg-gray-200',
  textColor = 'text-gray-500',
  fill = false,
}) => {
  const style = fill ? {} : { width, height };

  return (
    <div
      className={`${bgColor} ${textColor} flex items-center justify-center overflow-hidden ${className}`}
      style={style}
    >
      <div className="text-center p-4">
        <p className="font-medium">{text || 'Image'}</p>
      </div>
    </div>
  );
};

export default PlaceholderImage; 