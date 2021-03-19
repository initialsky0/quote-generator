//  Get Quote from API
async function getQuote(quoteText, authorText, quoteContainer, loader) {
   showLoadingSpinner(quoteContainer, loader);
   // proxyUrl to bypass CORS
   const proxyUrl = 'https://cors-anywhere-initialsky.herokuapp.com/';
   const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

   try {
      const resp = await fetch(proxyUrl + apiUrl);
      const data = await resp.json();

      // If author is blank, add 'Unknown'
      if(data.quoteAuthor === '') {
         authorText.innerText = 'Unknown';
      } else {
         authorText.innerText = data.quoteAuthor;
      }

      // Reduce font size for long quote
      if(data.quoteText.length > 120) {
         quoteText.classList.add('long-quote');
      } else {
         quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.quoteText;
      hideLoadingSpinner(quoteContainer, loader);
   } catch(err) {
      showLoadingSpinner(quoteContainer, loader);
      getQuote(quoteText, authorText, quoteContainer, loader);
      console.log('Encounter an error, reloading:', err);
   }
}

function showLoadingSpinner(quoteContainer, loader) {
   quoteContainer.hidden = true;
   loader.hidden = false;
}

function hideLoadingSpinner(quoteContainer, loader) {
   if(!loader.hidden) {
      quoteContainer.hidden = false;
      loader.hidden = true;
   }
}

// Tweet quote
function tweetQuote(quoteText, authorText) {
   const quote = quoteText.innerText;
   const author = authorText.innerText;
   const twitterurl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
   window.open(twitterurl, '_blank');
}

// main function for the site
function main() {
   
   // Declare variables
   const quoteContainer = document.getElementById('quote-container');
   const loader = document.getElementById('loader');
   const quoteText = document.getElementById('quote');
   const authorText = document.getElementById('author');
   const twitterBtn = document.getElementById('twitter');
   const newQuoteBtn = document.getElementById('new-quote');
   
   // on load
   getQuote(quoteText, authorText, quoteContainer, loader);
   
   // Event Listeners
   newQuoteBtn.addEventListener('click', () => getQuote(quoteText, authorText, quoteContainer, loader))
   twitterBtn.addEventListener('click', () => tweetQuote(quoteText, authorText));

}

main();