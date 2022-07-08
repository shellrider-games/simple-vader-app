async function fetchVaderSentiment(text) {
  const jsonBody = JSON.stringify({ text: text });
  const req = await fetch("/vader-analyse", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: jsonBody,
  });
  const response = await req.json();
  return response;
}

function setOutput(sentiment) {
    const outputDiv = document.getElementById('output');
    let mostly = "";
    if (sentiment.neg >= Math.max(sentiment.neu, sentiment.pos)) {
        mostly = "negative";
    } else if (sentiment.pos >= Math.max(sentiment.neu, sentiment.neg)) {
        mostly = "positive";
    } else {
        mostly = "neutral";
    }
    outputDiv.innerHTML = `
    <p>I think your text is mostly: ${mostly}</p>
    <ul>
        <li>positive: ${sentiment.pos}</li>
        <li>negative: ${sentiment.neg}</li>
        <li>neutral: ${sentiment.neu}</li>
        <li>compound: ${sentiment.compound}</li>
    </ul>
    `
}

window.onload = () => {
    const btn = document.getElementById('vaderBtn');
    btn.addEventListener('click', async () => {
        const textArea = document.getElementById('textInput');
        const output = await fetchVaderSentiment(textArea.value);
        setOutput(output.sentiment);
    });
};
