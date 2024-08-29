import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import Departements from './components/Departements';
import Cities from './components/Cities';
import SearchForm from './components/SearchForm';



// import ArtStyleForm from "./ArtStyleForm";

const RegisterForm = () => {
  let navigate = useNavigate();
  const [pseudo_user, setPseudoUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [email_contact, setEmailContact] = useState([]);
  const [tel, setTel] = useState([]);
  const [city, setCity] = useState([]);
  const [departement, setDepartement] = useState([]);
  const [instagram, setInstagram] = useState([]);
  const [description, setDescription] = useState([]);
  const [artstyles, setArtStyles] = useState([]);
  const [img_profil, setImgProfil] = useState("");
  const [validationError, setValidationError] = useState({});

 
//On appel les ArtStyles
  // Fetch places (artsyles) from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/artstyles")
      .then((response) => {
        setArtStyles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const changeHandler = (event) => {
    setImgProfil(event.target.files[0]);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, value]);
      console.log(value);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }

};

  //On converti en formData toutes les données
// Gestion de la soumission du formulaire
const addProfil = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(checkedItems)
    formData.append("pseudo_user", pseudo_user);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("email_contact", email_contact);
    formData.append("tel", tel);
    formData.append("city", city);
    formData.append("departement", departement);
    formData.append("instagram", instagram);
    formData.append("description", description);
    formData.append("img_profil", img_profil);
    checkedItems.forEach((element, index) => {
      formData.append(`artstyle_id[]`, element);
    })
    
    await axios
      .post(`http://127.0.0.1:8000/api/register`, formData)
      .then(navigate("../merci"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };


  return (
    <div className="UserEdit">
      <h1>Créez votre profil de tatoueur</h1>
      <h2>Creez votre compte</h2>
      <form onSubmit={addProfil}>
        <div className="group">
          <label htmlFor="pseudo_user">Pseudo d'artiste</label>
          <input type="text" name="pseudo_user" onChange={(event) => {
              setPseudoUser(event.target.value);
            }} />
        </div>
        <div className="group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={(event) => {
              setEmail(event.target.value);
            }}  />
        </div>
        <div className="group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" onChange={(event) => {
              setPassword(event.target.value);
            }}  />
        </div>
        <h2>Vos Coordonnées</h2>
        <div className="group">
          <label htmlFor="email_contact">Email de contact</label>
          <input type="email" name="email_contact" onChange={(event) => {
              setEmailContact(event.target.value);
            }}  />
        </div>
        <div className="group">
          <label htmlFor="tel">Telephone</label>
          <input type="tel" name="tel" onChange={(event) => {
              setTel(event.target.value);
            }}  />
        </div>
        <div className="group">
          <label htmlFor="city">Localisation</label>
          {/* <SearchForm/> */}
          <Cities onChange={(event) => {
              setCity(event.target.value);
            }}  />
        </div>

        {/* <div className="group">
          <label htmlFor="departement">Département</label>
          <Departements onChange={(event) => {
              setDepartement(event.target.value);
            }}  />
        </div> */}
        <div className="group">
          <label htmlFor="instagram">Url instagram</label>
          <input type="text" name="instagram" onChange={(event) => {
              setInstagram(event.target.value);
            }}  />
        </div>
        <div className="group">
          <label htmlFor="description">Décrivez-vous: </label>
          <input type="textarea" name="description" onChange={(event) => {
              setDescription(event.target.value);
            }}  />
        </div>

        <div className="group">
          Quel est ton style graphique ?
          {artstyles.map((artstyle) => (
            <div key={artstyle.id} className="mb-3">
              <Form.Check
                inline
                label={artstyle.name}
                name="artStyle_id"
                type="checkbox"
                id={`default-${artstyle.artstyle_id}`}
                value={artstyle.artstyle_id}
                onChange={handleCheckboxChange}
              />
            </div>
          ))}
        </div>
        {/* <div>Valeurs sélectionnées : {JSON.stringify(selectedArtStyles)}</div> */}
        <div className="group">
          <label htmlFor="img_profil">Photo de profil</label>
          <input type="file" id="fileInput" name="img_profil" onChange={changeHandler}/>
        </div>
        <div className="group">
          <button type="submit">Creer</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
