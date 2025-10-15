export const extractTeamForm = (prediction) => {
  // Ensure we’re working with a plain JS object
  const plainPrediction = prediction.toObject ? prediction.toObject() : prediction;

  // Safely access form values
  const homeFormRaw = plainPrediction?.teams?.home?.league?.form || "";
  const awayFormRaw = plainPrediction?.teams?.away?.league?.form || "";

  // Trim to last 5 characters
  const homeForm = homeFormRaw.slice(-5);
  const awayForm = awayFormRaw.slice(-5);

  return { home: homeForm, away: awayForm };
};
