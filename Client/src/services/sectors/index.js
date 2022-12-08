import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../apiMessages";

// CONSTANT BASE URL YOU CAN GET IT FROM {process.env} AS WELL IF YOU WANT
const BASE_URL = "http://localhost:5000";

export default class SectorService {
  // GET ALL SECTORS API
  static getAllSectors() {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${BASE_URL}/sector`)
          .then((response) => response.json())
          .then((response) =>
            resolve({
              error: false,
              message: SUCCESS_MESSAGES.FETCH_SECTOR,
              data: response,
            })
          )
          .catch((err) =>
            reject({
              error: true,
              message: ERROR_MESSAGES.FETCH_SECTOR,
              data: null,
            })
          );
      } catch (err) {
        reject({
          error: true,
          message: ERROR_MESSAGES.FETCH_SECTOR,
          data: null,
        });
      }
    });
  }

  // GET SPECIFIC SECTOR BY ID API
  static getSectorById(id) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${BASE_URL}/sector/${id}`)
          .then((response) => response.json())
          .then((response) =>
            resolve({
              error: false,
              message: SUCCESS_MESSAGES.FETCH_SECTOR,
              data: response,
            })
          )
          .catch((err) =>
            reject({
              error: true,
              message: ERROR_MESSAGES.FETCH_SECTOR,
              data: null,
            })
          );
      } catch (err) {
        reject({
          error: true,
          message: ERROR_MESSAGES.FETCH_SECTOR,
          data: null,
        });
      }
    });
  }

  // ADD SECTOR API
  static addSector(body) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${BASE_URL}/sector/addsector`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((response) =>
            resolve({
              error: false,
              message: SUCCESS_MESSAGES.ADD_SECTOR,
              data: response,
            })
          )
          .catch((error) =>
            reject({
              error: true,
              message: ERROR_MESSAGES.ADD_SECTOR,
              data: error,
            })
          );
      } catch (error) {
        reject({
          error: true,
          message: ERROR_MESSAGES.ADD_SECTOR,
          data: error,
        });
      }
    });
  }

  // UPDATE SECTOR API
  static updateSector(id, body) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${BASE_URL}/sector/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((response) =>
            resolve({
              error: false,
              message: SUCCESS_MESSAGES.UPDATE_SECTOR,
              data: response,
            })
          )
          .catch((err) =>
            reject({
              error: true,
              message: ERROR_MESSAGES.UPDATE_SECTOR,
              data: null,
            })
          );
      } catch (err) {
        reject({
          error: true,
          message: ERROR_MESSAGES.UPDATE_SECTOR,
          data: null,
        });
      }
    });
  }
}
