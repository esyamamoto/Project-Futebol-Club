const matchesOk =
    [
        {
          id: 1,
          homeTeamId: 16,
          homeTeamGoals: 1,
          awayTeamId: 8,
          awayTeamGoals: 1,
          inProgress: false,
          homeTeam: {
            teamName: "São Paulo"
          },
          awayTeam: {
            teamName: "Grêmio"
          }
        },
        {
          id: 2,
          homeTeamId: 9,
          homeTeamGoals: 1,
          awayTeamId: 14,
          awayTeamGoals: 1,
          inProgress: false,
          homeTeam: {
            teamName: "Internacional"
          },
          awayTeam: {
            teamName: "Santos"
          }
        },
      ];
      
      const finishMatches = matchesOk.filter((match) => {
      match.inProgress === false
      });

      const progressMatches = matchesOk.filter((match) => {
      match.inProgress === true;
});



const NewMatches = {
	homeTeamId: 12,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const NewTeam = {
	id: 49,
	...NewMatches,
	inProgress: true,
}

const invalidMatch = {
	homeTeamId: 999999,
	awayTeamId: 8,
	homeTeamGoals: 2,
	awayTeamGoals: 2
}

const invalidEqualTeam = {
	homeTeamId: 10,
	awayTeamId: 10,
	homeTeamGoals: 2,
	awayTeamGoals: 2
}

const UpdateMatches = {
	homeTeamGoals: 3,
	awayTeamGoals: 1,
}

export {
    matchesOk,
    progressMatches,
    finishMatches,
    NewMatches,
    NewTeam,
    invalidMatch,
    invalidEqualTeam,
    UpdateMatches,
    }