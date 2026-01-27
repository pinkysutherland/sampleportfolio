
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string, context: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are the AI assistant for a web developer's portfolio. 
        The developer is a new professional specializing in clean HTML, CSS, and JS. 
        Keep answers helpful, encouraging, and technically sound but accessible. 
        Context about the developer: ${context}`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to my creative circuits. Please try again in a moment!";
  }
};

export const generateProjectIdea = async (techStack: string[]) => {
  const prompt = `Suggest a unique, small-scale web project idea that specifically highlights ${techStack.join(", ")}. 
  Provide a catchy title and a 2-sentence description of the goal. Format as JSON with "title" and "description" keys.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Project Idea Error:", error);
    return {
      title: "Interactive Dashboard",
      description: "A clean dashboard concept focusing on CSS Grid and vanilla JS data manipulation."
    };
  }
};
