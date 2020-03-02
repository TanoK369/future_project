import React from "react";

import './style.scss';

const UserBlock = ({user}) => (
    <div className="user_block">
        <div className="user_block__container">
            <div>
                <p>Выбран пользователь <b>{user.firstName} {user.lastName}</b></p>
                <p>Описание:</p>
                <textarea>
                    {user.description}
                </textarea>
            </div>
            <div>
                <p>Адрес проживания: <b>{user.address.streetAddress}</b></p>
                <p>Город: <b>{user.address.city}</b></p>
                <p>Провинция/штат: <b>{user.address.state}</b></p>
                <p>Индекс: <b>{user.address.zip}</b></p>
            </div>
        </div>
    </div>
);

export default UserBlock;
