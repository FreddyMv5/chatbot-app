// src/api/openai.js
import axios from "axios";

// Utilizamos las variables de entorno para mayor seguridad y flexibilidad.
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

/**
 * Envía una solicitud a la API de OpenAI.
 *
 * @param {string} userInput - El mensaje del usuario.
 * @returns {Promise<object>} - La respuesta de la API.
 */
export const sendOpenAIRequest = async (userInput) => {
  try {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    const response = await axios.post(API_URL, payload, { headers });
    return response.data; // Devuelve la respuesta completa de OpenAI
  } catch (error) {
    console.error(
      "Error en la solicitud a OpenAI:",
      error.response?.data || error
    );
    throw error;
  }
};
