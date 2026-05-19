export type Suburb = {
  slug: string;
  name: string;
  postcode: string;
  region: string;
  blurb: string;
};

export type Region = {
  slug: string;
  name: string;
};

export const regions: Region[] = [
  { slug: "inner-brisbane", name: "Inner Brisbane" },
  { slug: "brisbane-north", name: "Brisbane North" },
  { slug: "brisbane-south", name: "Brisbane South" },
  { slug: "brisbane-east", name: "Brisbane East & Bayside" },
  { slug: "brisbane-west", name: "Brisbane West" },
  { slug: "moreton-bay", name: "Moreton Bay" },
  { slug: "logan", name: "Logan" },
  { slug: "ipswich", name: "Ipswich" },
];

export const suburbs: Suburb[] = [
  // Inner Brisbane
  {
    slug: "brisbane-city",
    name: "Brisbane City",
    postcode: "4000",
    region: "inner-brisbane",
    blurb:
      "from CBD apartment blocks to heritage terraces near the Botanic Gardens",
  },
  {
    slug: "new-farm",
    name: "New Farm",
    postcode: "4005",
    region: "inner-brisbane",
    blurb:
      "covering the riverfront homes along Bowen Terrace and the worker's cottages around Brunswick Street",
  },
  {
    slug: "fortitude-valley",
    name: "Fortitude Valley",
    postcode: "4006",
    region: "inner-brisbane",
    blurb:
      "from converted warehouses in the James Street precinct to inner-city townhouses",
  },
  {
    slug: "west-end",
    name: "West End",
    postcode: "4101",
    region: "inner-brisbane",
    blurb:
      "covering the character homes near Boundary Street and the riverside units along Montague Road",
  },
  {
    slug: "south-brisbane",
    name: "South Brisbane",
    postcode: "4101",
    region: "inner-brisbane",
    blurb:
      "from the apartment towers near South Bank to the older terraces around Vulture Street",
  },
  {
    slug: "paddington",
    name: "Paddington",
    postcode: "4064",
    region: "inner-brisbane",
    blurb:
      "specialising in tight rear-lane garages and steep driveways across Latrobe Terrace and Given Terrace",
  },
  {
    slug: "milton",
    name: "Milton",
    postcode: "4064",
    region: "inner-brisbane",
    blurb:
      "covering the worker's cottages along Park Road and the unit complexes near Suncorp Stadium",
  },
  {
    slug: "bulimba",
    name: "Bulimba",
    postcode: "4171",
    region: "inner-brisbane",
    blurb:
      "from the riverfront homes along Oxford Street to the renovated Queenslanders backing onto Bulimba Memorial Park",
  },

  // Brisbane North
  {
    slug: "ashgrove",
    name: "Ashgrove",
    postcode: "4060",
    region: "brisbane-north",
    blurb:
      "from the classic Queenslanders along Waterworks Road to the family homes backing onto Ashgrove Park",
  },
  {
    slug: "chermside",
    name: "Chermside",
    postcode: "4032",
    region: "brisbane-north",
    blurb:
      "servicing homes and businesses around the Westfield Chermside precinct and the leafy backstreets nearby",
  },
  {
    slug: "aspley",
    name: "Aspley",
    postcode: "4034",
    region: "brisbane-north",
    blurb:
      "covering the family homes along Albany Creek Road and the newer estates near Aspley Hypermarket",
  },
  {
    slug: "nundah",
    name: "Nundah",
    postcode: "4012",
    region: "brisbane-north",
    blurb:
      "from the post-war cottages near Boyd Park to the modern townhouses around Nundah Village",
  },
  {
    slug: "stafford",
    name: "Stafford",
    postcode: "4053",
    region: "brisbane-north",
    blurb:
      "covering the brick-and-tile homes along Stafford Road and the elevated streets backing onto Mount Coot-tha foothills",
  },
  {
    slug: "mcdowall",
    name: "McDowall",
    postcode: "4053",
    region: "brisbane-north",
    blurb:
      "servicing the family estates along Beckett Road and homes bordering the Raven Street Reserve bushland",
  },
  {
    slug: "albany-creek",
    name: "Albany Creek",
    postcode: "4035",
    region: "brisbane-north",
    blurb:
      "from acreage properties off Eatons Crossing Road to the newer family estates near the Albany Creek shops",
  },

  // Brisbane South
  {
    slug: "mount-gravatt",
    name: "Mount Gravatt",
    postcode: "4122",
    region: "brisbane-south",
    blurb:
      "covering the hillside homes around the lookout and family blocks near Garden City",
  },
  {
    slug: "sunnybank",
    name: "Sunnybank",
    postcode: "4109",
    region: "brisbane-south",
    blurb:
      "from the modern family homes along Mains Road to the units around Sunnybank Plaza",
  },
  {
    slug: "carindale",
    name: "Carindale",
    postcode: "4152",
    region: "brisbane-south",
    blurb:
      "servicing the established family estates around Westfield Carindale and the bush-fringed streets near Bulimba Creek",
  },
  {
    slug: "coorparoo",
    name: "Coorparoo",
    postcode: "4151",
    region: "brisbane-south",
    blurb:
      "covering the Queenslanders along Cavendish Road and the apartment buildings near Coorparoo Square",
  },
  {
    slug: "holland-park",
    name: "Holland Park",
    postcode: "4121",
    region: "brisbane-south",
    blurb:
      "from the post-war homes along Logan Road to the renovated cottages near Seville Road",
  },
  {
    slug: "annerley",
    name: "Annerley",
    postcode: "4103",
    region: "brisbane-south",
    blurb:
      "covering the older workers' cottages near Ipswich Road and the small-block townhouses around Junction Park",
  },

  // Brisbane East & Bayside
  {
    slug: "wynnum",
    name: "Wynnum",
    postcode: "4178",
    region: "brisbane-east",
    blurb:
      "from the bayside homes along the Wynnum Esplanade to the older streets behind Iona College",
  },
  {
    slug: "manly",
    name: "Manly",
    postcode: "4179",
    region: "brisbane-east",
    blurb:
      "servicing the waterfront homes near Manly Harbour Village and the elevated blocks looking over Moreton Bay",
  },
  {
    slug: "cannon-hill",
    name: "Cannon Hill",
    postcode: "4170",
    region: "brisbane-east",
    blurb:
      "covering the family homes near Cannon Hill Plaza and the industrial sheds along Wynnum Road",
  },
  {
    slug: "cleveland",
    name: "Cleveland",
    postcode: "4163",
    region: "brisbane-east",
    blurb:
      "from the bayside acreages near Raby Bay to the family blocks around the Cleveland CBD",
  },
  {
    slug: "capalaba",
    name: "Capalaba",
    postcode: "4157",
    region: "brisbane-east",
    blurb:
      "servicing the family estates around Capalaba Park and the rural-residential blocks toward Mount Cotton",
  },
  {
    slug: "hawthorne",
    name: "Hawthorne",
    postcode: "4171",
    region: "brisbane-east",
    blurb:
      "covering the renovated character homes along Hawthorne Road and the riverside units near Hawthorne Park",
  },

  // Brisbane West
  {
    slug: "indooroopilly",
    name: "Indooroopilly",
    postcode: "4068",
    region: "brisbane-west",
    blurb:
      "from the hilltop homes overlooking the Brisbane River to the apartments around Indooroopilly Shopping Centre",
  },
  {
    slug: "toowong",
    name: "Toowong",
    postcode: "4066",
    region: "brisbane-west",
    blurb:
      "covering the high-set Queenslanders along Sylvan Road and the unit blocks near Toowong Village",
  },
  {
    slug: "kenmore",
    name: "Kenmore",
    postcode: "4069",
    region: "brisbane-west",
    blurb:
      "servicing the larger family blocks around Brookfield Road and the leafy cul-de-sacs near Kenmore State School",
  },
  {
    slug: "jindalee",
    name: "Jindalee",
    postcode: "4074",
    region: "brisbane-west",
    blurb:
      "from the riverside homes near Jindalee Boat Ramp to the family estates around Jindalee Home",
  },
  {
    slug: "sherwood",
    name: "Sherwood",
    postcode: "4075",
    region: "brisbane-west",
    blurb:
      "covering the heritage homes near Sherwood Arboretum and the cottages along Oxley Road",
  },
  {
    slug: "chapel-hill",
    name: "Chapel Hill",
    postcode: "4069",
    region: "brisbane-west",
    blurb:
      "from the hillside acreages backing onto Mount Coot-tha to the family estates along Kenmore Road",
  },

  // Moreton Bay
  {
    slug: "morayfield",
    name: "Morayfield",
    postcode: "4506",
    region: "moreton-bay",
    blurb:
      "servicing the family estates around Morayfield Shopping Centre and the larger lots along the Caboolture River",
  },
  {
    slug: "caboolture",
    name: "Caboolture",
    postcode: "4510",
    region: "moreton-bay",
    blurb:
      "from the rural-residential blocks west of the highway to the family homes around the Caboolture CBD",
  },
  {
    slug: "north-lakes",
    name: "North Lakes",
    postcode: "4509",
    region: "moreton-bay",
    blurb:
      "covering the master-planned family estates around Westfield North Lakes and the newer infill blocks nearby",
  },
  {
    slug: "redcliffe",
    name: "Redcliffe",
    postcode: "4020",
    region: "moreton-bay",
    blurb:
      "from the bayside homes along Redcliffe Parade to the older cottages near Margate Beach",
  },
  {
    slug: "mango-hill",
    name: "Mango Hill",
    postcode: "4509",
    region: "moreton-bay",
    blurb:
      "servicing the modern estates near North Lakes train station and the family homes around the Mango Hill village",
  },

  // Logan
  {
    slug: "springwood",
    name: "Springwood",
    postcode: "4127",
    region: "logan",
    blurb:
      "covering the family estates near Springwood Mall and homes along the leafy Cinderella Drive ridgeline",
  },
  {
    slug: "beenleigh",
    name: "Beenleigh",
    postcode: "4207",
    region: "logan",
    blurb:
      "from the post-war cottages near the Beenleigh CBD to the newer infill homes along City Road",
  },
  {
    slug: "loganholme",
    name: "Loganholme",
    postcode: "4129",
    region: "logan",
    blurb:
      "servicing the family homes around Logan Hyperdome and the larger blocks backing onto the Logan River",
  },
  {
    slug: "shailer-park",
    name: "Shailer Park",
    postcode: "4128",
    region: "logan",
    blurb:
      "covering the bush-fringed family estates around Shailer Park State High School and the larger lots near Daisy Hill Conservation Park",
  },

  // Ipswich
  {
    slug: "springfield-lakes",
    name: "Springfield Lakes",
    postcode: "4300",
    region: "ipswich",
    blurb:
      "from the master-planned lakeside family estates to the newer townhouse complexes near Orion Springfield Central",
  },
  {
    slug: "goodna",
    name: "Goodna",
    postcode: "4300",
    region: "ipswich",
    blurb:
      "covering the family homes along Smiths Road and the older cottages near the Goodna train station",
  },
  {
    slug: "ipswich",
    name: "Ipswich",
    postcode: "4305",
    region: "ipswich",
    blurb:
      "from the heritage Queenslanders around the Ipswich CBD to the newer family estates along Brisbane Road",
  },
];

export function getSuburbsByRegion(regionSlug: string): Suburb[] {
  return suburbs.filter((s) => s.region === regionSlug);
}
