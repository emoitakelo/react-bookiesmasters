// helpers/groupByLeague.js

/**
 * Groups merged fixture-prediction data by league.
 * 
 * Input: [
 *   { league: "Premier League", fixtureId: 1, ... },
 *   { league: "Premier League", fixtureId: 2, ... },
 *   { league: "La Liga", fixtureId: 3, ... }
 * ]
 *
 * Output: [
 *   { league: "Premier League", fixtures: [ {...}, {...} ] },
 *   { league: "La Liga", fixtures: [ {...} ] }
 * ]
 */

export const groupByLeague = (mergedData) => {
  const grouped = {};

  mergedData.forEach((item) => {
    if (!grouped[item.league]) {
      grouped[item.league] = [];
    }
    grouped[item.league].push(item);
  });

  // Convert object to array for easier rendering
  return Object.keys(grouped).map((leagueName) => ({
    league: leagueName,
    leagueLogo: grouped[leagueName][0]?.leagueLogo || "",
    fixtures: grouped[leagueName],
  }));
};
