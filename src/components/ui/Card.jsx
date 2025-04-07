import React from 'react';

const Card = ({
    children,
    title,
    subtitle,
    footer,
    className = '',
    ...props
}) => {
    return (
        <div
            className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
            {...props}
        >
            {title && (
                <div className="p-5 border-b">
                    <h3 className="text-xl font-semibold text-[#0061A1]">{title}</h3>
                    {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
                </div>
            )}
            <div className="p-5">
                {children}
            </div>
            {footer && (
                <div className="px-5 py-3 bg-gray-50 border-t">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;