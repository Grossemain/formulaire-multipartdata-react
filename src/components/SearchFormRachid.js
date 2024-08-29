import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeposerPlace = () => {
    const useridrecup = 1
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // codePostal: "",
    city: "",
    departement: "",
  });

  const [suggestedCities, setSuggestedCities] = useState([]);


  const handlePlaceSearch = async (e) => {
    const searchQuery = e.target.value;
    setFormData((prev) => ({
      ...prev,
      address: searchQuery,
    }));

    if (searchQuery.length >= 3) {
      try {
        const response = await axios.get(
          `https://api-adresse.data.gouv.fr/search/?q=${searchQuery}&limit=1`
        );
        setSuggestedCities(response.data.features || []);
      } catch (error) {
        console.error("Erreur lors de la recherche adresse", error);
      }
    } else {
      setSuggestedCities([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("MON USER ID:", useridrecup);
    if (!useridrecup) {
      console.error("Erreur : ID utilisateur non disponible");
      Notification.error("ID utilisateur non disponible");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("codePostal", formData.codePostal);
      formDataToSend.append("ville", formData.city);
      formDataToSend.append("departement", formData.departement);


      await axios.post("http://127.0.0.1:8000/api/places", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");

      setFormData({
        codePostal: "",
        city: "",
        departement: "",
      });
    } catch (error) {
      console.error(
        "Erreur lors de la création de ville  + departement:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-72 w-1/2">
      <h1 className="text-3xl font-bold mb-8 text-black">Déposer une place</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="codePostal"
          >
            Code Postal
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="codePostal"
            type="text"
            placeholder="Rechercher par code postal"
            name="codePostal"
            value={formData.codePostal || ""}
            onChange={handlePlaceSearch}
            required
          />
          {suggestedCities.length > 0 && (
            <ul className="shadow border rounded mt-2 w-full bg-white">
              {suggestedCities.map((city) => (
                <li
                  key={city.properties.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      codePostal: city.code,
                      city: city.nom,
                      departement: city.departement,
                    }));
                    setSuggestedCities([]);
                  }}
                >
                  {city.nom}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            Ville
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="Ville"
            name="city"
            value={formData.city || ""}
            onChange={(event) => {
                setFormData(event.target.value);
              }} 
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Departement"
          >
            Departement
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Departement"
            type="text"
            placeholder="Departement"
            name="Departement"
            value={formData.Departement || ""}
            onChange={(event) => {
                setFormData(event.target.value);
              }} 
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Déposer
        </button>
      </form>
    </div>
  );
};

export default DeposerPlace;