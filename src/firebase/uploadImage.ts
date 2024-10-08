import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase.config.store'

const imgUpload = async (files: [any]) => {
  try {
    const file = files[0]
    const storageRef = ref(storage, `gds/${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log('File uploaded successfully:', downloadURL)

    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
    console.error(files)
  }
}

// Função para excluir o arquivo usando o caminho
const deleteFile = async (filePath: string): Promise<number> => {
  try {
    const fileRef = ref(storage, filePath)
    await deleteObject(fileRef)
    
    return 200
  } catch (error) {
    console.log(error)
    return 400
  }
}


export const image = {
  imgUpload,
  deleteFile
}