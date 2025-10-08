export type Locations = {
  [region: string]: {
    [state: string]: {
      [county: string]: string[]
    }
  }
}

// Demo data — replace/extend with your real regions
const DATA: Locations = {
  North: {
    "River State": {
      "Green County": ["Oak City", "Pine City", "Maple City"],
      "Hill County": ["Summit", "Canyon"],
    },
    "Lake State": {
      "Shore County": ["Harbor", "Jetty"],
    },
    "New York State": {
      "Albany County": ["Albany", "Saratoga Springs", "Troy"],
      "Kings County": ["Brooklyn", "Coney Island"],
    },
    "Michigan State": {
      "Wayne County": ["Detroit", "Dearborn"],
      "Ottawa County": ["Grand Haven", "Holland"],
    },
    "Ohio State": {
      "Franklin County": ["Columbus", "Dublin"],
      "Summit County": ["Akron", "Cuyahoga Falls"],
    },
  },
  South: {
    "Sun State": {
      "Palm County": ["Coconut City", "Laguna"],
      "Dune County": ["Mirage"],
    },
    "Bay State": {
      "Coral County": ["Reefside", "Pearl Bay"],
    },
    "Texas State": {
      "Harris County": ["Houston", "Pasadena"],
      "Travis County": ["Austin", "Round Rock"],
    },
    "Florida State": {
      "Miami-Dade County": ["Miami", "Hialeah"],
      "Orange County": ["Orlando", "Winter Park"],
    },
    "Georgia State": {
      "Fulton County": ["Atlanta", "Sandy Springs"],
      "Chatham County": ["Savannah", "Pooler"],
    },
  },
  West: {
    "California State": {
      "Los Angeles County": ["Los Angeles", "Santa Monica"],
      "San Francisco County": ["San Francisco", "Daly City"],
    },
    "Washington State": {
      "King County": ["Seattle", "Bellevue"],
      "Pierce County": ["Tacoma", "Lakewood"],
    },
    "Oregon State": {
      "Multnomah County": ["Portland", "Gresham"],
      "Lane County": ["Eugene", "Springfield"],
    },
  },
  Midwest: {
    "Illinois State": {
      "Cook County": ["Chicago", "Evanston"],
      "DuPage County": ["Naperville", "Oak Brook"],
    },
    "Missouri State": {
      "St. Louis County": ["St. Louis", "Bridgeton"],
      "Jackson County": ["Kansas City", "Lee's Summit"],
    },
    "Indiana State": {
      "Marion County": ["Indianapolis", "Carmel"],
      "Hamilton County": ["Fishers", "Noblesville"],
    },
  },
  Southwest: {
    "Arizona State": {
      "Maricopa County": ["Phoenix", "Mesa"],
      "Pima County": ["Tucson", "Oro Valley"],
    },
    "Nevada State": {
      "Clark County": ["Las Vegas", "Henderson"],
      "Washoe County": ["Reno", "Sparks"],
    },
  },
}


export function getRegions(): string[] {
  return Object.keys(DATA)
}

export function getStatesByRegion(region: string): string[] {
  const states = DATA[region]
  return states ? Object.keys(states) : []
}

export function getCountiesByRegionState(region: string, state: string): string[] {
  const counties = DATA[region]?.[state]
  return counties ? Object.keys(counties) : []
}

export function getCitiesByRegionStateCounty(region: string, state: string, county: string): string[] {
  const cities = DATA[region]?.[state]?.[county]
  return cities ?? []
}
