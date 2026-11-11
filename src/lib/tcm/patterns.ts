import type { FormulaKey, PointKey } from "@/lib/tcm/treatments";

/**
 * Curated general imbalance patterns. Summaries of commonly taught material
 * (Maciocia, Foundations / Diagnosis in Chinese Medicine; Wiseman & Ye,
 * Practical Dictionary). The model personalizes these; it does not invent theory.
 */

export type PatternEntry = {
  id: string;
  name: string;
  aliases: string[];
  explanation: string;
  tongueSigns: string[];
  associatedSigns: string[];
  contributors: string[];
  foods: { food: string; why: string }[];
  points: PointKey[];
  formulas: FormulaKey[];
  citations: string[];
};

const MACIOCIA_DX = "Maciocia, Diagnosis in Chinese Medicine";
const MACIOCIA_FND = "Maciocia, The Foundations of Chinese Medicine";
const WISEMAN = "Wiseman & Ye, A Practical Dictionary of Chinese Medicine";

export const PATTERNS: PatternEntry[] = [
  {
    id: "qi-deficiency",
    name: "Qi Deficiency (Spleen Qi)",
    aliases: ["qi deficiency", "spleen qi deficiency", "spleen deficiency", "qi vacuity"],
    explanation:
      "Qi is the body's working energy. The Spleen turns food into Qi and Blood; when it is underpowered, energy runs low and digestion and fluid handling become sluggish.",
    tongueSigns: ["pale or pale-pink body", "slightly swollen body", "tooth marks on the edges", "thin white coating"],
    associatedSigns: ["tiredness, especially after meals", "variable energy", "soft or loose stools", "weak limbs", "easily overwhelmed"],
    contributors: ["irregular meals", "overwork and long hours of mental effort", "lots of raw or cold food", "chronic worry", "recovery from illness"],
    foods: [
      { food: "Rice congee and well-cooked grains", why: "Easy to transform, so the Spleen spends less effort for more Qi." },
      { food: "Sweet potato, pumpkin, carrots", why: "Naturally sweet, warm root vegetables traditionally said to strengthen the Spleen." },
      { food: "Chicken soup and bone broth", why: "Warm, nourishing, and gentle on digestion." },
      { food: "Chinese red dates (jujube) and shiitake mushrooms", why: "Traditionally used to support Qi and Blood." },
    ],
    points: ["ST 36", "SP 3", "BL 20", "CV 12", "CV 6"],
    formulas: ["Si Jun Zi Tang", "Bu Zhong Yi Qi Tang", "Shen Ling Bai Zhu San"],
    citations: [MACIOCIA_FND, MACIOCIA_DX],
  },
  {
    id: "blood-deficiency",
    name: "Blood Deficiency",
    aliases: ["blood deficiency", "blood vacuity", "liver blood deficiency", "heart blood deficiency"],
    explanation:
      "In TCM, Blood nourishes and moistens tissues and anchors the mind. When it runs thin, skin and hair dry out, sleep gets lighter, and the body feels under-nourished.",
    tongueSigns: ["pale body", "thin body", "slightly dry surface"],
    associatedSigns: ["dry skin or hair", "pale complexion", "dizziness on standing", "light or restless sleep", "numbness or tingling"],
    contributors: ["Qi deficiency over time", "heavy periods", "restrictive eating", "long-term overwork or late nights"],
    foods: [
      { food: "Dark leafy greens and beetroot", why: "Traditionally regarded as blood-building foods." },
      { food: "Eggs, bone broth, and modest amounts of red meat", why: "Rich, nourishing foods traditionally used to rebuild Blood." },
      { food: "Goji berries, red dates, black sesame", why: "Classic food-therapy ingredients for nourishing Blood." },
    ],
    points: ["SP 6", "ST 36", "BL 17", "CV 4"],
    formulas: ["Si Wu Tang", "Ba Zhen Tang", "Gui Pi Tang"],
    citations: [MACIOCIA_FND, WISEMAN],
  },
  {
    id: "yin-deficiency",
    name: "Yin Deficiency",
    aliases: ["yin deficiency", "yin vacuity", "kidney yin deficiency", "stomach yin deficiency", "heart yin deficiency"],
    explanation:
      "Yin is the body's cooling, moistening reserve. When it is depleted, there is not enough \"coolant\", so dryness and a low-grade, often evening, warmth appear.",
    tongueSigns: ["red body with little or no coating", "peeled or patchy coating", "cracks", "dry surface"],
    associatedSigns: ["dry mouth or throat at night", "night sweats", "warm palms and soles", "restless sleep", "feeling wired but tired"],
    contributors: ["chronic stress and late nights", "overwork", "lots of spicy or heating food", "long-term illness", "dry climates"],
    foods: [
      { food: "Pears and white fungus (tremella)", why: "Traditionally used to moisten dryness." },
      { food: "Black sesame and tofu", why: "Cooling, nourishing foods for Yin." },
      { food: "Soups and stews rather than dry or fried food", why: "Adds moisture instead of drying the body further." },
    ],
    points: ["KI 3", "KI 6", "SP 6", "HT 7"],
    formulas: ["Liu Wei Di Huang Wan", "Zhi Bai Di Huang Wan", "Tian Wang Bu Xin Dan"],
    citations: [MACIOCIA_FND, MACIOCIA_DX],
  },
  {
    id: "yang-deficiency",
    name: "Yang Deficiency",
    aliases: ["yang deficiency", "yang vacuity", "spleen yang deficiency", "kidney yang deficiency"],
    explanation:
      "Yang is the body's warming, activating fire. With too little, metabolism slows, fluids aren't warmed and moved, and you feel cold from the inside.",
    tongueSigns: ["pale body", "swollen and wet surface", "tooth marks"],
    associatedSigns: ["feeling cold, especially hands, feet, and lower back", "preference for warm drinks", "frequent pale urine", "low motivation", "loose stools"],
    contributors: ["iced drinks and raw food", "cold environments", "chronic Qi deficiency", "ageing"],
    foods: [
      { food: "Ginger, cinnamon, and warming spices", why: "Traditionally used to warm the interior gently." },
      { food: "Lamb, walnuts, and slow-cooked stews", why: "Warming, Yang-supporting foods in TCM food therapy." },
      { food: "Warm water instead of iced drinks", why: "Stops the body spending its fire to warm what you drink." },
    ],
    points: ["CV 4", "GV 4", "BL 23", "KI 3"],
    formulas: ["Jin Gui Shen Qi Wan", "Li Zhong Wan"],
    citations: [MACIOCIA_FND, MACIOCIA_DX],
  },
  {
    id: "kidney-deficiency",
    name: "Kidney Deficiency",
    aliases: ["kidney deficiency", "kidney qi deficiency", "kidney vacuity", "kidney essence deficiency"],
    explanation:
      "In TCM the Kidneys hold the body's deep reserves, and they govern the lower back, knees, bones, and fluid drainage. When those reserves run low, the foundation feels weak.",
    tongueSigns: ["changes at the root of the tongue", "pale or red body depending on Yin or Yang"],
    associatedSigns: ["weak or aching lower back and knees", "fatigue that rest doesn't fully fix", "frequent urination", "sensitivity to cold or heat"],
    contributors: ["chronic overwork and stress", "poor sleep", "long-term illness", "constitution"],
    foods: [
      { food: "Black beans, walnuts, black sesame", why: "Dark foods traditionally linked to the Kidney system." },
      { food: "Chestnuts and bone broth", why: "Deeply nourishing foods for the body's reserves." },
    ],
    points: ["KI 3", "BL 23", "KI 7", "CV 4"],
    formulas: ["Liu Wei Di Huang Wan", "Jin Gui Shen Qi Wan"],
    citations: [MACIOCIA_FND, WISEMAN],
  },
  {
    id: "dampness",
    name: "Dampness",
    aliases: ["dampness", "damp", "spleen damp", "cold-damp", "damp accumulation", "wind-damp"],
    explanation:
      "Dampness is fluid that hasn't been properly processed. It's heavy and sticky, like a damp sponge, so it slows things down and settles in the limbs, digestion, or skin.",
    tongueSigns: ["thick or greasy coating", "swollen body", "tooth marks"],
    associatedSigns: ["heaviness in the body or head", "brain fog", "bloating", "sticky or loose stools", "puffiness or fluid retention"],
    contributors: ["iced drinks, dairy, sugar, and greasy food", "humid climates", "Spleen Qi deficiency", "eating late or irregularly"],
    foods: [
      { food: "Adzuki beans", why: "Traditionally used to drain Dampness through urination." },
      { food: "Pearl barley (Job's tears)", why: "A classic food for resolving Dampness and supporting the Spleen." },
      { food: "Cooked vegetables over raw salads", why: "Easier for the Spleen to transform, so less Dampness is produced." },
      { food: "Less dairy, sugar, and fried food", why: "These are considered the most \"damp-producing\" foods." },
    ],
    points: ["SP 9", "SP 3", "CV 12", "ST 36"],
    formulas: ["Ping Wei San", "Shen Ling Bai Zhu San"],
    citations: [MACIOCIA_DX, WISEMAN],
  },
  {
    id: "phlegm",
    name: "Phlegm",
    aliases: ["phlegm", "phlegm-damp", "phlegm damp"],
    explanation:
      "Phlegm is Dampness that has thickened over time. It can be visible (mucus) or invisible: a sense of fogginess, heaviness, or lumps.",
    tongueSigns: ["thick, sticky or greasy coating", "swollen body"],
    associatedSigns: ["mucus or a heavy chest", "foggy thinking", "dizziness", "feeling of a lump in the throat"],
    contributors: ["long-standing Dampness", "rich, greasy, or sweet diet", "Spleen deficiency"],
    foods: [
      { food: "Radish and dried tangerine peel", why: "Traditionally used to move Qi and transform Phlegm." },
      { food: "Seaweed", why: "Used in food therapy to soften and resolve Phlegm." },
      { food: "Reduced dairy and sugar", why: "Stops adding to the Phlegm-Damp load." },
    ],
    points: ["ST 40", "SP 9", "CV 12", "PC 6"],
    formulas: ["Er Chen Tang"],
    citations: [MACIOCIA_FND],
  },
  {
    id: "damp-heat",
    name: "Damp-Heat",
    aliases: ["damp-heat", "damp heat", "phlegm-heat", "liver gallbladder damp-heat"],
    explanation:
      "When Dampness lingers it can generate heat, like compost warming up. The result is sticky and inflamed: heaviness combined with redness, odor, or irritation.",
    tongueSigns: ["yellow, greasy coating", "red body", "coating thickest at the center or root"],
    associatedSigns: ["sticky, strong-smelling stools", "dark urine", "red, weeping, or pus-filled skin eruptions", "bitter or sticky taste", "feeling heavy and hot"],
    contributors: ["fried, spicy, or greasy food", "alcohol", "hot humid climates", "long-standing Dampness"],
    foods: [
      { food: "Mung beans, cucumber, celery, winter melon", why: "Cooling foods traditionally used to clear Damp-Heat." },
      { food: "Adzuki beans and pearl barley", why: "Drain Dampness so the heat has nothing to cling to." },
      { food: "Less alcohol, fried food, and very spicy food", why: "These are the main dietary drivers of Damp-Heat." },
    ],
    points: ["SP 9", "LI 11", "ST 44", "BL 40"],
    formulas: ["San Ren Tang", "Long Dan Xie Gan Tang"],
    citations: [MACIOCIA_DX, WISEMAN],
  },
  {
    id: "heat",
    name: "Heat (Excess Heat / Fire)",
    aliases: ["heat", "fire", "excess heat", "heart fire", "stomach heat", "blood heat", "liver fire", "stomach fire"],
    explanation:
      "Excess Heat is a genuine overload of warmth or activity in the system, not a lack of cooling. It tends to rise and push outward: redness, thirst, irritability.",
    tongueSigns: ["red body", "red tip or red sides", "yellow coating", "red spots"],
    associatedSigns: ["feeling hot", "thirst for cold drinks", "irritability", "red skin or face", "mouth ulcers or sore gums"],
    contributors: ["very spicy or fried food", "alcohol", "intense stress and frustration", "hot environments"],
    foods: [
      { food: "Cucumber, watermelon, leafy greens", why: "Cooling foods traditionally used to clear Heat." },
      { food: "Chrysanthemum or mint tea", why: "Light, cooling teas used in food therapy." },
      { food: "Less chili, alcohol, and deep-fried food", why: "Removes the main fuel for Heat." },
    ],
    points: ["LI 11", "ST 44", "GV 14", "LI 4"],
    formulas: ["Huang Lian Jie Du Tang", "Qing Wei San"],
    citations: [MACIOCIA_FND, MACIOCIA_DX],
  },
  {
    id: "qi-stagnation",
    name: "Qi Stagnation (Liver Qi)",
    aliases: ["qi stagnation", "liver qi stagnation", "liver qi constraint", "qi constraint", "liver depression"],
    explanation:
      "The Liver keeps Qi and emotions flowing smoothly. Under stress that flow bottlenecks, like traffic backing up, and pressure builds into tension, irritability, and stop-start symptoms.",
    tongueSigns: ["slightly red or taut sides", "normal or slightly purple body"],
    associatedSigns: ["symptoms that come and go with stress", "sighing", "tension in the neck, shoulders, or ribs", "irritability", "irregular digestion"],
    contributors: ["ongoing stress and frustration", "suppressed emotions", "lack of movement", "irregular routines"],
    foods: [
      { food: "Rose bud or mint tea", why: "Traditionally used to gently move Liver Qi." },
      { food: "Citrus peel and radish", why: "Aromatic foods that help Qi move." },
      { food: "Regular, unhurried meals", why: "Stress-eating further knots Qi in the middle." },
    ],
    points: ["LR 3", "LI 4", "PC 6", "GB 20"],
    formulas: ["Xiao Yao San", "Chai Hu Shu Gan San"],
    citations: [MACIOCIA_FND, WISEMAN],
  },
  {
    id: "blood-stasis",
    name: "Blood Stasis",
    aliases: ["blood stasis", "blood stagnation", "stasis"],
    explanation:
      "When circulation becomes sluggish, Blood pools and stagnates. TCM associates this with fixed, stabbing pain and dark or purplish colors.",
    tongueSigns: ["purple or dark body", "purple spots", "dark, swollen veins under the tongue"],
    associatedSigns: ["fixed, stabbing pain", "dark clots in menstrual blood", "dark circles or lips", "bruising easily"],
    contributors: ["long-standing Qi stagnation", "cold", "injury", "inactivity"],
    foods: [
      { food: "Hawthorn berry tea and turmeric", why: "Traditionally used to gently move Blood." },
      { food: "Onion, black fungus, and leafy greens", why: "Food-therapy choices for supporting circulation." },
      { food: "Daily movement", why: "Moving the body moves Qi, and Qi moves Blood." },
    ],
    points: ["SP 10", "BL 17", "LR 3", "SP 6"],
    formulas: ["Xue Fu Zhu Yu Tang", "Tao Hong Si Wu Tang"],
    citations: [MACIOCIA_DX],
  },
  {
    id: "cold",
    name: "Cold",
    aliases: ["cold", "interior cold", "cold in the middle", "cold stagnation"],
    explanation:
      "Cold contracts and slows. Whether it comes from outside (climate, iced drinks) or from weak inner fire, it causes cramping, pain that improves with warmth, and sluggish digestion.",
    tongueSigns: ["pale or bluish body", "white, moist coating"],
    associatedSigns: ["cold hands and feet", "pain relieved by warmth", "preference for hot drinks", "loose stools", "clear, frequent urine"],
    contributors: ["iced drinks and raw food", "cold, air-conditioned environments", "underlying Yang deficiency"],
    foods: [
      { food: "Fresh ginger tea", why: "A classic warming drink that disperses Cold from the middle." },
      { food: "Warm soups with scallion and cinnamon", why: "Warming, aromatic foods that counter Cold." },
      { food: "Room-temperature or warm water", why: "Stops adding new Cold with every drink." },
    ],
    points: ["CV 12", "ST 36", "CV 6", "GV 4"],
    formulas: ["Li Zhong Wan", "Dang Gui Si Ni Tang"],
    citations: [MACIOCIA_FND],
  },
  {
    id: "wind",
    name: "Wind",
    aliases: ["wind", "internal wind", "external wind", "wind-heat", "wind-cold", "liver wind"],
    explanation:
      "Wind is TCM's word for anything sudden, moving, or changeable. Symptoms that appear quickly, move around, or itch are described as Wind. It can come from outside (weather) or from inside (often stress-driven Liver imbalance).",
    tongueSigns: ["often few specific signs", "a tongue that trembles or deviates (internal Wind)"],
    associatedSigns: ["itching", "symptoms that appear suddenly or move around", "worse with weather changes or wind", "twitching or dizziness"],
    contributors: ["sudden weather changes", "drafts, fans, and air conditioning", "stress", "Blood deficiency leaving the surface undernourished"],
    foods: [
      { food: "Warm, cooked meals during seasonal transitions", why: "Keeps the interior stable while the weather shifts." },
      { food: "Scallion and ginger in broths", why: "Traditionally used to disperse external Wind." },
      { food: "Celery and chrysanthemum tea", why: "Used in food therapy to calm internal (Liver) Wind." },
    ],
    points: ["GB 20", "LI 11", "SP 10", "LR 3"],
    formulas: ["Xiao Feng San", "Tian Ma Gou Teng Yin"],
    citations: [MACIOCIA_FND, WISEMAN],
  },
  {
    id: "wei-qi-weakness",
    name: "Weak Defensive Qi (Wei Qi)",
    aliases: ["wei qi", "weak wei qi", "defensive qi deficiency", "lung qi deficiency", "weak defensive qi"],
    explanation:
      "Wei Qi is the body's protective layer at the skin. It opens and closes the pores to adapt to weather. When it's weak, the body overreacts to every change in temperature, wind, or season.",
    tongueSigns: ["pale body", "thin white coating"],
    associatedSigns: ["catching colds easily", "sweating easily or spontaneously", "sensitivity to wind and weather changes", "skin that reacts to the environment"],
    contributors: ["Spleen and Lung Qi deficiency", "chronic stress", "frequent thermal shocks such as AC and fans", "poor sleep"],
    foods: [
      { food: "Warm, cooked, regular meals", why: "Wei Qi is built from the same digestive Qi as everything else." },
      { food: "Shiitake mushrooms, garlic, and ginger", why: "Traditionally used to support resilience." },
      { food: "Rice congee during transitions", why: "Gentle nourishment when the body is adapting." },
    ],
    points: ["ST 36", "LU 7", "GV 14", "KI 7"],
    formulas: ["Yu Ping Feng San", "Gui Zhi Tang"],
    citations: [MACIOCIA_FND],
  },
];

export const PATTERN_IDS = PATTERNS.map((p) => p.id);

export function findPattern(idOrName: string): PatternEntry | undefined {
  const needle = idOrName.trim().toLowerCase();
  return (
    PATTERNS.find((p) => p.id === needle) ||
    PATTERNS.find((p) => p.name.toLowerCase() === needle) ||
    PATTERNS.find((p) => p.aliases.some((a) => needle === a)) ||
    PATTERNS.find((p) => p.aliases.some((a) => needle.includes(a)))
  );
}

export const BODY_GEOGRAPHY = [
  { area: "Lower back and knees", system: "Kidney", note: "The lower back is called the \"house of the Kidneys\"." },
  { area: "Hands, feet, limbs, and muscles", system: "Spleen", note: "The Spleen governs the limbs and the flesh." },
  { area: "Lips, mouth, and gums", system: "Stomach and Spleen; Stomach and Large Intestine channels", note: "The Spleen opens into the mouth; the Stomach channel circles the lips." },
  { area: "Back of the neck, back, and back of the legs", system: "Bladder channel (Taiyang), paired with the Kidney", note: "The body's main drainage pathway for fluids." },
  { area: "Sides of the body, ribs, and sides of the head", system: "Liver and Gallbladder channels", note: "Where stress-related tension tends to show." },
  { area: "Eyes, tendons, and nails", system: "Liver", note: "The Liver opens into the eyes and nourishes the tendons." },
  { area: "Chest, heart rhythm, sleep, and mind", system: "Heart (and Pericardium)", note: "The Heart houses the mind (Shen)." },
  { area: "Skin, nose, throat, and breathing", system: "Lung", note: "The Lung governs the skin and the defensive (Wei) Qi." },
  { area: "Inner arms and inner elbows", system: "Lung, Pericardium, and Heart channels", note: "These channels run along the inner arm." },
  { area: "Inner legs and ankles", system: "Spleen, Liver, and Kidney channels", note: "The three Yin channels of the leg." },
  { area: "Lower abdomen and pelvis", system: "Lower Burner (Lower Jiao): Kidney, Bladder, Intestines", note: "Where fluids are finally separated and drained." },
  { area: "Ears, hair, and bones", system: "Kidney", note: "Classically linked to the Kidney's reserves." },
] as const;

export const GLOSSARY: { term: string; definition: string }[] = [
  { term: "Qi", definition: "The body's functional energy: what moves, warms, protects, and holds things in place." },
  { term: "Blood", definition: "In TCM, both the physical blood and its nourishing, moistening, mind-anchoring role." },
  { term: "Yin", definition: "The cooling, moistening, calming, restorative side of the body." },
  { term: "Yang", definition: "The warming, activating, transforming side of the body." },
  { term: "Zang-Fu", definition: "The organ systems of TCM. They're functional networks, not just the anatomical organs." },
  { term: "Spleen", definition: "In TCM, the system that transforms food and fluids into Qi and Blood. Broader than the anatomical spleen." },
  { term: "Kidney", definition: "In TCM, the system holding the body's deep reserves, governing the lower back, bones, and fluids." },
  { term: "Liver", definition: "In TCM, the system that keeps Qi and emotions flowing smoothly and stores Blood." },
  { term: "Dampness", definition: "Unprocessed, heavy, sticky fluid that slows the body down." },
  { term: "Phlegm", definition: "Dampness that has thickened over time; can be visible mucus or an invisible fog or heaviness." },
  { term: "Heat", definition: "Excess warmth or activity: redness, thirst, irritation, inflammation." },
  { term: "Cold", definition: "Contraction and slowing: pain relieved by warmth, cold limbs, sluggish digestion." },
  { term: "Wind", definition: "Anything sudden, moving, or changeable, such as itching or symptoms triggered by weather." },
  { term: "Wei Qi", definition: "Defensive Qi: the protective layer at the skin that adapts to weather and keeps out external factors." },
  { term: "Jiao", definition: "The \"Burners\": upper (chest), middle (digestion), and lower (abdomen and pelvis) divisions of the body." },
  { term: "Channel", definition: "A pathway (meridian) along which Qi flows, linking organ systems to areas of the body." },
  { term: "Shen", definition: "The mind or spirit, said to be housed in the Heart." },
  { term: "Deficiency", definition: "Not enough of something, such as Qi, Blood, Yin, or Yang." },
  { term: "Excess", definition: "Too much of something, or something blocking flow, such as Dampness, Heat, or stagnation." },
  { term: "Stagnation", definition: "Flow that has slowed or bottlenecked, building pressure." },
];

export const RED_FLAGS = [
  "Pain that is severe, sudden, or getting steadily worse",
  "Unexplained weight loss, fever, or night sweats lasting more than a week or two",
  "Blood in stool, urine, vomit, or coughed-up mucus",
  "Shortness of breath, chest pain, or fainting",
  "Skin that is hot, spreading, oozing pus, or accompanied by fever",
  "Any symptom that is new, persistent, or worrying you",
];
