import React, { useState } from 'react';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    function handleEditAvatarClick() {
        setIsAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(evt) {
        setSelectedCard(evt.target);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsAvatarPopupOpen(false);
        setIsProfilePopupOpen(false);
        setSelectedCard({});
    }

    return (
        <div className="root">

            <Header />
            
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />

            <PopupWithForm
                name="edit-profile"
                title="Редактировать профиль"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                buttonText="Сохранить"
            >
                <input
                    type="text"
                    className="popup__text popup__text_type_name"
                    name="name"
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                    id="name-input"
                />
                <span className="popup__text-error name-input-error"></span>
                <input
                    type="text"
                    className="popup__text popup__text_type_about"
                    name="about"
                    placeholder="О себе"
                    required
                    minLength="2"
                    maxLength="200"
                    id="about-input"
                />
                <span className="popup__text-error about-input-error"></span>
            </PopupWithForm>

            <PopupWithForm
                name="add-card"
                title="Новое место"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                buttonText="Создать"
            >
                <input
                    type="text"
                    className="popup__text popup__text_type_title"
                    name="title"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    id="title-input"
                />
                <span className="popup__text-error title-input-error"></span>
                <input
                    type="url"
                    className="popup__text popup__text_type_link"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required
                    id="link-input"
                />
                <span className="popup__text-error link-input-error"></span>
            </PopupWithForm>

            <PopupWithForm
                name="delete-card"
                title="Вы уверены?"
                onClose={closeAllPopups}
                buttonText="Да"
            />

            <PopupWithForm
                name="change-avatar"
                title="Обновить аватар"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                buttonText="Сохранить"
            >
                <input
                    type="url"
                    className="popup__text popup__text_type_link"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    required
                    id="avatar-input"
                />
                <span className="popup__text-error avatar-input-error"></span>
            </PopupWithForm>

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />

        </div>
    );
}

export default App;