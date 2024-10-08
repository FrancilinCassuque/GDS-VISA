import { bucket } from '@/firebase/firebase.config.admin'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadHandlerImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer o upload.' })
    }

    console.log(files); // Veja a estrutura do objeto

    if (files && files.file) {
      const file = files.file ? files.file[0] : null

      if (file) {
        const tempPath = file.filepath
        const destFileName = Date.now() + '-' + file.originalFilename

        try {
          await bucket.upload(tempPath, {
            destination : destFileName,
            metadata: {
              contentType: file.mimetype || '',
            },
          })
          fs.unlinkSync(tempPath) // Remove o arquivo temporário
          return res.status(200).json({ message: 'Upload realizado com sucesso!', fileName: destFileName })
        } catch (error) {
          return res.status(500).json({ error: 'Erro ao salvar o arquivo.' })
        }
      }
    } else {
      console.error("O objeto files ou o campo 'file' não está definido.");
    }

  })
}

export default uploadHandlerImage