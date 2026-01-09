const form = document.getElementById("searchForm");
const input = document.getElementById("wordInput");
const output = document.getElementById("output");

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const word = input.value.trim();

  if (!word) {
    output.innerHTML = "<p class='error'>Please enter a word.</p>";
    return;
  }

  fetchWord(word);
});

// Fetch word data from API
function fetchWord(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then((data) => displayResult(data[0]))
    .catch((error) => {
      output.innerHTML = `<p class='error'>${error.message}</p>`;
    });
}

// Display results on the page
function displayResult(data) {
  const meaning = data.meanings[0];
  const definition = meaning.definitions[0];
  const audio = data.phonetics.find(p => p.audio);

  output.innerHTML = `
    <h2>${data.word}</h2>
    <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
    <p><strong>Definition:</strong> ${definition.definition}</p>
    <p><strong>Example:</strong> ${definition.example || "No example available"}</p>
    <p><strong>Synonyms:</strong> ${definition.synonyms?.join(", ") || "None"}</p>
    ${
      audio
        ? `<audio controls src="${audio.audio}"></audio>`
        : "<p>No pronunciation audio available</p>"
    }
  `;
}
