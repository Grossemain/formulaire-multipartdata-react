import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Form, Row, Col } from "react-bootstrap/";
import React, { useState } from "react";
import ResultatCard from './ResultatCard';


function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  console.log(results.values);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Mettre à jour l'état hasSearched à vrai pour indiquer qu'une recherche a été effectuée
    setHasSearched(true);

    // Renseigner l'url de l'api
    const apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${searchQuery}&fields=nom,departement`;
    console.log(results);
    try {
      const response = await fetch(apiUrl, {
        mode: 'no-cors',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ search: searchQuery }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  return (
    <Container fluid>
      <Form className="d-flex" onSubmit={handleFormSubmit}>
        <Form.Control
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Code Postal"
        />
        <Button type="submit">Chercher</Button>
      </Form>
      <section className="Resultat">
        <Container fluid="md">
          <Row>
            <Col>
              {results.length > 0 ? (
                <div className= "row row-cols-1 row-cols-md-3 g-4 m-3 rounded-3 mt-4">
                  {results.map((city, index) => (
                    <ResultatCard key={index} city={city}/>
                  ))}
                </div>
              ) : (
                hasSearched && <p>Aucun résultat trouvé</p>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Container>
  );
}

export default SearchForm;
