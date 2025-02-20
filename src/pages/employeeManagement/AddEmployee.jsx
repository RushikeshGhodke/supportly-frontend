import React, { useState } from 'react';
import { FiArrowLeftCircle, FiSave } from 'react-icons/fi';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from '@mui/material'; // Import Button for actions
import AccessTable from './AccessTable';

const AddEmployee = () => {
    const { register, handleSubmit, control, formState: { errors }, setFocus, watch } = useForm();

    // State to store the uploaded photo
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [access, setAccess] = useState('');

    const onSubmit = (data) => {
        console.log(data);
    };

    const jobTitles = [
        { title: 'Software Engineer' },
        { title: 'Product Manager' },
        { title: 'UX Designer' },
        { title: 'Data Scientist' },
    ];

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    // Handle reset of photo
    const handleReset = () => {
        setPhoto(null);
        setPhotoPreview(null);
        setShowPreview(false);
    };

    // Handle Preview Button Click
    const handlePreview = () => {
        setShowPreview(!showPreview);
    };

    return (
        <div className='flex flex-col gap-4 mt-16'>
            <div className='fixed flex justify-between bg-[#F9F9F9] z-2 w-[90vw] items-start'>
                <div className='text-[#0061A1] flex items-center gap-2 text-base font-semibold px-4 py-4 top-14 left-14'>
                    <FiArrowLeftCircle className='cursor-pointer' size={24} />
                    <div>
                        <span className='text-[#A3A3A3]'>Dashboard / </span>
                        <span className='text-black'>Add Employee</span>
                    </div>
                </div>
                <button
                    className='flex justify-center items-center cursor-pointer bg-[#0061A1] text-white text-base font-semibold w-full sm:w-[70vw] md:w-[60vw] lg:w-max gap-2 border-2 p-2 rounded-sm'
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                >
                    <FiSave size={20} />
                    Save Details
                </button>
            </div>

            <div className='py-16 px-10 flex-1 overflow-y-auto bg-white'>
                <h1 className='text-[#7D7D7D] text-lg font-semibold mb-2'>Person Details</h1>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col lg:flex-row gap-3'>
                        <TextField
                            required
                            id="employeeName"
                            label="Employee Name"
                            variant="outlined"
                            {...register('employeeName', { required: 'Employee name is required' })}
                            error={!!errors.employeeName}
                            helperText={errors.employeeName ? errors.employeeName.message : ''}
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontSize: '14px',
                                },
                                '& .MuiFormLabel-root': {
                                    fontSize: '14px',
                                },
                            }}
                            className="w-full lg:w-[300px]"
                        />

                        <TextField
                            id="employeePhone"
                            label="Phone"
                            variant="outlined"
                            {...register('employeePhone')}
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontSize: '14px',
                                },
                                '& .MuiFormLabel-root': {
                                    fontSize: '14px',
                                },
                            }}
                            className="w-full lg:w-[300px]"
                        />

                        <TextField
                            id="employeeEmail"
                            label="Email"
                            variant="outlined"
                            {...register('employeeEmail')}
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontSize: '14px',
                                },
                                '& .MuiFormLabel-root': {
                                    fontSize: '14px',
                                },
                            }}
                            className="w-full lg:w-[300px]"
                        />

                        <Controller
                            name="jobTitle"
                            control={control}
                            rules={{ required: 'Job title is required' }}
                            defaultValue={null}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    disablePortal
                                    id="jobTitle"
                                    className="w-full lg:w-[300px]"
                                    options={jobTitles}
                                    getOptionLabel={(option) => option.title}
                                    value={field.value || null}
                                    onChange={(_, newValue) => field.onChange(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Job Title"
                                            error={!!errors.jobTitle}
                                            helperText={errors.jobTitle ? errors.jobTitle.message : ''}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    fontSize: '14px',
                                                },
                                                '& .MuiFormLabel-root': {
                                                    fontSize: '14px',
                                                },
                                            }}
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.title === value.title}
                                />
                            )}
                        />
                    </div>



                    <div className="flex flex-col">
                        <label htmlFor="profilePhoto" className="mb-1 text-sm text-gray-600">Profile Photo</label>
                        <div className="flex items-center gap-3">
                            <Input
                                id="profilePhoto"
                                type="file"
                                {...register('profilePhoto', { required: 'Profile photo is required' })}
                                onChange={handleFileChange}
                                sx={{
                                    '& input': {
                                        fontSize: '14px',
                                    },
                                }}
                                className="w-full lg:w-[300px]"
                            />
                            {photo && (
                                <div className="flex items-center gap-2">
                                    <Button variant="outlined" color="primary" onClick={handlePreview}>
                                        Preview
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleReset}>
                                        Reset
                                    </Button>
                                </div>
                            )}
                        </div>

                        {
                            showPreview && photoPreview && (
                                <div className="mt-2">
                                    <img src={photoPreview} alt="Profile Preview" className="w-[100px] h-[100px] object-cover" />
                                </div>
                            )
                        }

                        {
                            errors.profilePhoto && (
                                <span className="text-red-500 text-sm">{errors.profilePhoto.message}</span>
                            )
                        }
                    </div>

                    <AccessTable access={access} setAccess={setAccess} />

                </form>
            </div>

            <div className="fixed bottom-0 left-14 right-0 p-2 bg-white">

            </div>

        </div>
    );
};

export default AddEmployee;
