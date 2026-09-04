import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChefHat,
  CircleAlert,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import IngredientInput from "./components/IngredientInput";
import RecipeDashboard from "./components/RecipeDashboard";
import LandingPage from "./components/LandingPage";
import "./index.css";


function App() {
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(2);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [swappedIngredients, setSwappedIngredients] = useState({});
  const [openSwap, setOpenSwap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const activeRequestRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    return () => activeRequestRef.current?.abort();
  }, []);
  if (!hasStarted) {
  return <LandingPage onGetStarted={() => setHasStarted(true)} />;
}

  const generateRecipe = async (event) => {
    event?.preventDefault();

    if (!ingredientsInput.trim()) {
      setError("Please tell us at least one ingredient.");
      return;
    }

    activeRequestRef.current?.abort();

    const controller = new AbortController();
    const requestId = requestIdRef.current + 1;

    activeRequestRef.current = controller;
    requestIdRef.current = requestId;

    setIsLoading(true);
    setError("");
    setRecipe(null);
    setCompletedSteps([]);
    setSwappedIngredients({});
    setOpenSwap(null);

    const timeoutId = window.setTimeout(() => controller.abort(), 60000);

    try {
      const apiResponse = await fetch(
        "http://localhost:3001/api/generate-recipe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: ingredientsInput }),
          signal: controller.signal,
        }
      );

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(data.error || "Recipe generation failed.");
      }

      if (requestId !== requestIdRef.current) return;

      setRecipe(data);
      setServings(data.servings);
    } catch (requestError) {
      if (requestError.name === "AbortError") {
        if (requestId === requestIdRef.current) {
          setError("The request took too long. Please try again.");
        }
        return;
      }

      if (requestId === requestIdRef.current) {
        setError(requestError.message || "Something went wrong. Please try again.");
      }
    } finally {
      window.clearTimeout(timeoutId);

      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const toggleStep = (index) => {
    setCompletedSteps((current) =>
      current.includes(index)
        ? current.filter((stepIndex) => stepIndex !== index)
        : [...current, index]
    );
  };

  const chooseSwap = (ingredientName, replacement) => {
    setSwappedIngredients((current) => ({
      ...current,
      [ingredientName]: replacement,
    }));
    setOpenSwap(null);
  };

  return (
    <main className="app-shell">
      <div className="ambient-orb orb-one" />
      <div className="ambient-orb orb-two" />

      <section className="hero">
        <motion.div
          className="brand"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="brand-icon">
            <ChefHat size={21} />
          </span>
          Fridge to Recipe
        </motion.div>

        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <p className="eyebrow">
            <Sparkles size={15} />
            Your fridge, reimagined
          </p>
          <h1>Turn leftovers into something worth making.</h1>
          <p>
            Tell us what is waiting in your fridge. We will shape it into a
            simple, flexible recipe.
          </p>
        </motion.div>

        <IngredientInput
          value={ingredientsInput}
          onChange={setIngredientsInput}
          onSubmit={generateRecipe}
          isLoading={isLoading}
        />
      </section>

      <AnimatePresence mode="wait">
        {!recipe && !isLoading && !error && (
          <motion.section
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <UtensilsCrossed size={34} />
            <h2>Your recipe will appear here.</h2>
            <p>Start with a few ingredients. Imperfect lists are welcome.</p>
          </motion.section>
        )}

        {isLoading && (
          <motion.section
            className="loading-state"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-pan">
              <ChefHat size={38} />
            </div>
            <h2>Creating your recipe...</h2>
            <p>Matching ingredients, balancing flavours, and setting the table.</p>
          </motion.section>
        )}

        {error && !isLoading && (
          <motion.section
            className="error-state"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CircleAlert size={34} />
            <h2>Recipe kitchen is taking a break.</h2>
            <p>{error}</p>
            <button type="button" onClick={generateRecipe}>
              Try again
            </button>
          </motion.section>
        )}

        {recipe && !isLoading && (
          <RecipeDashboard
            recipe={recipe}
            servings={servings}
            onServingsChange={setServings}
            completedSteps={completedSteps}
            onToggleStep={toggleStep}
            swappedIngredients={swappedIngredients}
            openSwap={openSwap}
            onOpenSwap={setOpenSwap}
            onChooseSwap={chooseSwap}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;