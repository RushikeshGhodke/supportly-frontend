import React from 'react';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    className = '',
    onClick,
    ...props
}) => {
    // Base classes for all buttons
    const baseClasses = 'font-medium rounded-md focus:outline-none transition-colors duration-200 flex items-center justify-center';

    // Variant classes
    const variantClasses = {
        primary: 'bg-[#0061A1] text-white hover:bg-[#004b7c] focus:ring-2 focus:ring-[#0061A1] focus:ring-offset-2',
        secondary: 'bg-white border border-[#0061A1] text-[#0061A1] hover:bg-gray-50 focus:ring-2 focus:ring-[#0061A1] focus:ring-offset-2',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
    };

    // Size classes
    const sizeClasses = {
        sm: 'text-sm py-1 px-3',
        md: 'text-base py-2 px-4',
        lg: 'text-lg py-3 px-6',
    };

    // Disabled classes
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';

    // Combine all classes
    const combinedClasses = `
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${disabledClasses}
        ${widthClasses}
        ${className}
    `;

    return (
        <button
            type={type}
            disabled={disabled}
            className={combinedClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;