// firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from './next-sara-firebase-adminsdk.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
      projectId:serviceAccount.project_id
    }),
    storageBucket: 'gs://next-sara.appspot.com',
  });
}

const bucket = admin.storage().bucket();

export { bucket };
