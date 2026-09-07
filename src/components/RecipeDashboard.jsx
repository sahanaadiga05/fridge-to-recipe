import { motion } from "framer-motion";
import { ChefHat, Clock3, Leaf } from "lucide-react";
import IngredientList from "./IngredientList";
import RecipeSteps from "./RecipeSteps";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyIngredientSwaps(steps, swappedIngredients) {
  const swaps = Object.entries(swappedIngredients).sort(
    ([firstName], [secondName]) => secondName.length - firstName.length
  );

  return steps.map((step) =>
    swaps.reduce(
      (updatedStep, [originalName, replacement]) =>
        updatedStep.replace(
          new RegExp(`\\b${escapeRegExp(originalName)}\\b`, "gi"),
          replacement
        ),
      step
    )
  );
}

function RecipeDashboard({
  recipe,
  servings,
  onServingsChange,
  completedSteps,
  onToggleStep,
  swappedIngredients,
  ingredientAmountOverrides,
  onIngredientAmountChange,
  openSwap,
  onOpenSwap,
  onChooseSwap,
}) {
  const displaySteps = applyIngredientSwaps(recipe.steps, swappedIngredients);

  return (
    <motion.section
      className="recipe-dashboard"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <article className="recipe-intro">
        <div>
          <p className="eyebrow">
            <Leaf size={15} />
            Made from your kitchen
          </p>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
        </div>

        <div className="recipe-meta">
          <span>
            <Clock3 size={17} />
            {recipe.time}
          </span>
          <span>
            <ChefHat size={17} />
            {recipe.difficulty}
          </span>
        </div>
      </article>

      <div className="dashboard-grid">
        <IngredientList
          ingredients={recipe.ingredients}
          recipeServings={recipe.servings}
          servings={servings}
          onServingsChange={onServingsChange}
          swappedIngredients={swappedIngredients}
          ingredientAmountOverrides={ingredientAmountOverrides}
          onIngredientAmountChange={onIngredientAmountChange}
          openSwap={openSwap}
          onOpenSwap={onOpenSwap}
          onChooseSwap={onChooseSwap}
        />

        <RecipeSteps
          steps={displaySteps}
          completedSteps={completedSteps}
          onToggleStep={onToggleStep}
        />
      </div>

    </motion.section>
  );
}

export default RecipeDashboard;
