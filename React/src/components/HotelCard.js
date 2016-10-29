/**
 * Created by Clevin on 20.10.2016.
 */
import React from 'react';

const MAX_DESCRIPTION_LENGTH = 100;
    
export default class HotelCard extends React.Component {

    render() {
        const {
            id,
            name,
            image,
            description,
            price
        } = this.props;
        return (
            <figure className="hotel-card">
                <img className="hotel-image" src={image} alt=""/>
                <figcaption>
                    <div className="hotel-body">
                        <h3 className="hotel-title">{name}</h3>
                        <p className="hotel-description">
                            {
                                description.length > MAX_DESCRIPTION_LENGTH
                                ? description.substring(0, MAX_DESCRIPTION_LENGTH) + ' ...'
                                : description
                            }
                        </p>
                    </div>
                    <div className="hotel-book">
                        <span className="hotel-price">{price}$</span>
                        <a className="hotel-book-link"
                           href={`https://www.airbnb.com/rooms/${id}`}
                           target="_blank"
                        >
                            Book now!
                        </a>
                    </div>
                </figcaption>
            </figure>
        )
    }
}