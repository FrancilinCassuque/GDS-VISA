'use client'

// components/UploadForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  file: FileList
}

const UploadForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Erro ao fazer o upload:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        {...register('file', { required: true })}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
