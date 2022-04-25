import axios from "axios";
import CONSTANTS from "./Constants";
/**
 *
 * @param {String} url
 * @param {import("axios").AxiosRequestConfig} options
 * @returns
 */
const getCall = async function (url, options = {}) {
  try {
    const result = await axios.get(CONSTANTS.URL + url, options);
    return result.data;
  } catch (error) {
    return null;
  }
};
/**
 *
 * @param {String} url
 * @param {any} data
 * @param {import("axios").AxiosRequestConfig} options
 * @returns
 */
const postCall = async function (url, data = {}, options = {}) {
  try {
    return await axios.post(CONSTANTS.URL + url, data, options);
  } catch (error) {
    return null;
  }
};
/**
 *
 * @param {String} url
 * @param {any} options
 * @returns
 */

const deleteCall = async function (url, options = {}) {
  try {
    return await axios.delete(CONSTANTS.URL + url, options);
  } catch (error) {
    return null;
  }
};
/**
 *
 * @param {String} url
 * @param {any} data
 * @param {import("axios").AxiosRequestConfig} options
 * @returns
 */
const putCall = async function (url, data = {}, options = {}) {
  try {
    return await axios.put(CONSTANTS.URL + url, data, options);
  } catch (error) {
    return null;
  }
};
export { getCall, postCall, deleteCall, putCall };
