import React, { useState, useEffect } from 'react';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

    const [currentUser, setCurrentUser] = useState('');

    const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [cardForDelete, setCardForDelete] = useState({})
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserData()
            .then(res => {
                setCurrentUser(res)
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    }, [])

    useEffect(() => {
        api.getCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(`Ошибка.....: ${err}`));;
    }

    function handleCardDelete(evt) {
        evt.preventDefault();
        api.deleteCard(cardForDelete._id)
            .then(() => {
                const newCards = cards.filter((item) => item !== cardForDelete);
                setCards(newCards);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }

    function handleUpdateUser(user) {
        api.editProfile(user.name, user.about)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }

    function handleUpdateAvatar(user) {
        api.changeAvatar(user.avatar)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }

    function handleAddPlace(card) {
        api.createCard(card.name, card.link)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleEditAvatarClick() {
        setIsAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardDeleteRequest(card) {
        setCardForDelete(card);
        setIsConfirmPopupOpen(true);
    }

    function handleCardClick(evt) {
        setSelectedCard(evt.target);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsAvatarPopupOpen(false);
        setIsProfilePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setSelectedCard({});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">

                <Header />

                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDeleteRequest={handleCardDeleteRequest}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                />

                <ConfirmPopup
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDelete}
                    title="Вы уверены?"
                    buttonText="Да"
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;