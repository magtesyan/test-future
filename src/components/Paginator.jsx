import React, {useState} from 'react';

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  };

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div>
      {portionNumber > 1 && 
        <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
      }
      {
      pages.filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map((page) => {
              return <span key={`page-${page}`} onClick={(e) => {onPageChanged(page)}}>{page}</span>;
        })
      }
      {portionCount > portionNumber && 
        <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
      }
    </div>
  );
};

export default Paginator;