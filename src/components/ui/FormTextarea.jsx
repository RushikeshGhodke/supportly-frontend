import React from 'react';

const FormTextarea = ({
    label,
    id,
    placeholder,
    value,
    onChange,
    name,
    rows = 5,
    required = false,
    error = null,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                name={name || id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                required={required}
                disabled={disabled}
                className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring-2 focus:ring-[#0061A1] ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormTextarea;