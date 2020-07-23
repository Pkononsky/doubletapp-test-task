import React, {Component} from 'react';

import Logo from '../components/logo'
import Link from 'next/link';
import DropDownList from "../components/dropDownList";
import Student from "../components/student";

const FIND_IMG = 'https://vectr.com/pkononsky/a1HXSeIU7B.svg?width=640&height=640&select=a1HXSeIU7Bpage0';
const DROP_LIST_IMG = "https://vectr.com/pkononsky/dvVpv0fJ3.svg?width=640&height=640&select=dvVpv0fJ3page0";

const STUDENTS = 'students';

const NAME = 'Имя';
const COLOR = 'Цвет';

const FULL_NAME = 'ФИО';
const SPECIALTY = 'Специальность';
const GROUP_NUM = 'groupNum';
const COLOR_PICTURE = 'colorPicture';
const GROUP = 'Группа';
const AGE = 'Возраст';
const RATING = 'Рейтинг';

const SORT_BY = 'sortBy';
const FULL_NAME_EN = 'fullName';
const AGE_EN = 'age';
const RATING_EN = 'rating';
const COLOR_EN = 'favoriteColorId';

const DROP_LIST_OPTIONS = [
    {
        data: NAME,
        sortOption: FULL_NAME_EN,
        id: 0
    },
    {
        data: RATING,
        sortOption: RATING_EN,
        id: 2
    },
    {
        data: AGE,
        sortOption: AGE_EN,
        id: 3
    },
    {
        data: COLOR,
        sortOption: COLOR_EN,
        id: 4
    }];

const INPUT_SEARCH = 'inputSearch';

export default class IndexPage extends Component {
    state = {
        [STUDENTS]: [],
        [SORT_BY]: "",
        [INPUT_SEARCH]: ""
    };

    changeHandler(e) {
        this.setState({[INPUT_SEARCH]: e.target.value})
    }

    _sortHandler(sortOptions) {
        const sortOptionId = sortOptions[SORT_BY];
        const sortOptionName = DROP_LIST_OPTIONS.filter((option) => option.id === sortOptionId)[0]?.sortOption;

        this.setState({[SORT_BY]: sortOptionName});
    }

    _deleteStudentHandler(student) {
        const {students} = this.state;
        const strStudent = JSON.stringify(student);
        const newStudents = students.filter((stud) => JSON.stringify(stud) !== strStudent);

        const input = `/api/deleteStudentFromDatabase?studentData=${strStudent}`;

        fetch(input, {
            method: 'DELETE'
        }).then(() => this.setState({[STUDENTS]: newStudents}));
    }

    componentDidMount() {
        fetch('/api/db/getAllStudentWithResolvedIds')
            .then((res) => res.json())
            .then((studentsData) => {
                const studentsDataList = JSON.parse(studentsData);

                this.setState({[STUDENTS]: studentsDataList});
            });
    }

    render() {
        let {students, sortBy, inputSearch} = this.state;

        if (sortBy) {
            students = students.sort((studentA, studentB) => studentA[sortBy] > studentB[sortBy] ? 1 : studentA[sortBy] < studentB[sortBy] ? -1 : 0)
        }

        if (inputSearch) {
            students = students.filter((student) => student.fullName.includes(inputSearch))
        }

        return (
            <main className="main-container">
                <Logo/>
                <div className="list-content">
                    <p className="list-content__list-name">
                        Студенты
                    </p>
                    <Link as="/add_student" href={{pathname: '/studentCreate'}}>
                        <a className="list-content__add-student-button">
                            <p className="list-content__add-student-button-text">
                                + Добавить студента
                            </p>
                        </a>
                    </Link>
                    <div className="list-content__name-search">
                        <img className="list-content__name-search-img" src={FIND_IMG} alt="find img"/>
                        <input type="text"
                               className="list-content__name-search-input"
                               placeholder="Поиск по имени"
                               onChange={this.changeHandler.bind(this)}/>
                    </div>
                    <DropDownList className="list-content__drop-list"
                                  listOptions={DROP_LIST_OPTIONS}
                                  img={DROP_LIST_IMG}
                                  handler={this._sortHandler.bind(this)}
                                  stateProp={SORT_BY}/>

                    <div className="list-content__table">
                        <div className="list-content__columns">
                            <p className="list-content__students-fullNames">
                                {FULL_NAME}
                            </p>
                            <p className="list-content__students-specialties">
                                {SPECIALTY}
                            </p>
                            <p className="list-content__students-groups">
                                {GROUP}
                            </p>
                            <p className="list-content__students-ages">
                                {AGE}
                            </p>
                            <p className="list-content__students-ratings">
                                {RATING}
                            </p>
                        </div>
                        <div className="list-content__students">
                            {
                                students.map((student) => <Student className="list-content__student"
                                                                   studentData={student}
                                                                   deleteHandler={this._deleteStudentHandler.bind(this)}/>)
                            }
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
