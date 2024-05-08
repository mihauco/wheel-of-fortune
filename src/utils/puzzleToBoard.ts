function puzzleToBoard(puzzle: string) {
  let lines = ['', '', '', '']
  const words = puzzle.split(' ')

  if (words.some(word => word.length > 13)) {
    new Error('Word too long')
  }

  if (words.length === 1) {
    lines[1] = words[0]
  } else if (words.length === 2) {
    if (words.join(' ').length > 11) {
      lines[1] = words[0]
      lines[2] = words[1]
    } else {
      lines[1] = words.join(' ')
    }
  } else {
    let done
    let startingLine = 1

    while (!done && startingLine >= 0) {
      lines = ['', '', '', '']
      const wordsCopy = [...words]

      for (let i = startingLine; i < lines.length; i++) {
        let spaceLeft = i === 0 || i === 3 ? 11 : 13

        if (wordsCopy.length) {
          while (spaceLeft > 0 && wordsCopy.length) {
            if (lines[i] === '' && wordsCopy[0].length <= spaceLeft) {
              lines[i] = `${wordsCopy.shift()}`
              spaceLeft -= lines[i].length
            } else if (lines[i].length + 1 + wordsCopy[0].length <= spaceLeft) {
              lines[i] = `${lines[i]} ${wordsCopy.shift()}`
              spaceLeft -= lines[i].length
            } else {
              spaceLeft = 0
            }
          }
        } else {
          done = true
          break
        }
      }

      if (!wordsCopy.length) {
        done = true
      } else {
        startingLine--
      }
    }
  }

  return lines.map((line, index) => {
    let rest = 0
    if (index === 0 || index === 3) {
      rest = 11 - line.length
    } else {
      rest = 13 - line.length
    }

    let leftSideSpace = Math.floor(rest / 2)
    let rightSideSpace = rest - leftSideSpace

    return [
      ...(new Array(leftSideSpace).fill('')),
      ...line.split(''),
      ...(new Array(rightSideSpace).fill(''))
    ]
  })
}

export default puzzleToBoard