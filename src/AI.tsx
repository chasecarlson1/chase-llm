namespace AI {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=`;
  type RequestData = {
    contents: [
      {
        parts: [
          { text: string }
        ]
      }
    ]
  };
  export async function proompt(text: string, apiKey: string): Promise<string> {
    const d: RequestData = {
      contents: [
        {
          parts: [
            { text: text }
          ]
        }
      ],
    };
    try {
      const response = await fetch(url + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(d)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const responseData = await response.json();
      const result = responseData.candidates[0].content.parts[0].text;
      console.log(result);
      return result;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return "";
    }
  }

}

export default AI;
