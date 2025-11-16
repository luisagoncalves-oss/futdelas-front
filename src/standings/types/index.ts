import { TeamResponse } from "@/team/types";

export interface StandingsProps {
    data: StandingsRow[];
}

export interface StandingsResponse {
    standings: Standings[];
}

export interface Standings {
    id: number;
    name: string;
    rows: StandingsRow[];
    type: string;
    updatedAtTimestamp: number;
}

export interface StandingsRow {
    draws: number;
    id: number;
    losses: number;
    matches: number;
    points: number;
    position: number;
    scoresAgainst: number;
    scoresFor: number;
    team: TeamResponse;
    wins: number;
}