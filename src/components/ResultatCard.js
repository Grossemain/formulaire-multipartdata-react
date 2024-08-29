import React from 'react';
import Card from 'react-bootstrap/Card';

const ResultatCard = ({ city }) => {
    return (
        <Card className="md-6">
                      <Card.Body>
                        <Card.Title><h2>{city.nom}</h2></Card.Title> 
                        <Card.Text><h2>{city.departement}</h2></Card.Text>
                      </Card.Body>
                    </Card>
    );
};
export default ResultatCard;