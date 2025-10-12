import { Team } from "./team.type";
import { TournamentLogo } from "./tournament-logo.type";

export interface TournamentDetails {
    uniqueTournament: UniqueTournament,
    
}

interface UniqueTournament {
    name?: string,
    titleHolder: Team,
    startDateTimestamp?: number,
    endDateTimestamp?: number,
    logo?: string,
}