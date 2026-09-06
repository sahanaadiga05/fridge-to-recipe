import IngredientInput from "./IngredientInput";

const icons = [
  ["pot", 42, 58], ["pan", 168, 52], ["kettle", 292, 57], ["cup", 421, 50], ["mixer", 546, 47], ["knife", 690, 51], ["utensils", 811, 47],
  ["cup", 94, 184], ["kettle", 217, 183], ["pot", 342, 188], ["pan", 482, 180], ["mixer", 625, 176], ["utensils", 753, 181], ["knife", 890, 177],
  ["microwave", 31, 307], ["toaster", 158, 304], ["cup", 292, 310], ["pot", 396, 300], ["pan", 542, 307], ["kettle", 666, 302], ["utensils", 803, 305],
  ["mixer", 95, 435], ["knife", 222, 432], ["pot", 365, 439], ["microwave", 502, 433], ["toaster", 648, 437], ["cup", 778, 429], ["pan", 893, 435],
  ["utensils", 37, 566], ["kettle", 177, 568], ["mixer", 315, 560], ["knife", 457, 569], ["cup", 580, 563], ["toaster", 716, 563], ["pot", 856, 564],
];

function RecipeKitchenScene({ value, onChange, onSubmit, isLoading }) {
  return (
    <section className="recipe-kitchen-scene" aria-label="Recipe kitchen">
      <svg className="kitchen-icon-pattern" viewBox="0 0 1000 680" preserveAspectRatio="xMidYMid slice">
        <defs>
          <symbol id="pot" viewBox="0 0 80 80"><path d="M16 29h48v33H16zM11 34h5v18h-5M64 34h5v18h-5M24 22h32M31 15h18" /></symbol>
          <symbol id="pan" viewBox="0 0 90 80"><circle cx="35" cy="40" r="21" /><path d="M55 27l25-14M76 11l7 8" /></symbol>
          <symbol id="kettle" viewBox="0 0 86 80"><path d="M18 60c0-25 12-39 27-39s27 14 27 39H18zM30 22c0-14 24-14 24 0M72 34h8v20h-8" /><circle cx="62" cy="25" r="3" /></symbol>
          <symbol id="cup" viewBox="0 0 80 80"><path d="M17 20h39v39H17zM56 28h11c7 0 7 19 0 19H56M13 61h49" /></symbol>
          <symbol id="mixer" viewBox="0 0 85 80"><path d="M19 63V28h37c9 0 13 7 13 15v20H19zM28 28V14h31v14M46 43v20M36 63h25" /><circle cx="59" cy="42" r="3" /></symbol>
          <symbol id="knife" viewBox="0 0 80 80"><path d="M20 66L61 17c7-8 12-2 7 7L28 70zM14 66l12 5" /></symbol>
          <symbol id="utensils" viewBox="0 0 80 80"><path d="M20 13v23M13 13v17c0 11 14 11 14 0V13M20 36v31M55 13v54M46 13c0 16 18 16 18 0" /></symbol>
          <symbol id="microwave" viewBox="0 0 90 80"><rect x="12" y="18" width="65" height="45" rx="3" /><rect x="20" y="27" width="34" height="26" rx="2" /><circle cx="65" cy="32" r="3" /><circle cx="65" cy="44" r="3" /></symbol>
          <symbol id="toaster" viewBox="0 0 84 80"><path d="M16 31h50v31H16zM24 31c0-15 34-15 34 0M25 43h32M71 38v15" /></symbol>
        </defs>
        <g className="kitchen-icon-strokes">
          {icons.map(([icon, x, y], index) => (
            <use key={`${icon}-${index}`} href={`#${icon}`} x={x} y={y} width="82" height="82" transform={`rotate(${(index % 5 - 2) * 4} ${Number(x) + 41} ${Number(y) + 41})`} />
          ))}
        </g>
      </svg>
      <h1 className="recipe-welcome-title">Let&apos;s Cook Something Amazing</h1>
      <IngredientInput
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </section>
  );
}

export default RecipeKitchenScene;
