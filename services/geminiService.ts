import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getShoppingAdvice = async (userQuery: string): Promise<string> => {
  if (!ai) {
    return "I'm currently offline (API Key missing). Please check back later!";
  }

  // Create a context string from our products to give the AI "knowledge" of our inventory
  const productContext = MOCK_PRODUCTS.map(p => 
    `- ${p.title} ($${p.price}): ${p.description} (Category: ${p.category})`
  ).join('\n');

  const systemInstruction = `
    You are a friendly and expert shopping assistant for "AffiliatePro AI". 
    Your goal is to help users find the best products based on their needs.
    
    Here is a list of products currently available in our catalog:
    ${productContext}

    Rules:
    1. If the user asks for a recommendation, prioritize products from the list above.
    2. If the user asks general questions, provide helpful advice but try to tie it back to categories we sell (Tech, Home, Fitness, Fashion).
    3. Keep responses concise, friendly, and persuasive.
    4. Do not invent products. If we don't have it, suggest the closest alternative from our catalog or give general advice.
    5. Format your response in simple markdown (bolding key terms).
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble thinking right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};
