/**
 * China × France wallpaper — China rooftop, French cloth text.
 */
/** Names hidden in the cloth — read left→right ("h") or top→bottom ("v"). */
const HIDDEN_NAMES = [
  { text: "Sakshi Rotake", row: 3, col: 4, dir: "h" },
  { text: "Radhika Gopal", row: 9, col: 14, dir: "h" },
  { text: "Bharati", row: 19, col: 18, dir: "h" },
  { text: "Kiran Rotake", row: 5, col: 38, dir: "v" },
  { text: "Saurabh Rotake", row: 11, col: 2, dir: "v" },
  { text: "Sanni", row: 14, col: 10, dir: "h" },
  { text: "Surajmukhi", row: 24, col: 20, dir: "h" },
  { text: "Sakshuiya", row: 12, col: 30, dir: "v" },
  { text: "Made with love", row: 34, col: 14, dir: "h" }
];

/** Name letters draw 10% larger than the surrounding cloth text (same font). */
const HIDDEN_NAME_SCALE = 1.1;

/** macOS system font (San Francisco) — this wallpaper only runs on a Mac. */
const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif';

export const COUNTRIES = {
  "china-france": {
    id: "china-france",
    name: "China × France",
    roof: "./roof-china.png",
    writing: "horizontal",
    gridW: 42,
    font: SYSTEM_FONT,
    fontScale: 1.2,
    cloth: [
      "Le voyage forme la jeunesse — mais c'est le retour qui révèle ce que le chemin a vraiment changé",
      "Partir c'est mourir un peu — et renaître un peu aussi dès que l'inconnu cesse d'être étranger",
      "Il n'est pas de vent favorable pour celui qui ne sait où il va — la boussole commence dans le désir",
      "On ne découvre pas de terre nouvelle sans consentir à perdre de vue le rivage — la peur du large est souvent la peur de soi",
      "Le bonheur est dans le chemin non dans le but — l'arrivée n'est qu'une pause dans une attention plus longue",
      "Voyager c'est apprendre à se taire — le silence d'une place étrangère parle plus juste que mille souvenirs",
      "Les plus beaux voyages sont ceux qu'on n'a pas encore faits — l'attente aussi est une forme de départ",
      "Paris vaut bien une messe — mais une rue vaut parfois toute une religion si l'on sait regarder",
      "Rien ne se perd tout se transforme — surtout le voyageur qui croit rester le même",
      "Il faut voyager pour apprendre — non les noms des lieux mais la mesure exacte de son ignorance",
      "Le monde est un livre et ceux qui ne voyagent pas n'en lisent qu'une page — encore faut-il lire vraiment",
      "La flânerie est une science — marcher sans but peut être le but le plus honnête",
      "Qui n'a pas voyagé n'a lu qu'une page — qui voyage sans s'étonner n'a tourné que du papier",
      "Chaque départ est une promesse — chaque retour un examen de ce qu'on a tenu",
      "L'architecture est une musique figée — les toits de zinc en sont la mélodie la plus patient",
      "Le hasard fait bien les choses — quand le cœur a déjà choisi de s'ouvrir",
      "Mieux vaut allumer une chandelle que maudire l'obscurité — le voyageur porte sa propre lumière",
      "La route est longue mais le cœur est léger — pourvu qu'on accepte de ne pas tout comprendre d'avance"
    ].join("　")
  }
};

export const DEFAULT_COUNTRY = "china-france";

const wallpaper = COUNTRIES[DEFAULT_COUNTRY];
const hidden = hideWords(wallpaper.cloth, wallpaper.gridW, HIDDEN_NAMES);
wallpaper.cloth = hidden.text;
wallpaper.hiddenCells = hidden.cells;
wallpaper.hiddenScale = HIDDEN_NAME_SCALE;

/** Overwrite cloth cells so each word lands on one row or one column; returns the touched cells. */
function hideWords(text, gridW, words) {
  const chars = Array.from(text);
  const cells = new Set();
  for (const { text: word, row, col, dir } of words) {
    Array.from(word).forEach((ch, k) => {
      const i = dir === "h" ? col + k : col;
      const j = dir === "h" ? row : row + k;
      chars[j * gridW + i] = ch;
      cells.add(j * gridW + i);
    });
  }
  return { text: chars.join(""), cells };
}

/** Map grid cell (i=col left→right, j=row top→bottom) to a character. */
export function charForCell(text, i, j, gridW, gridH, writing = "horizontal") {
  if (!text || !text.length) return " ";
  let index;
  if (writing === "vertical") {
    const colFromRight = gridW - 1 - i;
    index = colFromRight * gridH + j;
  } else {
    index = j * gridW + i;
  }
  return text[index % text.length] || " ";
}
