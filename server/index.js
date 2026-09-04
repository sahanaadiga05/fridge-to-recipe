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

app.post("/api/generate-recipe", async(request, response) =>{
    const ingredients = request.body?.ingredients?.trim();

    if(!ingredients){
        return response.status(400).json({
            error:"please add at least one ingredient.",
        });
    }

    try{
        const result = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input:`you are the JSON API for a ecipe application.
        Create one practical recipe using: ${ingredients}
        Return ONLY valid JSON. Do not use Markdown or \`\`\`json code blocks.
        use exactly this structure:
        {
            "title":"recipe name",
            "description": "short appetising description",
            "servings":2,
            "time":"25 min",
            "difficulty":"Easy",
            "ingredients":[
            {
                "name":"Eggs",
                "amount":2,
                "unit": "pieces",
                "swaps":["tofy", "paneer"]
            }],
            "steps":[""Prepare the ingredients.",
            "Cook everything in the pan.",
            "Serve the finished recipe."]
        }

        Rules:
        - Include 3 to 9 cooking steps.
        - Include at least 2 ingredients.
        - Every ingredient needs 1 to 3 realistic swaps.
        - Use numbers for amount and text for unit.`,
        
        });

        const jsonText = result.output_text
        .replace(/^```json\s*/i,"")
        .replace(/\s*```$/,"")
        .trim();
        
        const parsedRecipe = recipeSchema.parse(JSON.parse(jsonText));
        

        return response.json(parsedRecipe);
    } catch(error){
        console.error("Recipe generation failed:", error.message);

        return response.status(502).json({
            error:"We could not create a recipe right now. Please try again.",
        });
    }
});

app.listen(port, () =>{
    console.log(`Recipe API running at http://localhost:${port}`);
});