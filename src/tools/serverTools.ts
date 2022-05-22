export const firebaseVideoURLtoScore = async (url: string): Promise<number> => {
  let score = 0;
  await fetch("/api/scoreVideo", {
    method: "POST",
    body: JSON.stringify({
      url: url,
    }),
  }).then((response) => {
    response.json().then((data) => {
      score = data.score;
    });
  });
  return score;
};

export const textToScore = async (text: string): Promise<number> => {
  let score = 0;
  await fetch("/api/scoreText", {
    method: "POST",
    body: JSON.stringify({
      text: text,
    }),
  }).then((response) => {
    response.json().then((data) => {
      score = data.score;
    });
  });
  return score;
};
