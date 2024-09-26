import admin from 'firebase-admin'
// import * as fs from 'fs'

// Initialize Firebase Admin SDK
import serviceAccount from './next-sara-firebase-adminsdk.json'

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey:serviceAccount.private_key,
    projectId:serviceAccount.project_id,
  }),

  storageBucket: 'gs://next-sara.appspot.com'
})

const bucket = admin.storage().bucket()

// Function to upload a file
async function uploadFile(filePath: string, destination: string) {
  try {

    // Upload the file
    const [fileMetadata] = await bucket.upload(filePath, {
      destination: destination,
      metadata: {
        contentType: 'image/*',
        contentLength:1,
        metadata: {
          // Add any custom metadata you need
          'firebaseStorageDownloadTokens': 'your-download-token' // Optional: For download restrictions
        }
      }
    })

    console.log(`File uploaded successfully: ${fileMetadata.name}`)
    console.log(`File URL: ${fileMetadata.publicUrl}`)

  } catch (error) {
    console.error('Error uploading file:', error)
  }
}

// Example usage:
const filePath = './path/to/your/file.jpg' // Replace with your file path
const destination = '/gds' // Replace with your desired file path in the bucket

uploadFile(filePath, destination)
//next-sara.appspot.com/gds