import React from "react";

function Card({ card, onCardClick }) {
    return (
        <div className="gallery__card">
            <button className="gallery__delete gallery__delete_active" type="button"></button>
            <img className="gallery__image" src={card.link} alt={card.name} onClick={onCardClick} />
            <div className="gallery__info">
                <h2 className="gallery__title">{card.name}</h2>
                <div className="gallery__like-wrapper">
                    <button className="gallery__like gallery__like_active" type="button"></button>
                    <p className="gallery__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}


export default Card;