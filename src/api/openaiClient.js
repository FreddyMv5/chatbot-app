// src/api/openaiClient.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.API_KEY, // Usa tu clave desde .env
});

const openai = new OpenAIApi(configuration);

export default openai;
