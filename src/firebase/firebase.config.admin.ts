// lib/firebaseAdmin.ts
import admin from 'firebase-admin';

const serviceAccount = require('./next-sara-firebase-adminsdk.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://next-sara.appspot.com',
  });
}

const bucket = admin.storage().bucket();

export { bucket };
