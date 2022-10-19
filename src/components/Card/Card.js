import React from 'react';
import classes from './Card.module.css';

const Card = props => {
    const image = props.image;
    return (
        <div className={classes.card}>
           <span className={`${classes.icon} material-symbols-rounded`}>{image.image}</span>
           <span className={classes.description}>{image.description}</span>
        </div>
    );
};

export default Card;