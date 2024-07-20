import React, { useState } from 'react'

export default function Soal1() {
  const key = '1101'
  const iv = '1011'
  const [cipherText, setCipherText] = useState('')

  const plainText = '1100110011001100'

  const padPlainText = (plainText) => {
    while (plainText.length % 4 !== 0) {
      plainText += '0'
    }
    return plainText
  }

  const encryptBlock = (block, key, iv) => {
    let xorResult = ''
    for (let i = 0; i < block.length; i++) {
      xorResult += block[i] ^ iv[i]
    }

    let encryptedBlock = ''
    for (let i = 0; i < xorResult.length; i++) {
      encryptedBlock += xorResult[i] ^ key[i % key.length]
    }

    return encryptedBlock
  }

  const encrypt = (plainText, key, iv) => {
    const blocks = []
    for (let i = 0; i < plainText.length; i += 4) {
      const block = plainText.slice(i, i + 4)
      blocks.push(block)
    }

    let encryptedText = ''
    let previousCipherBlock = iv

    for (let i = 0; i < blocks.length; i++) {
      const currentBlock = blocks[i]
      const encryptedBlock = encryptBlock(currentBlock, key, previousCipherBlock)
      encryptedText += encryptedBlock
      previousCipherBlock = encryptedBlock
    }

    return encryptedText
  }

  const handleEncrypt = () => {
    const paddedPlainText = padPlainText(plainText)
    const encryptedText = encrypt(paddedPlainText, key, iv)
    setCipherText(encryptedText)
  }
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Soal 1 Implementasi Block Cipher menggunakan kunci 4 bit.</h3>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Plaintext</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Plaintext"
            value={plainText}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ciphertext</label>
          <input type="text" className="form-control" value={cipherText} readOnly />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="button" onClick={handleEncrypt}>
            Enkripsi
          </button>
        </div>
      </div>
    </div>
  )
}
