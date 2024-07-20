import React, { useState } from 'react';
import Soal1 from './components/Soal1';
import Soal2 from './components/Soal2';
import Soal3 from './components/Soal3';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const listSoal = [
    <Soal1 key="1" />,
    <Soal2 key="2" />,
    <Soal3 key="3" />
  ];

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= listSoal.length) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div className="page">
        <header className="navbar navbar-expand-sm navbar-light d-print-none">
          <div className="container-xl">
            <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
              <a href="#">Tugas UAS Kriptografi Dan Keamanan Sistem</a>
            </h1>

            <div className="navbar-nav flex-row order-md-last">
              <div className="nav-item">
                <a href="#" className="nav-link d-flex lh-1 text-reset p-0">
                  <div className="d-none d-xl-block ps-2">
                    <div>Kafitra Marna Ibrahim</div>
                    <div className="mt-1 small text-secondary">C2C022107</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </header>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="container-xl">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)} tabIndex="-1" aria-disabled={currentPage === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M15 6l-6 6l6 6"></path>
                    </svg>
                    prev
                  </a>
                </li>
                {listSoal.map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <a className="page-link mx-2" href="#" onClick={() => handlePageChange(index + 1)}>
                      Soal {index + 1}
                    </a>
                  </li>
                ))}
                <li className={`page-item ${currentPage === listSoal.length ? 'disabled' : ''}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)} aria-disabled={currentPage === listSoal.length}>
                    next
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                  </a>
                </li>
              </ul>
              {listSoal[currentPage - 1]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
