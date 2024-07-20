import React, { useState } from 'react'

export default function Soal2() {
  const [p, setP] = useState(null)
  const [q, setQ] = useState(null)
  const [e, setE] = useState(null)
  const [d, setD] = useState(null)
  const [n, setN] = useState(null)
  const [phiN, setPhiN] = useState(null)
  const [isPPrime, setIsPPrime] = useState(null)
  const [isQPrime, setIsQPrime] = useState(null)
  const [isEPrime, setIsEPrime] = useState(null)

  function isPrime(number) {
    if (number <= 1) {
      return false
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        return false
      }
    }
    return true
  }

  const calculateRSA = () => {
    setN(null)
    setD(null)
    setPhiN(null)
    if (!isPrime(p)) {
      setIsPPrime(false)
      return
    }
    setIsPPrime(true)

    if (!isPrime(q)) {
      setIsQPrime(false)
      return
    }
    setIsQPrime(true)
    const n = p * q
    const phiN = (p - 1) * (q - 1)

    const gcd = (a, b) => {
      while (b !== 0) {
        ;[a, b] = [b, a % b]
      }
      return a
    }

    const modInverse = (e, phiN) => {
      let m0 = phiN
      let y = 0,
        x = 1

      if (phiN === 1) return 0

      while (e > 1) {
        let q = Math.floor(e / phiN)
        ;[e, phiN] = [phiN, e % phiN]
        ;[x, y] = [y, x - q * y]
      }

      if (x < 0) x += m0

      return x
    }

    if (gcd(e, phiN) !== 1) {
      setIsEPrime(false)
      return
    }
    setIsEPrime(true)

    const d = modInverse(e, phiN)

    setN(n)
    setPhiN(phiN)
    setD(d)
  }
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Soal 2 Implementasi RSA menggunakan metode Rabin-Williams</h3>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Bilangan Prima p</label>
          <input
            type="number"
            className="form-control"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
          />
          {isPPrime === false && (
            <p className="text-danger">Bilangan Prima p harus relatif prima</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Bilangan Prima q</label>
          <input
            type="number"
            className="form-control"
            value={q}
            onChange={(e) => setQ(Number(e.target.value))}
          />
          {isQPrime === false && (
            <p className="text-danger">Bilangan Prima q harus relatif prima</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Bilangan Bulat e</label>
          <input
            type="number"
            className="form-control"
            value={e}
            onChange={(e) => setE(Number(e.target.value))}
          />
          {isEPrime === false && (
            <p className="text-danger">Bilangan e harus relatif prima terhadap phi(n)</p>
          )}
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="button" onClick={calculateRSA}>
            Hitung RSA
          </button>
        </div>
        {n && phiN && d && (
          <>
            <div className="mb-3">
              <label className="form-label">Nilai N</label>
              <input type="text" className="form-control" value={n} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Nilai phi(n)</label>
              <input type="text" className="form-control" value={phiN} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Nilai D</label>
              <input type="text" className="form-control" value={d} readOnly />
            </div>

            {/* <div>
            <p>n: {n}</p>
            <p>phi(n): {phiN}</p>
            <p>d: {d}</p>
          </div> */}
          </>
        )}
      </div>
    </div>
  )
}
