// Gettting the data from the Url
// URL :  https://jacintodesign.github.io/quotes-api/data/quotes.json

const quoteContainer = document.getElementById("quote_container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new_quote");
const loader = document.getElementById("loader");

let apiQuote = [];

const loading = () => {
  quoteContainer.hidden = true;
  loader.hidden = false;
};

const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

const newQuote = () => {
  loading();
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  //   Checking the author is available or not
  if (!quote.author) {
    quoteAuthor.innerText = "Unknown";
  } else {
    quoteAuthor.innerText = `- ${quote.author}`;
  }

  //   Checking the length of the quote
  if (quote.length > 50) {
    quoteText.classList.add("long_quote");
  } else {
    quoteText.classList.remove("long_quote");
  }
  // Set Quote And Hide Loader
  quoteText.innerText = quote.text;
  complete();
};

const getQuote = async () => {
  loading();
  const URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(URL);
    apiQuote = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
};

const tweetQuote = () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
  window.open(tweetUrl, "_blank");
};

// Event Listener

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuote();
