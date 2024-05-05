import type WordPuzzle from '../../core/types/WordPuzzle.type'


export function getWordPuzzlesForGame() {
  return new Promise<[WordPuzzle, WordPuzzle, WordPuzzle, WordPuzzle, WordPuzzle]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          category: 'Animals',
          word: 'Elephant'
        },
        {
          category: 'Fruits',
          word: 'Banana'
        },
        {
          category: 'Cities',
          word: 'Paris'
        },
        {
          category: 'Countries',
          word: 'Spain'
        },
        {
          category: 'Colors',
          word: 'Red'
        }
      ])
    })
  })
}
