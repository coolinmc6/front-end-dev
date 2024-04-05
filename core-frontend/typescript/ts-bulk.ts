
/**
 * CHECKED
 * @typedef {Object} Book
 * @property {string} title - The title of the book.
 * @property {string} author - The name of the book's author.
 * @property {string} & {length: 13} isbn - The 13-digit ISBN number of the book.
 * @property {number} pages - The total number of pages in the book.
 * @property {Date} & {instanceof: Date} published - The date on which the book was published.
 */
type Book = {
  title: string;
  author: string;
  isbn: string & { length: 13 };
  pages: number;
  published: Date & { instanceof: Date };
};


// type Person = {
//   name: string;
//   age: number;
//   address: {
//     street: string;
//     city: string;
//     zipCode: string & { length: 5 };
//   }
// }

type User = {
  username: string;
  password: string;
  email: string;
  birthdate: Date & { instanceof: Date };
  isActive: boolean; 
}

interface Car {
  make: string;
  model: string;
  year: number;
  mileage: number;
  isElectric: boolean;
  start: () => string;
}

const calculateArea = (
  shape: 'rectangle' | 'circle', 
  dimensions: { width: number, height: number } | { radius: number }
  ): number | string => {
  if (shape === 'rectangle') {
    const { width, height } = dimensions as { width: number, height: number };
    return width * height;
  } else if (shape === 'circle') {
    const { radius } = dimensions as { radius: number };
    return Math.PI * radius ** 2;
  } else {
    return 'Shape not recognized';
  }
}

interface Person {
  name: string;
  age: number;
  email: string;
}

type FilterCriteria = {
  minAge?: number;
  maxAge?: number;
  emailDomain?: string;
};

const filterPeople = (people: Person[], criteria: FilterCriteria): Person[] => {
  return people.filter(person => {
    const { minAge, maxAge, emailDomain } = criteria;

    if (minAge && person.age < minAge) {
      return false;
    }

    if (maxAge && person.age > maxAge) {
      return false;
    }

    if (emailDomain && !person.email.endsWith(emailDomain)) {
      return false;
    }

    return true;
  });
};


const BASE_URL = 'https://www.example.com' as const;

const routes = {
  HOME: `${BASE_URL}/`,
  ABOUT: `${BASE_URL}/about`,
  CONTACT: `${BASE_URL}/contact`,
  PRODUCTS: `${BASE_URL}/products`,
  LOGIN: `${BASE_URL}/login`
} as const;


routes.ABOUT

