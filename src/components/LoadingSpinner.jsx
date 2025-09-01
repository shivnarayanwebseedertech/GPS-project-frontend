// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ 
    text = 'Loading...', 
    size = 'md',
    color = 'indigo',
    center = true,
    showText = true 
}) => {
    // Size configurations
    const sizes = {
        xs: 'w-4 h-4 border-2',
        sm: 'w-5 h-5 border-2', 
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-2',
        xl: 'w-12 h-12 border-4'
    };

    // Color configurations  
    const colors = {
        indigo: 'border-indigo-500 border-t-transparent',
        blue: 'border-blue-500 border-t-transparent',
        green: 'border-green-500 border-t-transparent',
        red: 'border-red-500 border-t-transparent',
        gray: 'border-gray-300 border-t-transparent'
    };

    const spinnerClasses = `${sizes[size]} ${colors[color]} rounded-full animate-spin`;
    
    return (
        <div className={`flex ${center ? 'items-center justify-center' : 'items-center'} gap-2`}>
            <div className={spinnerClasses}></div>
            {showText && text && (
                <p className="text-gray-500 text-sm font-medium">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
