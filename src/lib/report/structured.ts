import { getOpenAI, VISION_MODEL } from "@/lib/openai";

type Schema = Record<string, unknown>;

export const str = (description?: string): Schema =>
  description ? { type: "string", description } : { type: "string" };

export const arr = (items: Schema, description?: string): Schema =>
  description ? { type: "array", items, description } : { type: "array", items };

export const enm = (values: readonly string[]): Schema => ({ type: "string", enum: [...values] });

export const obj = (properties: Record<string, Schema>): Schema => ({
  type: "object",
  properties,
  required: Object.keys(properties),
  additionalProperties: false,
});

export async function structuredCall<T>(options: {
  name: string;
  schema: Schema;
  system: string;
  user: string;
  maxTokens: number;
  temperature?: number;
}): Promise<T> {
  const completion = await getOpenAI().chat.completions.create({
    model: VISION_MODEL,
    temperature: options.temperature ?? 0.4,
    max_completion_tokens: options.maxTokens,
    response_format: {
      type: "json_schema",
      json_schema: { name: options.name, strict: true, schema: options.schema },
    },
    messages: [
      { role: "system", content: options.system },
      { role: "user", content: options.user },
    ],
  });

  const message = completion.choices[0]?.message;
  if (message?.refusal) throw new Error(`Model refused: ${message.refusal}`);
  if (completion.choices[0]?.finish_reason === "length") {
    throw new Error(`${options.name} output was truncated`);
  }
  return JSON.parse(message?.content || "{}") as T;
}
