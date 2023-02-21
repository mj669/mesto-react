export const selectorList = {
    formSelector: '.form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active',
};

// Pop-up Редактирования профиля

export const btnOpenEditProfile = document.querySelector('.profile__edit-button');
export const profileForm = document.forms['profile-form'];
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobeInput = document.querySelector('.popup__text_type_about');

// Работа с Card

export const btnAddCard = document.querySelector('.profile__add-button');
export const cardForm = document.forms['card-form'];

// Изменение аватара

export const changeAvatarButton = document.querySelector('.profile__image');
export const changeAvatarForm = document.forms['avatar-form'];
