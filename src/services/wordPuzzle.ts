import type WordPuzzle from '../../core/types/WordPuzzle.type'


export function getWordPuzzlesForGame() {
  return new Promise<[WordPuzzle, WordPuzzle, WordPuzzle, WordPuzzle, WordPuzzle]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          category: 'Przysłowia',
          word: 'Pieniądze to nie wszystko'
        },
        {
          category: 'Znane Postacie',
          word: 'Osioł ze Shreka'
        },
        {
          category: 'Miasta i miasteczka',
          word: 'Kazimierz nad Wisłą'
        },
        {
          category: 'Historia',
          word: 'Bitwa pod Grunwaldem'
        },
        {
          category: 'Kinematografia',
          word: 'Lot nad kukułczym gniazdem'
        }
      ])
    })
  })
}
