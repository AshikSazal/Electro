import React from 'react'
import { NavLink } from 'react-router-dom';

import "./Pagination.css";

const Pagination = ({productPerPage, totalProduct, paginate, currentPage}) => {
  const pageNumbers = [];
  for(let i=1; i<=Math.ceil(totalProduct/productPerPage);i++){
    pageNumbers.push(i);
  }

  const maxVisiblePages = 5; // number of pages to show before and after the current page
  const visiblePages = [];
  if (pageNumbers.length <= maxVisiblePages) {
    visiblePages.push(...pageNumbers);
  } else if (currentPage <= maxVisiblePages - 2) {
    visiblePages.push(...pageNumbers.slice(0, maxVisiblePages - 1), '...', pageNumbers.slice(-1));
  } else if (currentPage >= pageNumbers.length - maxVisiblePages + 3) {
    visiblePages.push(pageNumbers[0], '...', ...pageNumbers.slice(-maxVisiblePages + 1));
  } else {
    visiblePages.push(pageNumbers[0], '...', ...pageNumbers.slice(currentPage - (maxVisiblePages-2)/2 + 1, currentPage + (maxVisiblePages-2)/2), '...', pageNumbers.slice(-1));
  }
  
  return (
    <nav>
      <ul className='pagination'>
        {currentPage > 1 && (
          <li className={`page-item`}>
            <NavLink to='#' onClick={() => paginate(currentPage - 1)} className={`page-link`}>
              &lt;
            </NavLink>
          </li>
        )}

        {visiblePages.map((number, index) => {
          if (number === '...') {
            return (
              <li key={`dots-${index}`} className={`page-item disabled`}>
                <span className={`page-link`}>
                  ...
                </span>
              </li>
            )
          }

          return (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <NavLink to='#' onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                {number}
              </NavLink>
            </li>
          )
        })}

        {currentPage < pageNumbers.length && (
          <li className={`page-item`}>
            <NavLink to='#' onClick={() => paginate(currentPage + 1)} className={`page-link`}>
              &gt;
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
