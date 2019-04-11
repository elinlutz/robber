function decode (sentence) {
  let decodedSentence = []
  if (isRobberLanguage(sentence)) {
    decodeSentence(sentence, decodedSentence)
    return decodedSentence.join('')
  } else {
    return 'Your sentence is not decodable. Try again.'
  }
}

function isRobberLanguage (sentence) {
  var consonants = sentence.replace(/a|o|u|å|e|i|y|ä|ö|[.,\s]/gi, '')
  for (var i = consonants.length / 2; i >= 0; i--) {
    if (consonants.charAt(0) === consonants.charAt(1)) {
      consonants = consonants.substr(2)
    } else {
      return false
    }
  }
  return true
}

function decodeSentence (sentence, finalsentence) {
  for (var n = 0; n <= sentence.length; n++) {
    var letter = sentence.charAt(n)
    const upperLetter = letter.toUpperCase()
    if (['A', 'O', 'U', 'Å', 'E', 'I', 'Y', 'Ä', 'Ö'].indexOf(upperLetter) >= 0) {
      finalsentence.push(letter)
      n = n++
    } else if (sentence.charAt(n) === sentence.charAt(n + 2)) {
      finalsentence.push(sentence.charAt(n))
      n = n + 2
    } else {
      finalsentence.push(letter)
    }
  }
}

module.exports.decode = decode
