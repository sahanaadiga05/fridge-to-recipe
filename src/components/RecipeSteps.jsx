import { motion } from "framer-motion";
import { Check } from "lucide-react";

function RecipeSteps({ steps, completedSteps, onToggleStep }) {
  const progress = Math.round(
    (completedSteps.length / steps.length) * 100
  );

  return (
    <article className="dashboard-card steps-card">
      <div className="card-heading">
        <div>
          <p className="card-label">Cooking flow</p>
          <h3>Make it happen</h3>
        </div>

        <div className="progress-badge">{progress}%</div>
      </div>

      <div className="progress-track">
        <motion.div
          className="progress-fill"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <ol className="step-list">
        {steps.map((step, index) => {
          const isComplete = completedSteps.includes(index);

          return (
            <motion.li
              key={step}
              layout
              className={isComplete ? "complete" : ""}
            >
              <button
                type="button"
                onClick={() => onToggleStep(index)}
                className="step-check"
                aria-label={`Mark step ${index + 1} complete`}
              >
                {isComplete ? <Check size={16} /> : index + 1}
              </button>

              <span>{step}</span>
            </motion.li>
          );
        })}
      </ol>
    </article>
  );
}

export default RecipeSteps;