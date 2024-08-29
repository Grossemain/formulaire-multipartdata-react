import React, { useEffect, useRef, useState } from "react";
import { departementsService } from "../_services/departements.service";
import { Form } from "react-bootstrap";

const Departements = () => {
  const [departementsData, setDepartementsData] = useState([]);
  const flag = useRef(false);

  useEffect(() => {
    if (flag.current === false) {
      departementsService
        .getAllDepartements()
        .then((res) => {
          // Liste dans le state
          setDepartementsData(res.data);
        })
        .catch((err) => console.log(err));
    }

    return () => (flag.current = true);
  }, []);

  return (
    <div className="departements-container">
      <Form.Select aria-label="Choisi ton département">
        <option>Choisi ton département</option>
        {departementsData.map((departement, index) => (
          <option key={index} value={departement.nom}>
            {departement.code}-{departement.nom}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default Departements;
