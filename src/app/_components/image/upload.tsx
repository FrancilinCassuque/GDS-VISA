'use client'

import { uploadFile } from '@/firebase/image';
// components/ImageUpload.js
import { useState } from 'react';

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadFile(formData)

      const data = await response
      if (response) {
        setImageUrl(JSON.stringify(data));
        console.log('Arquivo enviado com sucesso:', data);
      } else {
        console.error('Erro ao enviar arquivo:', data);
      }
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '200px', marginTop: '10px' }} />}
    </div>
  );
};

export default ImageUpload;
