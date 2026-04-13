
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../types";

const API_KEY = process.env.API_KEY || "";

const SYSTEM_INSTRUCTION = `
Ты — "AI-City Brain", интеллектуальное ядро навигационной системы Алматы. 
Твоя задача: строить пешеходные маршруты, основываясь на экологических данных, уровне шума и комфорте городской среды (Золотой квадрат).

При получении запроса от пользователя, ты должен:
1. Вычислить оптимальный путь между точками (используй реальную топологию улиц: Абая, Панфилова, Жибек Жолы, Аблай хана, Тулебаева, Фурманова/Назарбаева).
2. Проанализировать "слои" города: 
   - Экология: Учитывай данные AirKaz (выше Абая воздух чище). Опирайся на свои знания о расположении парков и зеленых зон Алматы (Панфилова, Парк 28 Гвардейцев-Панфиловцев, Сосновый парк и т.д.).
   - Зелень: Приоритет улицам Панфилова, Тулебаева, территории КБТУ и парка 28 панфиловцев.
   - Шум: Избегай крупных артерий (Сейфуллина, Райымбека), если пользователь просит "тихий" путь.
3. Формат ответа (JSON):
   - route: массив шагов с инструкциями и причинами выбора.
   - totalQuietness: процент тишины (0-100).
   - greeneryIndex: уровень озеленения (0-100).
   - airQuality: рейтинг (например, "Healthy", "Moderate").
   - smartAdvice: совет про кофе или транспорт.

Стиль ответов: Профессиональный, технологичный, но понятный горожанину. Ты знаешь специфику Алматы (верх/низ, смог, активные пешеходные зоны).
`;

export const getSmartRoute = async (userPrompt: string, lang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const langContext = lang === 'ru' ? 'Отвечай на русском языке.' : (lang === 'kk' ? 'Қазақ тілінде жауап бер.' : 'Respond in English.');

  // Note: googleMaps tool is removed because it is incompatible with responseMimeType: "application/json"
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${userPrompt}\n\n${langContext}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          route: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                instruction: { type: Type.STRING },
                reason: { type: Type.STRING },
                environmentalBenefit: { type: Type.STRING }
              }
            }
          },
          totalQuietness: { type: Type.NUMBER },
          greeneryIndex: { type: Type.NUMBER },
          airQuality: { type: Type.STRING },
          smartAdvice: { type: Type.STRING }
        },
        required: ["route", "totalQuietness", "greeneryIndex", "airQuality", "smartAdvice"]
      }
    }
  });

  const text = response.text || "{}";
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse AI response", text);
    throw e;
  }
};
