import AxiosApiGeo from "./apigeo.service";

/**
 * Récupératoin de la liste des categories
 * @returns {Promise}
 */
let getAllDepartements = () => {
  return AxiosApiGeo.get("/departements?fields=nom,code");
};


// Déclaration des services pour import
export const departementsService = {
getAllDepartements,
};
