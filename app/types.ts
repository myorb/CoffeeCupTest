export const constructionOptions = {
  Damage: "#EE6352",
  Incomplete: "#FAC05E",
  Observation: "#3FA7D6",
  Resolved: "#59CD90",
  Unconfirmed: "#474954",
};

export type AnnotationType = keyof typeof constructionOptions;

export interface Annotation {
  x: number;
  y: number;
  label: string;
  type: AnnotationType;
}