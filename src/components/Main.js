import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api
            .getUserData()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));

        api
            .getCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrap">
                    <div className="profile__wrap-avatar">
                        <img className="profile__image" src={`${userAvatar}`} alt="Аватар" onClick={props.onEditAvatar} />
                        <img className="profile__image-icon" src="./images/PencilAvatar.svg" alt="Иконка редактирования" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="gallery">
                {
                    cards.map(card => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                        />
                    ))
                }
            </section>
        </main>
    );
}

export default Main;