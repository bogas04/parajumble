const $ = document.querySelector.bind(document);

const paragraphs = [
  `A thief was caught in Manchester tonight. Police found him stuck in the elevator. Maintenance was due for over 4 years`,
  `But here’s an interesting, if obvious, insight: the number of shuffled elements (n - m) plus the number of remaining elements (m) is always equal to n. This means we can do the entire shuffle in-place, without any extra space. We use the back of the array to store the shuffled elements, and the front of the array to store the remaining elements. We don’t care about the order of the remaining elements as long as we sample uniformly when picking`,
];

const state = {
  currentParagraphIndex: Math.floor(Math.random() * paragraphs.length),
};

function randomizeArray(array) {
  let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

const jumbledSentences = xs => randomizeArray(xs);

const isWrong = (user, data) => user
  .some((x, index) => data.indexOf(x) !== index)
  ;

const viewParagraph = (paragraphLines, selector) => $(selector).innerHTML = paragraphLines
  .map((line, index) => `<li> ${index}: ${line}</li>`)
  .join('')
''

const viewRandomizedParagraph = () => {
  const jumbled = jumbledSentences(paragraphs[state.currentParagraphIndex].split('.'));

  state.randomParagraphLines = jumbled;

  viewParagraph(jumbled, '.question-lines');
};

const onCheckClicked = () => {
  const userIndices = $('.input')
    .value
    .trim()
    .split(',')
    .map(n => parseInt(n))
    ;

  const { currentParagraphIndex, randomParagraphLines } = state;

  const user = userIndices
    .reduce(
    (arr, userIndex, index) => {
      arr[index] = randomParagraphLines[userIndex];
      return arr;
    },
    Array(randomParagraphLines.length)
    )
    ;

  const data = paragraphs[currentParagraphIndex].split('.');

  const isWrongAnswer = isWrong(user, data);

  $('.result').innerText = isWrongAnswer === false ? 'Correct!' : 'Incorrect!';

  $('.original').style.display = 'block';

  viewParagraph(data, '.original-lines');
};

window.onload = () => {
  $('.check').addEventListener('click', onCheckClicked);

  $('.original').style.display = 'none';

  viewRandomizedParagraph();
};