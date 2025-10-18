// helpers/predictionMerger.js
export const mergePredictionDetails = ({ fixture, prediction, homeData, awayData }) => {
  return {
    fixtureId: fixture.fixture.id,
    league: prediction.league?.name || fixture.league?.name,
    leagueLogo: prediction.league?.logo || fixture.league?.logo,
    date: fixture.fixture.date,
    tip: prediction.predictions?.advice || "N/A",
    venue: fixture.fixture?.venue?.name || "Unknown venue",

    homeTeam: {
      id: fixture.teams.home.id,
      name: fixture.teams.home.name,
      logo: fixture.teams.home.logo,
      form: homeData.form,
      last5Matches: homeData.last5Matches,
    },

    awayTeam: {
      id: fixture.teams.away.id,
      name: fixture.teams.away.name,
      logo: fixture.teams.away.logo,
      form: awayData.form,
      last5Matches: awayData.last5Matches,
    },

    h2h: prediction.h2h || [],
  };
};
