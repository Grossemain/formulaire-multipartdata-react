import React from 'react';
import Card from 'react-bootstrap/Card';

const ResultatCard = ({ city }) => {
    return (
        <Card className="md-6">
                      <Card.Body>
                        <Card.Title><h2>{city.nom}</h2></Card.Title>
                        <Card.Title><h2>{city.departement.nom}</h2></Card.Title>
                      </Card.Body>
                    </Card>
    );
};
export default ResultatCard;