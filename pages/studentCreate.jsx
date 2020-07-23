import React, {Component} from 'react';

import Logo from '../components/logo'
import Link from 'next/link';
import DropDownList from "../components/dropDownList";
import Input from "../components/input";
import ColorSelect from "../components/colorSelect";
import ImageUpload from "../components/imageUploader";

const DROP_LIST_IMG = "https://vectr.com/pkononsky/c1yUoTWaks.svg?width=640&height=640&select=c1yUoTWakspage0";
const DEFAULT_IMG = 'https://vectr.com/pkononsky/c394P10gpl.svg?width=640&height=640&select=c394P10gplpage0';

const AVATAR = 'avatar';
const FULL_NAME = 'fullName';
const EMAIL = 'email';
const RATING = 'rating';
const AGE = 'age';

const SPECIALTY_ID = 'specialtyId';
const GROUP_NUM_ID = 'groupNumId';
const GENDER_ID = 'genderId';
const FAVORITE_COLOR_ID = 'favoriteColorId';
const COLOR_ID = 'colorId';

const GROUP_NUM = 'groupNum';
const GENDER = 'gender';
const SPECIALTY = 'specialty';
const COLOR_PICTURE = 'colorPicture';


const SPECIALTY_LIST = 'specialtyList';
const GROUP_LIST = 'groupList';
const GENDER_LIST = 'genderList';
const COLOR_LIST = 'colorList';

const CREATE_SUCCESS = 'Студент успешно создан';
const CREATE_ERROR = 'Ошибка при создании';

export default class IndexPage extends Component {
    state = {
        [AVATAR]: DEFAULT_IMG,
        [FULL_NAME]: '',
        [EMAIL]: '',
        [RATING]: '',
        [AGE]: '',
        [SPECIALTY_ID]: '',
        [GROUP_NUM_ID]: '',
        [GENDER_ID]: '',
        [FAVORITE_COLOR_ID]: '',

        [GENDER_LIST]: [],
        [GROUP_LIST]: [],
        [SPECIALTY_LIST]: [],
        [COLOR_LIST]: []
    };

    _handleInputChange(state) {
        this.setState(state)
    }

    _sendToDataBase() {
        let input = '/api/addStudentToDatabase?';

        Object.keys(this.state).forEach((k) => {
            input += `${k}=${this.state[k]}&`
        });

        fetch(input, {
            method: 'POST'
        })
            .then((res) => {
                res.status === 200 ? alert(CREATE_SUCCESS) : alert(CREATE_ERROR)
            })
    }

    _fetchModelData(input, stateListName, propName, propId) {
        fetch(input)
            .then((res) => res.json())
            .then((modelData) => {
                const modelDataList = JSON.parse(modelData);

                let newModelData = modelDataList.map((data) => {
                    return {data: data[propName], id: data[propId]}
                });

                this.setState({[stateListName]: newModelData});
            });
    }

    componentDidMount() {
        this._fetchModelData('/api/db/getAllGenders', GENDER_LIST, GENDER, GENDER_ID);
        this._fetchModelData('/api/db/getAllGroups', GROUP_LIST, GROUP_NUM, GROUP_NUM_ID);
        this._fetchModelData('/api/db/getAllSpecialty', SPECIALTY_LIST, SPECIALTY, SPECIALTY_ID);
        this._fetchModelData('/api/db/getAllColor', COLOR_LIST, COLOR_PICTURE, COLOR_ID);
    }

    render() {
        const {specialtyList, groupList, genderList, colorList} = this.state;

        return (
            <main className="main-container">
                <Logo/>
                <div className="create-content">
                    <Link as="/" href={{pathname: '/studentsList'}}>
                        <a className="create-content__back-to-list-button">
                            <img className="create-content__back-to-list-arrow"
                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPSvkgxSmAUxOr4jOQA3ySzNxij7rp2ZYmDA&usqp=CAU"
                                 alt="arrow"/>
                            <p className="create-content__back-to-list-button-text">
                                НАЗАД К СПИСКУ СТУДЕНТОВ
                            </p>
                        </a>
                    </Link>

                    <p className="create-content__new-student">
                        Новый студент
                    </p>

                    <ImageUpload className={"create-content__avatar"}
                                 handler={this._handleInputChange.bind(this)}/>

                    <Input className="create-content__full-name"
                           text="ФИО"
                           placeHolder="Иванов Иван Иванович"
                           stateProp={FULL_NAME}
                           handler={this._handleInputChange.bind(this)}/>
                    <Input className="create-content__email"
                           text="Email"
                           placeHolder="ivanov@gmail.com"
                           stateProp={EMAIL}
                           handler={this._handleInputChange.bind(this)}/>
                    <Input className="create-content__rating"
                           text="Рейтинг"
                           placeHolder="0"
                           stateProp={RATING}
                           handler={this._handleInputChange.bind(this)}/>
                    <Input className="create-content__age"
                           text="Возраст"
                           placeHolder="0"
                           stateProp={AGE}
                           handler={this._handleInputChange.bind(this)}/>


                    <DropDownList className="create-content__drop-list-specialty"
                                  text="Специальность"
                                  listOptions={specialtyList}
                                  img={DROP_LIST_IMG}
                                  stateProp={SPECIALTY_ID}
                                  handler={this._handleInputChange.bind(this)}/>
                    <DropDownList className="create-content__drop-list-group"
                                  text="Группа"
                                  listOptions={groupList}
                                  img={DROP_LIST_IMG}
                                  stateProp={GROUP_NUM_ID}
                                  handler={this._handleInputChange.bind(this)}/>
                    <DropDownList className="create-content__drop-list-gender"
                                  text="Пол"
                                  listOptions={genderList}
                                  img={DROP_LIST_IMG}
                                  stateProp={GENDER_ID}
                                  handler={this._handleInputChange.bind(this)}/>
                    <ColorSelect className="create-content__drop-list-color"
                                 text="Любимый цвет"
                                 colorList={colorList}
                                 stateProp={FAVORITE_COLOR_ID}
                                 handler={this._handleInputChange.bind(this)}/>

                    <Link as="/" href={{pathname: '/studentsList'}}>
                        <a className="create-content__create-student-button"
                           onClick={this._sendToDataBase.bind(this)}>
                            <p className="create-content__create-student-button-text">
                                Создать
                            </p>
                        </a>
                    </Link>
                </div>
            </main>
        )
    }
}
