import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase.config'

const imgUpload = async (files: [any]) => {
  try {
    const file = files[0]
    const storageRef = ref(storage, `files/${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log('File uploaded successfully:', downloadURL)
    
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
    console.error(files)
  }
}

export const image = {
  imgUpload
}
