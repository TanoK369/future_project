import React, {useState} from "react";

import './style.scss'

const UserForm = ({addUser, showFormUser, setShowFormUser}) => {

    const defaultFields = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: '',
        address: {
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
        }
    };

    const [fields, setFields] = useState({
        ...defaultFields
    });

    const handleChange = (field) => (e) => {

        const fieldArray = field.split('.');

        if (fieldArray.length === 2) {
            setFields({
                ...fields,
                [fieldArray[0]]: {
                    ...fields[fieldArray[0]],
                    [fieldArray[1]]: e.target.value
                }
            })
        } else {
            setFields({
                ...fields,
                [field]: e.target.value
            })
        }
    };

    const handleSubmit = () => {
        if(isFullFilled){
            addUser(fields);
            setFields(defaultFields);
        }else{
            alert('Вы не заполнили все поля!')
        }
    };

    const isFullFilled = fields.firstName &&
            fields.lastName &&
            fields.email &&
            fields.phone &&
            fields.description &&
            fields.address.streetAddress &&
            fields.address.city &&
            fields.address.state &&
            fields.address.zip;

    return (
        <div className="user_form">
            {showFormUser ? (
                <div className="user_form__content">
                    <div>
                        <input type="text" value={fields.firstName} onChange={handleChange('firstName')}
                               placeholder="Имя"/>
                        <input type="text" value={fields.lastName} onChange={handleChange('lastName')}
                               placeholder="Фамилия"/>
                        <input type="text" value={fields.email} onChange={handleChange('email')} placeholder="Email"/>
                        <input type="text" value={fields.phone} onChange={handleChange('phone')} placeholder="Телефон"/>
                        <div>
                            <textarea
                                value={fields.description}
                                onChange={handleChange('description')}
                                placeholder="Описание"
                                rows="4"
                                cols="50"
                            />
                        </div>
                    </div>
                    <div>
                        <p>Адрес:</p>
                        <input
                            type="text" value={fields.address.streetAddress}
                            onChange={handleChange('address.streetAddress')}
                            placeholder="Улица"
                        />
                        <input
                            type="text"
                            value={fields.address.city}
                            onChange={handleChange('address.city')}
                            placeholder="Город"
                        />
                        <input type="text" value={fields.address.state} onChange={handleChange('address.state')}
                               placeholder="Штат"/>
                        <input type="text" value={fields.address.zip} onChange={handleChange('address.zip')}
                               placeholder="Индекс"/>
                    </div>
                    <div>
                        <button className="user_form__button" onClick={handleSubmit} disabled={!isFullFilled}>Сохранить</button>
                    </div>
                </div>
            ) : (
                <button className="user_form__button" onClick={() => setShowFormUser(true)}>
                    Добавить пользователя
                </button>
            )}
        </div>
    )
};

export default UserForm;
