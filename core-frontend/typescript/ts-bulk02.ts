import { getIcon } from "./ts-bulk"

export const ICONS = ['home', 'about', 'account'] as const

const icon = getIcon('home')

type BookDetails = {
  title: string;
  ISBN: string;
}

export const getBookDetails = (bookName: string): BookDetails => {
  return {
    title: bookName,
    ISBN: '1234567890123'
  }
}


type Paragraph = {
  id: string;
  topic: string;
  subtopic: string;
  content1: string;
  content2: string;
  content3: string;
  content4: string;
}

type Citation = {
  id: string;
  paragraphId: string;
  linkId: string;
  factId: string;
}

type Link = {
  id: string;
  url: string;
  title: string;
  description: string;
}

type ContentObject = {
  paragraphs: Paragraph[];
  citations: Citation[];
  links: Link[];
}

type ParagraphParseFunction = () => ContentObject

export const getAllParagraphs: ParagraphParseFunction = (): ContentObject => {
  // do stuff
  
  return {
    paragraphs: [],
    citations: [],
    links: []
  }
}

type RubikCube = {
  id: string;
  colorScheme: string;
  size: string;
}

const solveRubikCube = (cube: RubikCube): string => {
  return 'Solved!'
}

const testObject = {
  id: '12345678',
  colorScheme: 'standard',
  size: '3x3'
}

const solution = solveRubikCube(testObject)

// Icons Example

const availableIcons = {
  warning: 'path/to/warning.svg',
  success: 'path/to/success.svg',
  chevron: 'path/to/chevron.svg',
};

type IconProps = {
  name: keyof typeof availableIcons;
  color: 'error' | 'warning' | 'success';
};

/*
Example of how you could apply it
const Icon = ({ name, color }: IconProps) => {
  const Icon = availableIcons[name];

  return (
    <Icon color={color}/>;
  );
};
export default Icon
*/