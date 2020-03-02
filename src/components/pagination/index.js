import React from "react";

import './style.scss';

const Pagination = ({items, onSet, pagination}) => (
    <div className="pagination">
        {items.length > 1 && items.map(item => (
            <span
                key={item.number}
                onClick={() => onSet({
                    ...pagination,
                    start: item.start,
                    end: item.end,
                    current: item.number
                })}
                className={`pagination__item ${item.number === pagination.current && 'active'}`}
            >
                    {item.number + 1}
                </span>
        ))}
    </div>
);

export default Pagination;