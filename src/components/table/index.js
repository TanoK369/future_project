import React from "react";

import down from "../../assets/img/download.svg";
import up from "../../assets/img/up-arrow.svg";

import './style.scss'

const Table = ({
   sortFields,
   handleSort,
   data,
   setCurrentUserId,
   pagination
}) =>
    (
        <div className="table">
            {data.length ? (
                <table>
                    <thead>
                    <tr>
                        {sortFields.map(item => (
                            <th className="table__th" onClick={handleSort(item)} key={item.name}>
                        <span className="table__th-container">
                            <span>{item.name}</span>
                            <span className="table__th-icon">
                                <img src={item.sortStatus ? down : up} alt=""/>
                            </span>
                        </span>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.slice(pagination.start, pagination.end).map(item => (
                        <tr key={item.id} onClick={() => setCurrentUserId(item.id)}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.firstName}
                            </td>
                            <td>
                                {item.lastName}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>
                                {item.phone}
                            </td>
                            <td>
                                {item.address && (
                                    <>
                                        Адрес проживания: <b>{item.address.streetAddress}</b> <br/>
                                        Город: <b>{item.address.city}</b> <br/>
                                        Провинция/штат: <b>{item.address.state}</b> <br/>
                                        Индекс: <b>{item.address.zip}</b>
                                    </>
                                )}
                            </td>
                            <td>
                                {item.description}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <h2 className="table__error">
                    Не найдено результатов
                </h2>
            )}
        </div>
    );

export default Table;