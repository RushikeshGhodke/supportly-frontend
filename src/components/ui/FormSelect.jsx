import React from 'react';

const FormSelect = ({
    label,
    id,
    options = [],
    value,
    onChange,
    name,
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
            <select
                id={id}
                name={name || id}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring-2 focus:ring-[#0061A1] ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                {...props}
            >
                {options.map((option, index) => (
                    <option key={index} value={typeof option === 'object' ? option.value : option}>
                        {typeof option === 'object' ? option.label : option}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormSelect;