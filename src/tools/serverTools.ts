export const firebaseVideoURLtoScore = async (url: string, transcript: string): Promise<number> => {
  let aiScore = await fetch("/api/scoreVideo", {
    method: "POST",
    body: JSON.stringify({
      url: url,
      transcript: transcript,
    }),
  }).then(async (response) => {
    return response.json().then((data) => {
      return data.score;
    });
  });
  console.log("AI Score: " + aiScore);
  return aiScore * 10;
};

export const textToScore = async (text: string): Promise<number> => {
  let aiScore = await fetch("/api/scoreText", {
    method: "POST",
    body: JSON.stringify({
      text: text,
    }),
  }).then(async (response) => {
    return response.json().then((data) => {
      return data.score;
    });
  });
  console.log("AI Score: " + aiScore);
  return aiScore * 10;
};
