import React, {useState} from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

//INTERNAL IMPORT
import styles from './Sort.module.css'; // Rename your CSS file accordingly

const Sort = ({}) => {
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (direction) => {
    setSortDirection(direction);
    //onSort(direction);
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sort_box}>
        <div className={styles.sort_box_left}>
          {/* When clicked, toggle the sort direction and call the onSort function */}
          <button onClick={() => handleSort(sortDirection === 'asc' ? 'desc' : 'asc')}>
            <span>Sort </span>
            {sortDirection === 'asc' ? (
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