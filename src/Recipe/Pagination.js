import React from "react";

const PaginationFooter = ({ cardsPerPage, totalCards, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ backgroundColor: "white" }}>
      <ul
        className="pagination "
        style={{ marginTop: "auto", marginBottom: "auto" }}
      >
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="!#"
              className="page-link"
              style={{ backgroundColor: "white", color: "#49d290" }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationFooter;
