import { Team } from "./team.type";

export interface EventsResponse {
    events: Event[];
    hasNextPage: boolean;
}

export interface Event {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    season: Season;
    status: Status;
    roundInfo: RoundInfo;
}

export interface Season {
    id: number;
    name: string;
    year: string;
}

export interface Status {
    code: number;
    description: string;
    type: string;
}

export interface RoundInfo {
    round: number;
}