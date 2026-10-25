import { RoleInfo, VerticalType } from '../types';

export const ROLE_DETAILS: Record<VerticalType, RoleInfo> = {
  PHOTOGRAPHY: {
    headline: "YOU NOTICE THINGS.",
    quote: "Most people walk past them. You apparently don't.",
    subquote: "You look at light and shadows like they owe you money. We respect that.",
    archetype: "01 / LENS DISCIPLINE",
  },
  CINEMATOGRAPHY: {
    headline: "YOU THINK IN FRAMES.",
    quote: "Which is either an exceptional talent or a serious chronic condition.",
    subquote: "Either way, our heavy rigs and 4K anamorphic glass are waiting for you.",
    archetype: "02 / CONTINUOUS MOTION",
  },
  DESIGN: {
    headline: "YOU HAVE OPINIONS ABOUT FONTS.",
    quote: "We respect that. Mostly.",
    subquote: "As long as you promise never to touch Comic Sans, Papyrus, or centered body copy ever again.",
    archetype: "03 / VECTOR WARFARE",
  },
  EDITING: {
    headline: "YOU SURVIVED THE TIMELINE.",
    quote: "Please help the rest of us.",
    subquote: "You know what 3:00 AM render cache errors feel like. You are forged in fire.",
    archetype: "04 / KEYFRAME ALCHEMY",
  },
  CONTENT: {
    headline: "YOU HAVE TOO MANY WORDS IN YOUR HEAD.",
    quote: "Good. We have captions.",
    subquote: "And scripts, concept treatments, and social hooks for people who refuse to sound like robots.",
    archetype: "05 / MANUSCRIPT CHAOS",
  },
  MODELLING: {
    headline: "THE CAMERA SEEMS TO LIKE YOU.",
    quote: "We'll put that to the test.",
    subquote: "Under continuous 600W strobes, smoke machines, and very questionable director choices.",
    archetype: "06 / LIVING COMPOSITION",
  },
  MANAGEMENT: {
    headline: "YOU ENJOY MAKING THINGS HAPPEN.",
    quote: "Terrible decision. Welcome.",
    subquote: "Wrangling 40 sleep-deprived artists during fest season is officially your destiny.",
    archetype: "07 / FIELD OPERATIONS",
  },
};

export const DEFAULT_CANDIDATE = {
  name: "Aarush",
  vertical: "PHOTOGRAPHY" as VerticalType,
  number: "027",
  years: "2",
  weapon: "Behind the camera",
  whatsappLink: "https://chat.whatsapp.com/LK9H9Xi2yBTEQq6KMeYdWe?mode=gi_t",
};

export const PRESET_PERSONAS = [
  {
    name: "Aarush",
    vertical: "PHOTOGRAPHY" as VerticalType,
    number: "027",
    years: "2",
    weapon: "Behind the camera",
  },
  {
    name: "Meher",
    vertical: "CINEMATOGRAPHY" as VerticalType,
    number: "014",
    years: "3",
    weapon: "Director's Viewfinder",
  },
  {
    name: "Kabir",
    vertical: "DESIGN" as VerticalType,
    number: "042",
    years: "1",
    weapon: "Pen Tool & Overthinking",
  },
  {
    name: "Rhea",
    vertical: "EDITING" as VerticalType,
    number: "019",
    years: "2",
    weapon: "Spacebar & Caffeine",
  },
  {
    name: "Siddharth",
    vertical: "MANAGEMENT" as VerticalType,
    number: "008",
    years: "3",
    weapon: "Spreadsheets & Aggression",
  },
];
