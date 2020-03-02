import React from "react";

import './style.scss'

const Search = ({search, setSearch, handleSearch}) => (
    <div className="search">
        <input
            className="search__input"
            type="text"
            value={search}
            placeholder="Введите любой текст"
            onChange={(e) => setSearch(e.target.value)}
        />
        <button
            className="search__button"
            onClick={handleSearch}
        >
            найти
        </button>
    </div>
);

export default Search;