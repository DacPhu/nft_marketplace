import React, {useState} from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

//INTERNAL IMPORT
import styles from './Sort.module.css'; // Rename your CSS file accordingly

const Sort = ({sortOrder, onChangeSortOrder }) => {
  const handleSort = (direction) => {
    onChangeSortOrder(direction);
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sort_box}>
        <div className={styles.sort_box_left}>
          {/* When clicked, toggle the sort direction and call the onSort function */}
          <button onClick={() => handleSort(sortOrder === 'asc' ? 'desc' : 'asc')}>
            <span>Sort </span>
            {sortOrder === 'asc' ? (
              <FaSortAmountUp className={styles.icon}/>
            ) : (
              <FaSortAmountDown className={styles.icon}/>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sort;