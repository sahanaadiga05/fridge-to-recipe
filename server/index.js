import "dotenv/config";
import cors from "cors";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const RESPONSE_LIMIT_MS = 7400;

const recipeSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    servings: z.number().int().min(1).max(12),
    time: z.string().min(2),
    difficulty: z.enum(["Easy", "Medium","Advanced"]),
    ingredients: z.array(
        z.object({
            name: z.string().min(1),
            amount: z.number().positive(),
            unit: z.string(),
            swaps: z.array(z.string()).min(1).max(3),
        })
    ).min(2),
    steps: z.array(z.string().min(5)).min(3).max(8),

});

const recipeJsonSchema = {
    type: "object",
    properties:{
        title: { type: "string"},
        description : {type: "string"},
        servings : { type: "integer"},
        time:{ type: "string"},
        difficulty: {
            type: "string",
            enum:["Easy", "Medium","Advanced"],
        },
        ingredients :{
            type: "array",
            items:{
                type:"object",
                properties:{
                    name: {type :"string"},
                    amount :{type : "number"},
                    unit: { type: "string"},
                    swaps :{
                        type:"array",
                        items:{type: "string"},
                    },
                },
                required:["name", "amount","unit" ,"swaps"],
            },
        },
        steps:{
            type:"array",
            items:{type : "string"},
        },
    },
    required :[
        "title",
        "description",
        "servings",
        "time",
        "difficulty",
        "ingredients",
        "steps",
    ],
};

function parseRecipeOutput(output) {
    const jsonText = output
        .replace(/^```json\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();

    return recipeSchema.parse(JSON.parse(jsonText));
}

async function requestRecipeOutput(input) {
    const result = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: recipeJsonSchema,
        },
        generation_config: {
            max_output_tokens: 750,
            temperature: 0.35,
            thinking_level: "minimal",
        },
    });

    return result.output_text;
}

async function generateValidatedRecipe(ingredients) {
    const recipePrompt = `Create one realistic recipe using: ${ingredients}.
Choose the dish from the ingredients, then return JSON only.
Use the supplied ingredients as the main ingredients; pantry basics such as salt, pepper, oil, water, and dry spices are allowed when useful.
Include 2 servings, 2 to 7 ingredients, 1 to 3 swaps for every ingredient, and 5 to 7 complete steps.
Steps must match the chosen dish: assemble sandwiches, blend smoothies, and cook fried rice appropriately. Do not chop bread or cook ingredients that should remain raw.
Check that the title, ingredients, and instructions make sense together before responding.`;

    let firstOutput = "";

    try {
        firstOutput = await requestRecipeOutput(recipePrompt);
        return parseRecipeOutput(firstOutput);
    } catch (firstError) {
        const repairPrompt = `Return ONLY valid JSON for a realistic recipe using: ${ingredients}.
The previous response was invalid or did not match the recipe schema. Repair it now.
Make the dish and instructions specific to the available ingredients, with 5 to 7 complete steps and swaps for every ingredient.
Do not use generic pan-cooking instructions unless the dish truly needs them.
Invalid response to repair: ${firstOutput || "No usable JSON was returned."}`;

        const repairedOutput = await requestRecipeOutput(repairPrompt);
        return parseRecipeOutput(repairedOutput);
    }
}

app.post("/api/generate-recipe", async(request, response) =>{
    const ingredients = request.body?.ingredients?.trim();

    if(!ingredients){
        return response.status(400).json({
            error:"please add at least one ingredient.",
        });
    }

    try{
        const recipe = await Promise.race([
            generateValidatedRecipe(ingredients),
            new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Recipe generation timed out.")), RESPONSE_LIMIT_MS);
            }),
        ]);

        return response.json(recipe);
    } catch(error){
        console.error("Recipe generation failed:", error.message);
        return response.status(502).json({
            error: "We could not create a complete recipe right now. Please try again.",
        });
    }
});

app.listen(port, () =>{
    console.log(`Recipe API running at http://localhost:${port}`);
});
