function encode (sentence) {
  let encodedSentence = []
  for (const letter of sentence) {
    encodeLetter(letter, encodedSentence)
  }
  return encodedSentence.join('')
}

function encodeLetter (letter, finalsentence) {
  const upperLetter = letter.toUpperCase()
  if (['A', 'O', 'U', 'Å', 'E', 'I', 'Y', 'Ä', 'Ö'].indexOf(upperLetter) >= 0) {
    finalsentence.push(letter)
  } else if ([' ', '.', ','].indexOf(letter) >= 0) {
    finalsentence.push(letter)
  } else {
    finalsentence.push(letter + 'o' + letter.toLowerCase())
  }
}

module.exports.encode = encode
