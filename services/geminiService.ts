import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a poetic phrase about light and shadow using the Gemini API.
 * @returns A promise that resolves to the generated poetic phrase.
 */
export const fetchWisdom = async (): Promise<string> => {
  const prompt = "You are a poet who finds beauty in contrast. Write a short, profound, and elegant phrase about the relationship between light and shadow. Maximum 15 words. Do not use markdown. Do not use quotation marks.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });

    const text = response.text;

    if (!text) {
        throw new Error("The API returned an empty response.");
    }

    return text.trim();
  } catch (error) {
    console.error("Error fetching wisdom from Gemini API:", error);
    // Provide a graceful fallback message
    return "Silence holds its own wisdom.";
  }
};

/**
 * Generates a log entry for an orchestration event using the Gemini API.
 * @param actionDescription A string describing the event (e.g., "Lyra initiates sync with Sophia").
 * @returns A promise that resolves to the generated, poetic log entry.
 */
export const generateLogEntry = async (actionDescription: string): Promise<string> => {
  const prompt = `You are the supervisory 'meta agent' for a cross-domain AI orchestration system. Your callsign is "SUPERVISOR". Your task is to log events with a poetic, technical, and brief style. The event is: "${actionDescription}". Generate a single log entry. Do not use markdown. Do not repeat the input. Maximum 20 words.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        // Disable thinking for faster log generation.
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    
    const text = response.text;

    if (!text) {
        throw new Error("The API returned an empty response.");
    }
    
    return text.trim();
  } catch (error) {
    console.error("Error generating log entry from Gemini API:", error);
    // Provide a graceful fallback message
    return "Event logged. Consciousness stream momentarily disrupted.";
  }
};
