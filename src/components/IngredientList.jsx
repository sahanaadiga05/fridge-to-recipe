import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightLeft, Minus, Plus } from "lucide-react";

function getIngredientIcon(name) {
  const value = name.toLowerCase();

  if (value.includes("egg")) return "🥚";
  if (value.includes("rice")) return "🍚";
  if (value.includes("tomato")) return "🍅";
  if (value.includes("onion")) return "🧅";
  if (value.includes("cheese")) return "🧀";
  if (value.includes("bread")) return "🍞";
  if (value.includes("chicken")) return "🍗";
  if (value.includes("potato")) return "🥔";
  if (value.includes("carrot")) return "🥕";
  if (value.includes("mushroom")) return "🍄";
  if (value.includes("pea") || value.includes("bean")) return "🫛";
  if (value.includes("pepper") || value.includes("capsicum")) return "🫑";
  if (value.includes("milk") || value.includes("cream")) return "🥛";
  if (value.includes("pasta") || value.includes("noodle")) return "🍝";

  return "🥣";
}

function IngredientList({
  ingredients,
  recipeServings,
  servings,
  onServingsChange,
  swappedIngredients,
  ingredientAmountOverrides,
  onIngredientAmountChange,
  openSwap,
  onOpenSwap,
  onChooseSwap,
}) {
  const scaleIngredient = (ingredient) => {
    const scaledAmount = ingredient.amount * (servings / recipeServings);
    return Number.isInteger(scaledAmount) ? scaledAmount : scaledAmount.toFixed(1);
  };

  const formatAmount = (amount) => (Number.isInteger(amount) ? amount : amount.toFixed(1));

  return (
    <article className="dashboard-card ingredinets-card">
      <div className="card-heading">
        <div>
          <p className="card-label">Ingredients</p>
          <h3>For your table</h3>
        </div>

        <div className="servings-control">
          <button
            type="button"
            onClick={() => onServingsChange(Math.max(1, servings - 1))}
            aria-label="Decrease servings"
          >
            <Minus size={17} />
          </button>
          <span>{servings} servings</span>
          <button
            type="button"
            onClick={() => onServingsChange(servings + 1)}
            aria-label="Increase servings"
          >
            <Plus size={17} />
          </button>
        </div>
      </div>

      <ul className="ingredient-list">
        {ingredients.map((ingredient) => {
          const currentName = swappedIngredients[ingredient.name] || ingredient.name;
          const scaledAmount = Number(scaleIngredient(ingredient));
          const currentAmount = ingredientAmountOverrides[ingredient.name] ?? scaledAmount;

          return (
            <li key={ingredient.name} className="ingredient-item">
              <span className="ingredient-icon" aria-hidden="true">
                {getIngredientIcon(currentName)}
              </span>

              <div className="ingredient-name ingredient-details">
                <span>{currentName}</span>
                <small>{formatAmount(currentAmount)} {ingredient.unit}</small>
              </div>

              {ingredient.swaps?.length > 0 && (
                <div className="swap-area">
                  <button
                    type="button"
                    className="swap-toggle"
                    onClick={() => onOpenSwap(openSwap === ingredient.name ? null : ingredient.name)}
                  >
                    <ArrowRightLeft size={14} />
                    Swap
                  </button>

                  <AnimatePresence>
                    {openSwap === ingredient.name && (
                      <motion.div
                        className="swap-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        {ingredient.swaps.map((swap) => (
                          <button
                            type="button"
                            key={swap}
                            onClick={() => onChooseSwap(ingredient.name, swap)}
                          >
                            {swap}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="ingredient-amount-control">
                <button
                  type="button"
                  onClick={() => onIngredientAmountChange(ingredient.name, currentAmount, -0.5)}
                  aria-label={`Decrease ${currentName}`}
                >
                  <Minus size={15} />
                </button>
                <strong>{formatAmount(currentAmount)}</strong>
                <button
                  type="button"
                  onClick={() => onIngredientAmountChange(ingredient.name, currentAmount, 0.5)}
                  aria-label={`Increase ${currentName}`}
                >
                  <Plus size={15} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default IngredientList;
