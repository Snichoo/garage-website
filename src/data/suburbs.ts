export type Suburb = {
  slug: string;
  name: string;
  postcode: string;
};

export const suburbs: Suburb[] = [
  { slug: "ashgrove", name: "Ashgrove", postcode: "4060" },
  { slug: "jindalee", name: "Jindalee", postcode: "4074" },
  { slug: "wynnum", name: "Wynnum", postcode: "4178" },
  { slug: "morayfield", name: "Morayfield", postcode: "4506" },
  { slug: "mcdowall", name: "McDowall", postcode: "4053" },
];
