import React from 'react';
import { useFormContext } from 'react-hook-form';

const FormInput = ({
  label,
  name,
  type = 'text',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className=''>
      <label htmlFor={name} className='block text-ct-blue-600 mb-3'>
        {label}
      </label>
      <input
        type={type}
        placeholder=' '
        className='block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4'
        {...register(name)}
      />
      {errors[name] && (
        <span className='text-red-500 text-xs pt-1 block'>
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default FormInput;
