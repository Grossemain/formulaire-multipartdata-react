import React, { useState } from "react";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";

function SearchForm({onFormSubmit}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [submitSearch, setSubmitSearch] = useState(""); // Nouvelle variable d'état
  const [city, setCity] = useState("");
  const [departement, setDepartement] = useState("");



  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
    console.log("city"+city);
  };

  const handleChangeDepartement = (event) => {
    setDepartement(event.target.value);
    console.log("departement"+departement);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setHasSearched(true);
    setSubmitSearch(searchQuery); // Mettre à jour submitSearch avec la valeur de searchQuery

    const apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${searchQuery}&fields=nom,departement`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("test",data);
      setResults(data);
      onFormSubmit({ searchQuery, city, departement });
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Entrez le code postal"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <Button type="button" onClick={handleFormSubmit}>Rechercher</Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>

      {hasSearched && (

        
        <Form.Group as={Row} className="mt-3">
          <Form.Label column sm="2">Sélectionnez une commune</Form.Label>
          <Col sm="10">
            <Form.Control as="select" name="city" onChange={handleChangeCity}>
            <option value="">Sélectionner un élément</option>
              {results.map((result, index) => ( 
                <option key={index} value={result.nom}>
                  {result.nom} 
                </option>
              ))}
            </Form.Control>
            <Form.Control as="select" name="departement" onChange={handleChangeDepartement}>
            <option value="">Sélectionner un élément</option>
              {results.map((result, index) => (
                <option key={index} value={result.departement.nom}>
                  {result.departement.nom}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      )}
    </Container>
  );
}

export default SearchForm;
