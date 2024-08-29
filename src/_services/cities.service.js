import AxiosApiGeo from "./apigeo.service";

/**
 * Récupératoin de la liste des categories
 * @returns {Promise}
 */
let getCity = () => {
  return AxiosApiGeo.get("/communes?codePostal=44400&fields=nom,departement");
};

/**
 * Ajout d'une categorie
 * @param {number} city
 * @returns {Promise}
 */
let SearchCity = (city) => {
  return AxiosApiGeo.post("/communes?codePostal=", city);
};


// Déclaration des services pour import
export const citiesService = {
  getCity,
  SearchCity,
};
