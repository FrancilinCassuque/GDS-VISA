// pages/api/upload.js
// import formidable from 'formidable'
import { bucket } from './firebase.config.admin'

// Para aceitar o upload de arquivos
export const config = {
  api: {
    bodyParser: false,
  },
}

export const uploadFile = async (file: any) => {
  const blob = bucket.file(file.originalFilename)
  const blobStream = blob.createWriteStream({
    resumable: false,
  })

  return new Promise((resolve, reject) => {
    blobStream.on('finish', () => {
      resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
    })

    blobStream.on('error', (err) => {
      reject(err)
    })

    blobStream.end(file.filepath)
  })
}

// const handler = async (req, res) => {
//   const form = new formidable.IncomingForm()

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao processar o arquivo' })
//     }

//     try {
//       const fileUrl = await uploadFile(files.file[0])
//       res.status(200).json({ fileUrl })
//     } catch (error) {
//       res.status(500).json({ error: 'Erro ao enviar o arquivo' })
//     }
//   })
// }

// export default handler
