import React, { useState } from 'react';
const md5 = (message) => {
  const A = 0x67452301;
  const B = 0xEFCDAB89;
  const C = 0x98BADCFE;
  const D = 0x10325476;

  const F = (x, y, z) => (x & y) | (~x & z);
  const G = (x, y, z) => (x & z) | (y & ~z);
  const H = (x, y, z) => x ^ y ^ z;
  const I = (x, y, z) => y ^ (x | ~z);

  const rotateLeft = (x, n) => (x << n | x >>> (32 - n)) >>> 0;

  const T = Array.from({ length: 64 }, (_, i) => Math.floor(2 ** 32 * Math.abs(Math.sin(i + 1))) >>> 0);

  const s = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
      5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20,
      4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
      6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
  ];

  const messageBytes = new Uint8Array([...message].map(char => char.charCodeAt(0)));
  const origLenInBits = (8 * messageBytes.length) >>> 0;

  
  let messagePadded = new Uint8Array(((messageBytes.length + 1 + 8) >> 6 << 6) + 64);
  messagePadded.set(messageBytes);
  messagePadded[messageBytes.length] = 0x80;
  new DataView(messagePadded.buffer).setUint32(messagePadded.length - 8, origLenInBits, true);

  let [a, b, c, d] = [A, B, C, D];

  for (let i = 0; i < messagePadded.length; i += 64) {
      const chunk = new Uint8Array(messagePadded.buffer.slice(i, i + 64));
      const M = Array.from({ length: 16 }, (_, j) => new DataView(chunk.buffer).getUint32(j * 4, true));

      let [a0, b0, c0, d0] = [a, b, c, d];

      for (let j = 0; j < 64; j++) {
          let [f, g] = [0, 0];
          if (j < 16) {
              f = F(b, c, d);
              g = j;
          } else if (j < 32) {
              f = G(b, c, d);
              g = (5 * j + 1) % 16;
          } else if (j < 48) {
              f = H(b, c, d);
              g = (3 * j + 5) % 16;
          } else {
              f = I(b, c, d);
              g = (7 * j) % 16;
          }

          const temp = (b + rotateLeft((a + f + T[j] + M[g]) >>> 0, s[j])) >>> 0;
          [a, b, c, d] = [d, temp, b, c];
      }

      a = (a + a0) >>> 0;
      b = (b + b0) >>> 0;
      c = (c + c0) >>> 0;
      d = (d + d0) >>> 0;
  }

  const hash = [a, b, c, d].map(val => val.toString(16).padStart(8, '0')).join('');
  return hash;
};

export default function Soal3() {
  const [plaintext, setPlaintext] = useState('');
  const [hash, setHash] = useState('');

  const handleHashClick = () => {
    const hashed = md5(plaintext);
    setHash(hashed);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Soal 3 Hash Dengan MD5</h3>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Plaintext</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Plaintext"
            onChange={(e) => setPlaintext(e.target.value)}
            value={plaintext}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleHashClick}>Hash</button>
        </div>

        {hash && (
          <div className="mb-3">
            <label className="form-label">MD5 Hash</label>
            <input
              type="text"
              className="form-control"
              value={hash}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
}
