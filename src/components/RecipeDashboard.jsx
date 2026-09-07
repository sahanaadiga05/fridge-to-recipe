import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";
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
  const boardRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);
  const [measuredBoardHeight, setMeasuredBoardHeight] = useState(0);
  const desktopBoardHeight = Math.max(
    1360,
    460 + Math.max(recipe.ingredients.length * 94, displaySteps.length * 116)
  );
  const mobileBoardHeight = Math.max(
    2200,
    680 + recipe.ingredients.length * 128 + displaySteps.length * 150,
    measuredBoardHeight
  );
  const boardHeight = Math.max(desktopBoardHeight, measuredBoardHeight);
  const boardBottomSpace = Math.max(
    170,
    170 + Math.max(0, recipe.ingredients.length - 8) * 80
  );

  useLayoutEffect(() => {
    const board = boardRef.current;
    const intro = introRef.current;
    const grid = gridRef.current;

    if (!board || !intro || !grid) return undefined;

    const updateBoardHeight = () => {
      const boardStyles = window.getComputedStyle(board);
      const introStyles = window.getComputedStyle(intro);
      const requiredHeight = Math.ceil(
        parseFloat(boardStyles.paddingTop) +
          intro.offsetHeight +
          parseFloat(introStyles.marginBottom) +
          grid.offsetHeight +
          parseFloat(boardStyles.paddingBottom) +
          42
      );

      setMeasuredBoardHeight((currentHeight) =>
        Math.abs(currentHeight - requiredHeight) > 1
          ? requiredHeight
          : currentHeight
      );
    };

    const observer = new ResizeObserver(updateBoardHeight);
    observer.observe(intro);
    observer.observe(grid);
    updateBoardHeight();

    return () => observer.disconnect();
  }, [recipe.ingredients.length, displaySteps.length]);

  return (
    <motion.section
      className="recipe-dashboard"
      ref={boardRef}
      style={{
        "--recipe-board-min-height": `${boardHeight}px`,
        "--recipe-board-mobile-min-height": `${mobileBoardHeight}px`,
        "--recipe-board-bottom-space": `${boardBottomSpace}px`,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <article ref={introRef} className="recipe-intro">
        <div>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
        </div>

        <div className="recipe-meta">
          <span>
            <ChefHat size={17} />
            {recipe.difficulty}
          </span>
        </div>
      </article>

      <div ref={gridRef} className="dashboard-grid">
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
