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

const RESPONSE_LIMIT_MS = 15000;

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
    ).min(2).max(20),
    steps: z.array(z.string().min(5)).min(4).max(10),

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

function assertCleanRecipeText(value, field) {
    const forbiddenFormatting = /```|\*\*|__|<[^>]*>|<\/?(?:html|svg)\b|[\u{1F300}-\u{1FAFF}]/u;

    if (forbiddenFormatting.test(value)) {
        throw new Error(`${field} contains formatting that the UI cannot render safely.`);
    }
}

function validateRecipeContent(recipe) {
    assertCleanRecipeText(recipe.title, "Recipe title");
    assertCleanRecipeText(recipe.description, "Recipe description");

    recipe.ingredients.forEach((ingredient) => {
        assertCleanRecipeText(ingredient.name, "Ingredient name");
        assertCleanRecipeText(ingredient.unit, "Ingredient unit");
        ingredient.swaps.forEach((swap) => assertCleanRecipeText(swap, "Ingredient swap"));
    });

    recipe.steps.forEach((step) => {
        assertCleanRecipeText(step, "Recipe step");

        if (/^\s*(?:\d+\s*[.)\-:]|[-*])\s*/.test(step)) {
            throw new Error("Recipe steps must not include their own numbering or bullet points.");
        }
    });

    return recipe;
}

function parseRecipeOutput(output) {
    const jsonText = output
        .replace(/^```json\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();

    return validateRecipeContent(recipeSchema.parse(JSON.parse(jsonText)));
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
            max_output_tokens: 1200,
            temperature: 0.35,
            thinking_level: "minimal",
        },
    });

    return result.output_text;
}

async function generateValidatedRecipe(ingredients) {
    const recipeRules = `Choose the most appropriate dish that can truly be made from the supplied ingredients.
Give it a title that matches that specific dish, not a generic recipe title.
Use every major supplied ingredient where sensible, and make sure every ingredient in the recipe list is used in the steps.
If oil, salt, pepper, water, or spices are needed, list them as pantry staples in the ingredient list with practical quantities.
Use practical cooking quantities: prefer 1 onion, 1/2 onion, 2 eggs, 1/2 cup cheese, or 1 tablespoon oil. Avoid awkward values such as 0.3 onion or 1.5 eggs unless absolutely necessary.
Return 2 servings, 2 to 20 ingredients, 1 to 3 useful swaps per ingredient, and 5 to 8 complete steps.
The cooking method must match the dish. Assemble sandwiches, blend smoothies, and cook fried rice appropriately. Do not chop bread, fry lettuce, or cook normally raw ingredients unless the chosen dish specifically needs it.
Each step must be a clear action in sequence. Return clean step text only: no step numbers, bullets, markdown, emojis, HTML, SVG, or formatting characters. The frontend supplies the step numbers.
Before responding, check that the title matches the dish, the ingredient list matches every step, the quantities are practical, and there are no contradictory or unnecessary steps.
Example: cooked rice, eggs, tomato, onion, and cheese should produce a cheesy tomato egg fried rice with practical amounts such as 4 cups cooked rice, 2 eggs, 1 tomato, 1/2 onion, and 1/2 cup cheese.`;

    const recipePrompt = `Create one realistic recipe using: ${ingredients}.
Return JSON only and follow every rule below.
${recipeRules}`;

    let firstOutput = "";

    try {
        firstOutput = await requestRecipeOutput(recipePrompt);
        return parseRecipeOutput(firstOutput);
    } catch (firstError) {
        const repairPrompt = `Return ONLY valid JSON for a realistic recipe using: ${ingredients}.
The previous response was malformed or incomplete. Create a new complete recipe from scratch; do not repeat or explain the failure.
${recipeRules}`;

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
