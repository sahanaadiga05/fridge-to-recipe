import { useEffect, useRef, useState } from "react";
import LandingPage from "./components/LandingPage";
import IngredientInput from "./components/IngredientInput";
import RecipeKitchenScene from "./components/RecipeKitchenScene";
import RecipeDashboard from "./components/RecipeDashboard";
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
      <RecipeKitchenScene
        value={ingredientsInput}
        onChange={setIngredientsInput}
        onSubmit={generateRecipe}
        isLoading={isLoading}
      />
      <section className="recipe-results-layer" aria-live="polite">
        {isLoading && (
          <div className="recipe-status-card">
            <span className="recipe-status-spinner" />
            <p>Creating your recipe from the ingredients you shared...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="recipe-status-card recipe-status-error">
            <p>{error}</p>
            <button type="button" onClick={generateRecipe}>Try again</button>
          </div>
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
      </section>
    </main>
  );
}

export default App;
