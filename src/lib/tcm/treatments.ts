/**
 * The only acupuncture points and classical formulas the report may name.
 * Traditional uses summarize commonly taught material (Deadman, A Manual of
 * Acupuncture; Bensky, Chinese Herbal Medicine: Formulas & Strategies).
 * Education only: no doses, preparations, or home use.
 */

export type TreatmentEntry = {
  name: string;
  traditionalUse: string;
  caution?: string;
};

const PREGNANCY_CAUTION = "Traditionally avoided during pregnancy.";

export const ACUPUNCTURE_POINTS = {
  "ST 36": { name: "ST 36 (Zusanli)", traditionalUse: "Strengthens Spleen and Stomach Qi and supports overall energy and Blood production." },
  "SP 3": { name: "SP 3 (Taibai)", traditionalUse: "Strengthens the Spleen and helps it transform Dampness." },
  "SP 6": { name: "SP 6 (Sanyinjiao)", traditionalUse: "Supports the Spleen, Liver, and Kidney; nourishes Blood and Yin and helps resolve Dampness.", caution: PREGNANCY_CAUTION },
  "SP 9": { name: "SP 9 (Yinlingquan)", traditionalUse: "The main point for resolving Dampness, especially in the lower body and limbs." },
  "SP 10": { name: "SP 10 (Xuehai)", traditionalUse: "\"Sea of Blood\": cools and moves Blood; often used when the skin itches." },
  "CV 12": { name: "CV 12 (Zhongwan)", traditionalUse: "Supports the Stomach and Spleen and helps resolve Dampness in the middle of the body." },
  "CV 6": { name: "CV 6 (Qihai)", traditionalUse: "\"Sea of Qi\": strengthens Qi and Yang and anchors overall energy." },
  "CV 4": { name: "CV 4 (Guanyuan)", traditionalUse: "Nourishes Blood and Yin and, with warmth (moxibustion), strengthens Kidney Yang.", caution: PREGNANCY_CAUTION },
  "ST 40": { name: "ST 40 (Fenglong)", traditionalUse: "The main point for resolving Phlegm and Dampness." },
  "ST 44": { name: "ST 44 (Neiting)", traditionalUse: "Clears Heat from the Stomach, including heat rising to the mouth and gums." },
  "BL 17": { name: "BL 17 (Geshu)", traditionalUse: "Meeting point of Blood: nourishes and moves Blood." },
  "BL 20": { name: "BL 20 (Pishu)", traditionalUse: "Back point of the Spleen: strengthens Spleen Qi and fluid transformation." },
  "BL 23": { name: "BL 23 (Shenshu)", traditionalUse: "Back point of the Kidney: strengthens the Kidneys, lower back, and knees." },
  "BL 40": { name: "BL 40 (Weizhong)", traditionalUse: "Behind the knee: clears Heat and stagnation along the Bladder channel and benefits the lower back." },
  "KI 3": { name: "KI 3 (Taixi)", traditionalUse: "Source point of the Kidney: strengthens both Kidney Yin and Yang." },
  "KI 6": { name: "KI 6 (Zhaohai)", traditionalUse: "Nourishes Yin, moistens dryness, and calms the mind for sleep." },
  "KI 7": { name: "KI 7 (Fuliu)", traditionalUse: "Strengthens the Kidneys and regulates sweating." },
  "LR 3": { name: "LR 3 (Taichong)", traditionalUse: "Smooths the flow of Liver Qi and calms stress-driven tension." },
  "LI 4": { name: "LI 4 (Hegu)", traditionalUse: "Moves Qi, releases the exterior, and expels Wind; often paired with LR 3.", caution: PREGNANCY_CAUTION },
  "LI 11": { name: "LI 11 (Quchi)", traditionalUse: "At the elbow crease: clears Heat, cools Blood, and expels Wind; widely used for the skin." },
  "GB 20": { name: "GB 20 (Fengchi)", traditionalUse: "\"Wind Pool\": expels external Wind and calms internal Wind at the head and neck." },
  "LU 7": { name: "LU 7 (Lieque)", traditionalUse: "Releases the exterior and supports the Lung's defensive role." },
  "PC 6": { name: "PC 6 (Neiguan)", traditionalUse: "Opens the chest, settles the Stomach, and calms the mind." },
  "HT 7": { name: "HT 7 (Shenmen)", traditionalUse: "\"Spirit Gate\": calms the mind (Shen) and supports restful sleep." },
  "GV 14": { name: "GV 14 (Dazhui)", traditionalUse: "Clears Heat and strengthens Yang and the defensive (Wei) Qi." },
  "GV 4": { name: "GV 4 (Mingmen)", traditionalUse: "\"Gate of Life\": warms and strengthens Kidney Yang, usually with moxibustion." },
} satisfies Record<string, TreatmentEntry>;

export const HERBAL_FORMULAS = {
  "Si Jun Zi Tang": { name: "Si Jun Zi Tang (Four Gentlemen Decoction)", traditionalUse: "The foundational formula for Spleen Qi deficiency: tiredness, weak appetite, loose stools." },
  "Bu Zhong Yi Qi Tang": { name: "Bu Zhong Yi Qi Tang (Tonify the Middle and Augment the Qi)", traditionalUse: "Qi deficiency with heaviness, fatigue, and a sense of energy \"sinking\"." },
  "Shen Ling Bai Zhu San": { name: "Shen Ling Bai Zhu San (Ginseng, Poria and White Atractylodes Powder)", traditionalUse: "Spleen deficiency with Dampness: loose stools, heaviness, swollen tooth-marked tongue." },
  "Si Wu Tang": { name: "Si Wu Tang (Four Substances Decoction)", traditionalUse: "The foundational formula for nourishing Blood." },
  "Ba Zhen Tang": { name: "Ba Zhen Tang (Eight Treasure Decoction)", traditionalUse: "Combined Qi and Blood deficiency." },
  "Gui Pi Tang": { name: "Gui Pi Tang (Restore the Spleen Decoction)", traditionalUse: "Heart and Spleen deficiency: fatigue with poor sleep, worry, and palpitations." },
  "Liu Wei Di Huang Wan": { name: "Liu Wei Di Huang Wan (Six-Ingredient Pill with Rehmannia)", traditionalUse: "The foundational formula for Kidney Yin deficiency." },
  "Zhi Bai Di Huang Wan": { name: "Zhi Bai Di Huang Wan (Anemarrhena, Phellodendron and Rehmannia Pill)", traditionalUse: "Yin deficiency with heat signs such as night sweats and evening warmth." },
  "Tian Wang Bu Xin Dan": { name: "Tian Wang Bu Xin Dan (Emperor of Heaven's Special Pill to Tonify the Heart)", traditionalUse: "Heart Yin deficiency with restless sleep and an unsettled mind." },
  "Jin Gui Shen Qi Wan": { name: "Jin Gui Shen Qi Wan (Kidney Qi Pill from the Golden Cabinet)", traditionalUse: "Kidney Yang deficiency: cold lower back and knees, frequent pale urine." },
  "Li Zhong Wan": { name: "Li Zhong Wan (Regulate the Middle Pill)", traditionalUse: "Cold in the Spleen and Stomach: cold belly, preference for warmth, loose stools." },
  "Dang Gui Si Ni Tang": { name: "Dang Gui Si Ni Tang (Tangkuei Decoction for Frigid Extremities)", traditionalUse: "Blood deficiency with cold: chronically cold hands and feet." },
  "Er Chen Tang": { name: "Er Chen Tang (Two-Aged Decoction)", traditionalUse: "The foundational formula for Phlegm and Dampness." },
  "Ping Wei San": { name: "Ping Wei San (Calm the Stomach Powder)", traditionalUse: "Dampness obstructing digestion: fullness, heaviness, thick greasy coating." },
  "San Ren Tang": { name: "San Ren Tang (Three-Nut Decoction)", traditionalUse: "Early or mild Damp-Heat with heaviness and a sticky feeling." },
  "Long Dan Xie Gan Tang": { name: "Long Dan Xie Gan Tang (Gentian Decoction to Drain the Liver)", traditionalUse: "Damp-Heat in the Liver and Gallbladder channels.", caution: "A strong, cold formula traditionally used only short-term under supervision." },
  "Huang Lian Jie Du Tang": { name: "Huang Lian Jie Du Tang (Coptis Decoction to Resolve Toxicity)", traditionalUse: "Intense Heat and Fire affecting all three Burners.", caution: "A strong, cold formula traditionally used only short-term under supervision." },
  "Qing Wei San": { name: "Qing Wei San (Clear the Stomach Powder)", traditionalUse: "Stomach Heat rising to the mouth: gum soreness, bad breath, mouth ulcers." },
  "Xiao Yao San": { name: "Xiao Yao San (Free and Easy Wanderer)", traditionalUse: "Liver Qi stagnation with Spleen and Blood deficiency: stress, irritability, irregular energy." },
  "Chai Hu Shu Gan San": { name: "Chai Hu Shu Gan San (Bupleurum Powder to Spread the Liver)", traditionalUse: "Liver Qi stagnation with tension, sighing, and rib-side fullness." },
  "Xue Fu Zhu Yu Tang": { name: "Xue Fu Zhu Yu Tang (Drive Out Stasis from the Mansion of Blood)", traditionalUse: "Blood stasis in the chest and upper body: fixed pain, dark or purple tongue.", caution: PREGNANCY_CAUTION },
  "Tao Hong Si Wu Tang": { name: "Tao Hong Si Wu Tang (Four Substances with Safflower and Peach Pit)", traditionalUse: "Blood stasis combined with Blood deficiency.", caution: PREGNANCY_CAUTION },
  "Yu Ping Feng San": { name: "Yu Ping Feng San (Jade Windscreen Powder)", traditionalUse: "Weak defensive (Wei) Qi: catching colds easily, spontaneous sweating, sensitivity to wind and weather." },
  "Gui Zhi Tang": { name: "Gui Zhi Tang (Cinnamon Twig Decoction)", traditionalUse: "Harmonizes the defensive and nourishing layers when the surface is weak and sweats easily." },
  "Xiao Feng San": { name: "Xiao Feng San (Eliminate Wind Powder)", traditionalUse: "Wind with Dampness or Heat in the skin, marked by intense itching." },
  "Tian Ma Gou Teng Yin": { name: "Tian Ma Gou Teng Yin (Gastrodia and Uncaria Decoction)", traditionalUse: "Internal Liver Wind and rising Yang: headaches, dizziness, tension." },
} satisfies Record<string, TreatmentEntry>;

export type PointKey = keyof typeof ACUPUNCTURE_POINTS;
export type FormulaKey = keyof typeof HERBAL_FORMULAS;

export const PRACTITIONER_WARNING =
  "Educational only. Acupuncture and herbal formulas must be chosen, adjusted, and administered by a licensed TCM practitioner or acupuncturist who has assessed you in person. Herbs can interact with medications and are not suitable for everyone, including during pregnancy. Do not self-treat from this list.";
