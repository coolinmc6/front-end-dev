type Name = {
  name: string;
  viewed: boolean;
  score: number;
}

/**
 * 
 * Reading this function...
 * 
 * evaluateName is a function
 * that takes an argument, name, of type Name
 * and returns a boolean
 * 
 * All of that is in the first part:
 * const evaluateName: (name: Name) => boolean
 * 
 * and then after that, the = (name) => { ... } is the function body
 */
const evaluateName: (name: Name) => boolean = (name) => {
  return name.score > 0.5;
}




interface TeamsByCity {
  [key: string]: string;
}

interface TeamsByLeague {
  [key: string]: TeamsByCity;
}

const TEAMS: TeamsByLeague = {
  NBA: {
    "Los Angeles": "Lakers",
    "New York": "Knicks",
    // ...
  },
  NFL: {
    "Los Angeles": "Rams",
    "New York": "Giants",
    // ...
  },
  // ...
};

const getLeague = (): string => {
  // return the league based on some criteria
  return 'NBA';
};

const getCity = (): string => {
  // return the city based on some criteria
  return 'Philadelphia';
};

const league = getLeague();
const city = getCity();
const team = TEAMS[league][city];