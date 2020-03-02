import React, {useState} from "react";

import Table from '../table';
import UserBlock from '../user-block';
import UserForm from '../user-form';
import Pagination from "../pagination";
import Search from "../search";

const Content = (props) => {

    const [data, setData] = useState(props.data);
    // Используется для поиска по данным
    const [search, setSearch] = useState('');
    // Используется для пагинации
    const [pagination, setPagination] = useState({
        start: 0, // С какого элемента выводим
        end: 50, // По какой элемент выводим
        perPage: 50, // Количество строк на страницу
        current: 0, // Активная страница
    });
    // Используется для хранение выбранного пользователя
    const [currentUserId, setCurrentUserId] = useState();

    const [showFormUser, setShowFormUser] = useState(false);

    // Используется для вывода заголовков столбцов и сортировки
    // sortStatus - флаг возрастания или убывания
    const [sortFields, setSort] = useState([
        {name: 'id', label: 'Id', type: 'number', sortStatus: false},
        {name: 'firstName', label: 'Имя', sortStatus: false},
        {name: 'lastName', label: 'Фамилия', sortStatus: false},
        {name: 'phone', label: 'Телефон', sortStatus: false},
        {name: 'email', label: 'Почта', sortStatus: false},
        {name: 'address', label: 'Адреса', sortStatus: false, props: ['zip']},
        {name: 'description', label: 'Описание', sortStatus: false},
    ]);

    /*
    * Сортировка по полю
    * */
    const handleSort = (field) => () => {
        let newData;
        if (field.type === 'number') { // Сортировка числовых значений
            newData = [...data].sort((a, b) =>
                field.sortStatus ? a[field.name] - b[field.name] : b[field.name] - a[field.name]
            );
        } else { // Сортировка текстовых значений
            newData = [...data].sort((a, b) =>
                field.sortStatus ? a[field.name] > b[field.name] ? 1 : -1 : a[field.name] < b[field.name] ? 1 : -1
            );
        }

        // Переключает флаг сортировки (по возрастанию или убыванию) для конкретного столбца
        const sortData = sortFields.map(item => {
            item.sortStatus = item.name === field.name ? !item.sortStatus : item.sortStatus;
            return item;
        });

        setSort(sortData);
        setData(newData);
    };

    const getPaginationItems = () => {
        // Кол-во страниц
        const pages = Math.ceil(data.length / (pagination.end - pagination.start));
        // Возвращает массив объектов страниц пагинации
        let result = [];
        for (let i = 0; i < pages; i++) {
            result.push({
                number: i,
                start: i * pagination.perPage,
                end: i * pagination.perPage + pagination.perPage,
            });
        }
        return result;
    };

    // Для добавление нового пользователя
    const handleAddUser = (user) => {
        setData([user].concat(data));
        setShowFormUser(false);
    };


    /*
    * Фильтрация по введенному тексту
    * Ищет сразу по всем полям
    * */
    const handleSearch = () => {
        let newData = props.data.filter(item => {
            for (let itemField in item) {
                if (typeof item[itemField] === 'object') { // Для адреса
                    for (let itemFieldProp in item[itemField]) {
                        if (String(item[itemField][itemFieldProp]).indexOf(search) !== -1) {
                            return true;
                        }
                    }
                } else { // Для простых полей
                    if (String(item[itemField]).indexOf(search) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        });
        setCurrentUserId();
        setData(newData);
    };

    // Получаем массив объектов пагинации
    const paginationItems = getPaginationItems();

    // Получаем объект выбранного пользователя
    const currentUser = currentUserId && data.find(item => item.id === currentUserId);

    return (
        <section className="table">

            <UserForm
                addUser={handleAddUser}
                showFormUser={showFormUser}
                setShowFormUser={setShowFormUser}
            />

            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />

            <Table
                sortFields={sortFields}
                handleSort={handleSort}
                data={data}
                setCurrentUserId={setCurrentUserId}
                pagination={pagination}
            />

            <Pagination
                items={paginationItems}
                onSet={setPagination}
                pagination={pagination}
            />

            {currentUser && <UserBlock user={currentUser}/>}
        </section>
    )
};

export default Content;
