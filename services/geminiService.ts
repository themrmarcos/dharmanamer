import { GoogleGenAI, Type } from "@google/genai";
import { SourceText, NameSuggestion } from "../types";

const apiKey = process.env.API_KEY;

// Initialize the client strictly with the API key from env
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateNameSuggestions = async (
  description: string,
  source: SourceText
): Promise<NameSuggestion[]> => {
  
  const prompt = `
    I need creative and culturally resonant app name suggestions based on Indian culture and scriptures.
    
    App Description: "${description}"
    Preferred Source: "${source === SourceText.ALL ? 'Any major Indian scripture (Gita, Ramayana, Mahabharata, Vedas)' : source}"
    
    Tasks:
    1. Generate 6-8 unique names.
    2. Names should be catchy, suitable for modern branding, but deeply rooted in Sanskrit/Hindi.
    3. Provide the Devanagari script for the name.
    4. Explain the meaning and the specific origin (e.g., specific Book/Kanda/Chapter if possible).
    5. Explain why it fits the app description (Rationale).
    
    The output must be a valid JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              englishName: { type: Type.STRING, description: "The name in English characters" },
              sanskritName: { type: Type.STRING, description: "The name in Devanagari script" },
              meaning: { type: Type.STRING, description: "Literal translation of the word" },
              origin: { type: Type.STRING, description: "Source text reference (e.g. Gita 2.47)" },
              rationale: { type: Type.STRING, description: "Why this fits the brand" },
              tags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "3 short keywords describing the vibe (e.g. 'Strength', 'Wisdom')"
              }
            },
            required: ["englishName", "sanskritName", "meaning", "origin", "rationale", "tags"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from AI");
    }
    
    const parsed = JSON.parse(text) as NameSuggestion[];
    return parsed;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate names. Please try again.");
  }
};