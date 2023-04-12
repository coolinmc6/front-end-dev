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

