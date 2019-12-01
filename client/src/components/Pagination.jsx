/*eslint-disable no-unused-vars*/
import React from 'react';
import styled from 'styled-components';
/*eslint-disable no-unused-vars*/

const StyledPagination = styled.div`
  width: 100%;
  display: inline-block;
  font-size: 1.2em;
  margin: 20px;
  & a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }

  & a.active {
    background-color: #4caf50;
    color: white;
  }

  & a:hover:not(.active) {
    background-color: #ddd;
  }
`;

export default function Pagination({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <StyledPagination>
      {pageNumbers.map(number => (
        <a key={number} href='#' onClick={e => paginate(e, number)}>
          {number}
        </a>
      ))}
    </StyledPagination>
  );
}
