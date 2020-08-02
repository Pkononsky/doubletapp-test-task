import React, {Component} from 'react';

const BLUE_DOT_IMG = 'https://vectr.com/pkononsky/a1thGrYwED.svg?width=640&height=640&select=a1thGrYwEDpage0';
const STAR_IMG = 'https://vectr.com/pkononsky/biOmi2JH6.svg?width=640&height=640&select=biOmi2JH6page0';

export default class Student extends Component {
    _handelDelete() {
        this.props.deleteHandler(this.props.studentData);
    }

    render() {
        const className = this.props.className;

        const studentData = this.props.studentData;

        return (
            <div className={className}>
                <div className={`${className}-separator`}/>
                <img className={`${className}-avatar`} src={studentData.avatar.split(" ").join("+")} alt="avatar"/>
                <p className={`${className}-fullName`}>
                    {studentData.fullName}
                </p>
                <img className={`${className}-blue-dot-specialty`} src={BLUE_DOT_IMG} alt="blue dot"/>
                <p className={`${className}-specialty`}>
                    {studentData.specialty}
                </p>
                <img className={`${className}-blue-dot-group`} src={BLUE_DOT_IMG} alt="blue dot"/>
                <p className={`${className}-group`}>
                    {`${studentData.specialtyAbbreviation}-${studentData.groupNum}`}
                </p>
                <img className={`${className}-blue-dot-age`} src={BLUE_DOT_IMG} alt="blue dot"/>
                <p className={`${className}-age`}>
                    {studentData.age}
                </p>
                <img className={`${className}-rating-star`} src={STAR_IMG} alt="star"/>
                <p className={`${className}-rating`}>
                    {studentData.rating}
                </p>
                <img className={`${className}-color`} src={studentData.colorPicture} alt="color pic"/>

                <label className={`${className}-delete`}>
                    <input className={`${className}-input`} name="color" type="button"
                           onClick={this._handelDelete.bind(this)}/>
                    <img className={`${className}-delete-img`}
                         src="https://vectr.com/pkononsky/aNFOcR6a5.svg?width=640&height=640&select=aNFOcR6a5page0"
                         alt="delete pic"/>
                </label>
            </div>
        )
    }
}
