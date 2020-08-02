import React, {Component} from 'react';

const Jimp = require('jimp');

const DEFAULT_IMG = 'https://vectr.com/pkononsky/c394P10gpl.svg?width=640&height=640&select=c394P10gplpage0';

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: '', classname: this.props.className};
    }

    _handleSubmit() {
        this.props.handler({avatar: this.state.imagePreviewUrl});
    }

    _handleImageChange(e) {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                Jimp.read(reader.result)
                    .then(img => {
                        return img
                            .resize(200, 200)
                            .quality(10)
                            .getBase64(Jimp.MIME_JPEG, (_, src) => {
                                this.setState({
                                    file: file,
                                    imagePreviewUrl: src
                                });

                                this._handleSubmit();
                            })
                    });
            };

            reader.readAsDataURL(file)
        }
    }

    render() {
        const {imagePreviewUrl, classname} = this.state;

        const src = imagePreviewUrl ? imagePreviewUrl : DEFAULT_IMG;

        return (
            <div className={`${classname}`}>
                <img className={`${classname}-img`}
                     src={src}
                     alt="avatar_image"/>
                <form>
                    <div className={`${classname}-texts`}>
                        <label>
                            <p className={`${classname}-change`}>
                                Сменить аватар
                            </p>
                            <input className={`${classname}-input`}
                                   type="file"
                                   onChange={this._handleImageChange.bind(this)}
                                   accept="image/*"/>
                        </label>
                        <p className={`${classname}-size`}>
                            500х500
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}
