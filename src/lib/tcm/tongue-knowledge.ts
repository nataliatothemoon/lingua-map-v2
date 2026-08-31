/**
 * Curated TCM tongue inspection summaries for prompt grounding.
 * Concepts commonly taught in accredited TCM curricula.
 * Citation labels only — no verbatim copyrighted textbook text.
 */

export const DISCLAIMER =
  "This tool provides educational, TCM-inspired wellness information only. It is not a medical or TCM diagnosis, does not prescribe herbs or treatments, and is not a substitute for care from a licensed physician or qualified TCM practitioner.";

export const TONGUE_ZONES = {
  tip: {
    label: "Tip",
    organs: "Heart / Lung",
    notes:
      "Tip often reflects Heart and Lung; redness may relate to heat or unrest; pale tip may relate to qi/blood insufficiency in those systems.",
  },
  center: {
    label: "Center",
    organs: "Spleen / Stomach",
    notes:
      "Middle reflects Spleen and Stomach; coating changes here commonly relate to digestive dampness, heat, or deficiency.",
  },
  sides: {
    label: "Sides",
    organs: "Liver / Gallbladder",
    notes:
      "Sides often reflect Liver and Gallbladder; redness, swelling, or teeth marks laterally may relate to Liver qi constraint or heat.",
  },
  root: {
    label: "Root",
    organs: "Kidney / Bladder / Intestines",
    notes:
      "Root reflects Kidney and lower jiao; thick coating at the root is commonly discussed with dampness or heat in the lower burner.",
  },
} as const;

export const FEATURE_MAPPINGS = [
  {
    signs: ["pale tongue body"],
    patterns: ["Qi deficiency", "Blood deficiency", "Yang deficiency (if also swollen/wet)"],
    followUpThemes: ["fatigue", "cold intolerance", "dizziness", "scanty menstruation if applicable"],
    citations: ["Maciocia — Diagnosis in Chinese Medicine (tongue body color)", "Wiseman/Ye — pale tongue terminology"],
  },
  {
    signs: ["red tongue body", "red tip"],
    patterns: ["Heat", "Yin deficiency heat (if peeled/cracked)", "Heart fire (red tip)"],
    followUpThemes: ["sleep quality", "irritability", "thirst", "night sweating"],
    citations: ["Maciocia — Foundations of Chinese Medicine (heat patterns)", "Classical inspection tradition — Heart tip correspondence"],
  },
  {
    signs: ["purple", "bluish", "dark spots"],
    patterns: ["Blood stasis", "Cold stagnation (bluish)", "Heat with stasis (reddish-purple)"],
    followUpThemes: ["fixed pain", "cold extremities", "menstrual clotting if applicable"],
    citations: ["Maciocia — Diagnosis in Chinese Medicine (tongue color / stasis)"],
  },
  {
    signs: ["thick white coating"],
    patterns: ["Cold-damp", "Exterior cold (if thin white acute)", "Food stagnation"],
    followUpThemes: ["appetite", "bloating", "preference for warm drinks", "phlegm"],
    citations: ["Maciocia — tongue coating", "Standard TCM teaching — coating reflects pathogenic factors / Stomach qi"],
  },
  {
    signs: ["thick yellow coating", "greasy coating"],
    patterns: ["Damp-heat", "Phlegm-heat", "Heat in Yangming / Stomach"],
    followUpThemes: ["sticky taste", "loose or sticky stools", "thirst without desire to drink", "diet greasy/spicy"],
    citations: ["Maciocia — damp-heat diagnosis", "Wiseman/Ye — greasy coating (ni)"],
  },
  {
    signs: ["peeled coating", "geographic tongue", "mirror tongue"],
    patterns: ["Stomach yin deficiency", "Yin deficiency", "Stomach qi impairment"],
    followUpThemes: ["dry mouth", "night heat", "appetite for cool drinks", "constipation dryness"],
    citations: ["Maciocia — peeled / mirror tongue", "Classical teaching — coating as Stomach qi manifestation"],
  },
  {
    signs: ["swollen", "tooth-marked", "scalloped edges"],
    patterns: ["Spleen qi deficiency", "Dampness", "Yang deficiency (if wet/pale)"],
    followUpThemes: ["bloating after meals", "loose stools", "edema", "brain fog"],
    citations: ["Maciocia — swollen / teeth-marked tongue", "Standard TCM teaching — Spleen damp"],
  },
  {
    signs: ["thin tongue"],
    patterns: ["Blood deficiency", "Yin deficiency"],
    followUpThemes: ["dry skin", "palpitations", "insomnia", "scanty fluids"],
    citations: ["Maciocia — tongue shape"],
  },
  {
    signs: ["cracks"],
    patterns: ["Yin deficiency", "Heat damaging fluids", "Spleen qi deficiency (short horizontal cracks)"],
    followUpThemes: ["dryness", "chronic stress", "digestive weakness"],
    citations: ["Maciocia — cracked tongue"],
  },
  {
    signs: ["dry tongue"],
    patterns: ["Heat", "Yin deficiency", "Fluid insufficiency"],
    followUpThemes: ["thirst", "dry stool", "low fluid intake"],
    citations: ["Maciocia — moisture of tongue"],
  },
  {
    signs: ["wet", "excessive saliva"],
    patterns: ["Yang deficiency", "Dampness", "Spleen failing to transform fluids"],
    followUpThemes: ["cold limbs", "clear urine", "edema", "lack of thirst"],
    citations: ["Maciocia — wet tongue"],
  },
] as const;

export const SOURCE_ATTRIBUTIONS = [
  "Huangdi Neijing tradition — inspection (wang) as part of diagnosis; tongue reflects zang-fu (as taught in TCM curricula)",
  "Giovanni Maciocia — The Foundations of Chinese Medicine; Diagnosis in Chinese Medicine (tongue inspection principles)",
  "Nigel Wiseman & Feng Ye — A Practical Dictionary of Chinese Medicine (terminology consistency)",
  "Standard teaching tongue map — tip Heart/Lung; center Spleen/Stomach; sides Liver/Gallbladder; root Kidney/lower jiao",
] as const;

export const KNOWLEDGE_PROMPT_BLOCK = `
You are assisting with educational TCM-inspired tongue inspection.
Stay within commonly taught TCM vocabulary. Do not invent disease diagnoses, western pathology labels, herb formulas, acupuncture prescriptions, or drug advice.
Use these zone correspondences:
- Tip: Heart / Lung
- Center: Spleen / Stomach
- Sides: Liver / Gallbladder
- Root: Kidney / Bladder / Intestines

Ground pattern language in standard teaching texts (Maciocia diagnosis/foundations; Wiseman/Ye terminology; classical inspection principles).
If uncertain, lower confidence and say so in limitations.
Always frame output as educational wellness information, not a clinical diagnosis.
`.trim();

export const BASE_INTAKE_OPTIONS = {
  ageRange: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"],
  sex: ["Prefer not to say", "Female", "Male", "Other"],
  primaryConcerns: [
    "Low energy",
    "Digestive discomfort",
    "Sleep issues",
    "Stress / mood",
    "Cold hands/feet",
    "Feeling overheated",
    "Skin concerns",
    "Menstrual / hormonal",
    "General curiosity",
  ],
  coldHeat: ["Prefer warmth / feel cold often", "Neutral", "Prefer cool / feel warm often"],
  energy: ["Often depleted", "Variable", "Mostly steady"],
  digestion: ["Bloating / heaviness", "Irregular appetite", "Generally comfortable"],
  sleep: ["Difficulty falling/staying asleep", "Restless / vivid dreams", "Mostly restorative"],
  thirst: ["Rarely thirsty", "Normal thirst", "Often thirsty / dry mouth"],
  stool: ["Loose / urgent", "Normal", "Dry / infrequent"],
  urine: ["Clear / frequent", "Normal", "Dark / scanty"],
} as const;
