
import { GoogleGenAI } from "@google/genai";
import { AISettings } from "../types";

const API_KEY = process.env.API_KEY || "";

export const transcribeAudio = async (
  base64Audio: string, 
  mimeType: string, 
  settings: AISettings
): Promise<string> => {
  if (!API_KEY) throw new Error("Klucz API nie jest skonfigurowany.");

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const formattingInstruction = settings.enableSmartFormatting 
    ? `ZASADY FORMATOWANIA:
       - Usuń absolutnie wszystkie "eee", "yyy", powtórzenia i zająknięcia.
       - Zastosuj perfekcyjną polską interpunkcję i ortografię.
       - Podziel tekst na logiczne akapity.
       - Jeśli użytkownik poprawił się w trakcie mówienia, zachowaj tylko ostateczną wersję myśli.`
    : `ZASADY: Przepisz tekst dosłownie, dbając jedynie o podstawową czytelność.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Audio,
              },
            },
            {
              text: `Jesteś ekspertem polskiej stenografii i transkrypcji AI. 
              Twoim zadaniem jest zamiana nagrania głosowego na czysty, profesjonalny tekst.
              Zwróć TYLKO czysty tekst transkrypcji, bez żadnych dodatkowych komentarzy.
              ${formattingInstruction}`,
            },
          ],
        },
      ],
      config: {
        temperature: 0.2,
      },
    });

    return response.text?.trim() || "Nie udało się rozpoznać mowy.";
  } catch (error: any) {
    console.error("Gemini Transcription Error:", error);
    throw new Error(error.message?.includes("429") ? "Zbyt wiele próśb. Poczekaj chwilę." : "Błąd procesora AI.");
  }
};

export const suggestTitle = async (content: string): Promise<string> => {
  if (!API_KEY || !content || content.length < 5) return "";
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `Na podstawie poniższej treści wymyśl krótki, chwytliwy polski tytuł (maksymalnie 4 słowa). 
      Zwróć TYLKO tytuł. Treść: "${content.substring(0, 500)}"`,
    });
    return response.text?.replace(/["*]/g, '').trim() || "";
  } catch (e) {
    return "";
  }
};

export const processAIAction = async (content: string, action: 'summarize' | 'tasks'): Promise<string> => {
  if (!API_KEY || !content) return "";
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompts = {
    summarize: "Przygotuj bardzo krótkie, konkretne podsumowanie poniższego tekstu w punktach (maksymalnie 3 punkty). Użyj języka polskiego.",
    tasks: "Wyciągnij z poniższego tekstu listę konkretnych zadań do wykonania. Zwróć je jako listę z myślnikami. Jeśli nie ma zadań, napisz 'Brak wykrytych zadań'."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `${prompts[action]}\n\nTreść: ${content}`,
    });
    return response.text?.trim() || "";
  } catch (e) {
    return "Błąd przetwarzania AI.";
  }
};
