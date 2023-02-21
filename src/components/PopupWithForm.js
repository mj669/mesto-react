import React from 'react';

function PopupWithForm(props) {
    return (
        <>
            <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
                <div className="popup__container">
                    <button className="popup__close popup__close-edit" type="button" onClick={props.onClose}></button>
                    <h2 className="popup__title">{props.title}</h2>
                    <form className="form form_type_edit" name={`${props.name}`} novalidate>
                        {props.children}
                        <button className="popup__submit-btn" type="submit">{props.buttonText}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PopupWithForm;