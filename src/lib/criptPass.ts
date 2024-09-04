import { createHash } from 'crypto';

export function CriptPassword(input: string): string {
  const hash = createHash('sha1');
  hash.update(input);
  return hash.digest('hex');
}

// // Generate hashes for comparison
// const hash1 = createHash('sha256').update('gh').digest('hex');
// const hash2 = createHash('sha256').update('hello').digest('hex');

// // Compare hashes
// if (hash1 === hash2) {
//     console.log('Hashes are equal');
// } else {
//     console.log('Hashes are not equal');
// }
