import React, { useEffect, useRef, useState } from "react";
import { citiesService } from "../_services/cities.service";
import { Form } from "react-bootstrap";

const Cities = () => {
  const [citiesData, setCitiesData] = useState([]);

  const flag = useRef(false);

  useEffect(() => {
    if (flag.current === false) {
      citiesService
        .getCity()
        .then((res) => {
          // Liste dans le state
          setCitiesData(res.data);
        })
        .catch((err) => console.log(err));
    }

    return () => (flag.current = true);
  }, []);

  return (
    <div className="departements-container">
      <Form.Select aria-label="Choisi ta ville">
        <option>Choisi ta ville</option>
        {citiesData.map((city, index) => (
          <option key={index} value={city.nom}>
            {city.nom}-{city.departement.nom}
          </option>
        ))}
      </Form.Select>
      <Form.Select aria-label="Choisi ta ville">
        <option>Choisi ton departement</option>
        {citiesData.map((city, index) => (
          <option key={index} value={city.departement.nom}>
            {city.departement.nom}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default Cities;
