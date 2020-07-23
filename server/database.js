const Sequelize = require('sequelize');
const config = require('config');

const createStudentModel = require('models/Student').default;
const createColorModel = require('models/Color').default;
const createGenderModel = require('models/Gender').default;
const createGroupModel = require('models/Group').default;
const createSpecialtyModel = require('models/Specialty').default;

const colorData = require('mocks/color');
const genderData = require('mocks/gender');
const groupData = require('mocks/group');
const specialtyData = require('mocks/specialty');

const COLOR_MODEL = 'colorModel';
const GENDER_MODEL = 'genderModel';
const GROUP_MODEL = 'groupModel';
const SPECIALTY_MODEL = 'specialtyModel';

const GENDER = 'gender';
const GROUP_NUM = 'groupNum';
const SPECIALTY = 'specialty';
const SPECIALTY_ABBREVIATION = 'specialtyAbbreviation';
const COLOR_PICTURE = 'colorPicture';

const GENDER_ID = 'genderId';
const GROUP_NUM_ID = 'groupNumId';
const SPECIALTY_ID = 'specialtyId';
const COLOR_ID = 'colorId';
const FAVORITE_COLOR_ID = 'favoriteColorId';

class Database {
    constructor() {
        const sequelizeOptions = config.get('sequelizeOptions');
        this._sequelize = new Sequelize(sequelizeOptions);
    }

    async init() {
        await this._initModel(COLOR_MODEL, createColorModel, colorData);
        await this._initModel(GENDER_MODEL, createGenderModel, genderData);
        await this._initModel(GROUP_MODEL, createGroupModel, groupData);
        await this._initModel(SPECIALTY_MODEL, createSpecialtyModel, specialtyData);

        this.studentModel = createStudentModel(this._sequelize, this[COLOR_MODEL], this[GENDER_MODEL], this[GROUP_MODEL], this[SPECIALTY_MODEL]);
        await this.studentModel.sync(
            //{force: true}
            );
    }

    async _initModel(modelName, createFunc, modelData) {
        this[modelName] = createFunc(this._sequelize);
        await this[modelName].sync({force: true});
        this[modelName].bulkCreate(modelData);
    }

    _roughScale(x, base, rej) {
        const parsed = parseInt(x, base);
        if (isNaN(parsed)) {
            rej();
        }
        return parsed;
    }

    async addStudentToDatabase(req, res) {
        const newStudent = {};

        const query = req.query;
        const radix = 10;

        await new Promise((resolve, reject) => {
            newStudent.avatar = query.avatar;
            newStudent.fullName = query.fullName;
            newStudent.email = query.email;
            newStudent.specialtyId = this._roughScale(query.specialtyId, radix, reject);
            newStudent.groupNumId = this._roughScale(query.groupNumId, radix, reject);
            newStudent.rating = this._roughScale(query.rating, radix, reject);
            newStudent.age = this._roughScale(query.age, radix, reject);
            newStudent.genderId = this._roughScale(query.genderId, radix, reject);
            newStudent.favoriteColorId = this._roughScale(query.favoriteColorId, radix, reject);
            resolve(newStudent)
        })
            .then(() => {
                    this.studentModel.create(newStudent)
                        .then(() => res.json())
                        .catch(() => res.status(500).send('Не удалось добавить студента'))
                },
                () => res.status(500).send('Не удалось добавить студента'));
    }

    async _getAllModelData(model, attribute) {
        const modelData = await model.findAll(attribute ? {
            attributes: [...attribute]
        } : {});

        return JSON.stringify(modelData, null, 2);
    }

    async getAllGenders(_req, res) {
        res.json(await this._getAllModelData(this[GENDER_MODEL], [GENDER, GENDER_ID]))
    }

    async getAllGroups(_req, res) {
        res.json(await this._getAllModelData(this[GROUP_MODEL], [GROUP_NUM, GROUP_NUM_ID]))
    }

    async getAllSpecialty(_req, res) {
        res.json(await this._getAllModelData(this[SPECIALTY_MODEL], [SPECIALTY, SPECIALTY_ID]))
    }

    async getAllColor(_req, res) {
        res.json(await this._getAllModelData(this[COLOR_MODEL], [COLOR_PICTURE, COLOR_ID]))
    }

    async getAllStudents(_req, res) {
        res.json(await this._getAllModelData(this.studentModel))
    }

    async _getModelDataById(model, propName, id) {
        const modelData = await model.findOne({
            where: {
                [propName]: id
            }
        });

        return JSON.stringify(modelData, null, 2);
    }

    async getAllStudentWithResolvedIds(req, res) {
        const studentsWithIds = JSON.parse(await this._getAllModelData(this.studentModel));

        const studentsWithResolvedIds = await Promise.all(studentsWithIds.map(async (student) => {
            const newStudent = Object.assign({}, student);

            const specialty = JSON.parse(await this._getModelDataById(this[SPECIALTY_MODEL], SPECIALTY_ID, student[SPECIALTY_ID]));
            newStudent[SPECIALTY] = specialty[SPECIALTY];
            newStudent[SPECIALTY_ABBREVIATION] = specialty[SPECIALTY_ABBREVIATION];
            newStudent[GROUP_NUM] = JSON.parse(await this._getModelDataById(this[GROUP_MODEL], GROUP_NUM_ID, student[GROUP_NUM_ID]))[GROUP_NUM];
            newStudent[COLOR_PICTURE] = JSON.parse(await this._getModelDataById(this[COLOR_MODEL], COLOR_ID, student[FAVORITE_COLOR_ID]))[COLOR_PICTURE];

            return newStudent;
        }));

        res.json(JSON.stringify(studentsWithResolvedIds, null, 2));
    }

    async getGenderById(req, res) {
        res.json(await this._getModelDataById(this[GENDER_MODEL], GENDER_ID, req.query.id))
    }

    async getGroupById(req, res) {
        res.json(await this._getModelDataById(this[GROUP_MODEL], GROUP_NUM_ID, req.query.id))
    }

    async getSpecialtyById(req, res) {
        res.json(await this._getModelDataById(this[SPECIALTY_MODEL], SPECIALTY_ID, req.query.id))
    }

    async getColorById(req, res) {
        res.json(await this._getModelDataById(this[COLOR_MODEL], COLOR_ID, req.query.id))
    }

    async deleteStudentFromDatabase(req, res) {
        console.log(req.query.studentData);

        const studentToDelete = Object.assign({}, JSON.parse(req.query.studentData));
        delete studentToDelete[SPECIALTY];
        delete studentToDelete[GROUP_NUM];
        delete studentToDelete[COLOR_PICTURE];
        delete studentToDelete[SPECIALTY_ABBREVIATION];

        await this.studentModel.destroy({
            where: studentToDelete
        }).then(() => res.json());
    }
}

exports.default = Database;
