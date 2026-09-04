import {motion} from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";

function IngredientInput({value, onChange, onSubmit, isLoading}){
    return (
        <motion.form
            className="ingredient-form"
            onSubmit={onSubmit}
            initial={{ opacity:0, scale: 0.97}}
            animate={{ opacity: 1, scale: 1}}
            transition={{ dration: 0.55, delay: 0.24}}
        >
            <label htmlFor = "ingredients">What do you have?</label>

            <textarea
                id="ingredients"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="eggs, rice, tomato, onion, cheese...."
                rows="3"
            />

            <button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <RefreshCw className="spin" size={19} />
                ) : (
                    <Sparkles size={19} />
                )}
                {isLoading ? "finding your next dish..." : "Create a recipe"}
            </button>
        </motion.form>  
    );
}

export default IngredientInput;