import React, {useState} from 'react';
import classes from './Paginator.module.css';

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
    <div className={classes.div}>
      {portionNumber > 1 && 
        <button className={classes.button} onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
      }
      {
      pages.filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map((page) => {
              return <span key={`page-${page}`} className={classes.span} onClick={(e) => {onPageChanged(page)}}>{page}</span>;
        })
      }
      {portionCount > portionNumber && 
        <button className={classes.button} onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
      }
    </div>
  );
};

export default Paginator;