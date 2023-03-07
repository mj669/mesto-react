import React, { useState, useContext, useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {

    const currentUser = useContext(CurrentUserContext);

    const avatarRef = useRef('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser])

    function handleChangeAvatar(evt) {
        setAvatar(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    useEffect(() => {
        setAvatar('')
    }, [props.isOpen])

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="popup__text popup__text_type_link"
                name="avatar"
                placeholder="Ссылка на аватар"
                required
                id="avatar-input"
                ref={avatarRef}
                onChange={handleChangeAvatar}
                value={avatar ? avatar : ''}
            />
            <span className="popup__text-error avatar-input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
