import React from 'react'
import { NavLink } from 'react-router-dom';

import "./Pagination.css";

const Pagination = ({productPerPage, totalProduct, paginate, currentPage}) => {
  const pageNumbers = [];
  for(let i=1; i<=Math.ceil(totalProduct/productPerPage);i++){
    pageNumbers.push(i);
  }
  
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => {
          return (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <NavLink to='#' onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                {number}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Pagination
