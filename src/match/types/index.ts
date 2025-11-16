import { TeamResponse } from "@/team/types";

export interface EventResponse {
  events: Event[];
  hasNextPage: boolean;
}

export interface Event {
  id: number;
  homeTeam: TeamResponse;
  awayTeam: TeamResponse;
  season: SeasonResponse;
  status: StatusResponse;
  roundInfo: RoundInfoResponse;
  homeScore: ScoreResponse;
  awayScore: ScoreResponse;
  startTimestamp: number;
}

export interface ScoreResponse {
  current: number;
  display: number;
  period1: number;
  period2: number;
  normaltime: number;
}

export interface SeasonResponse {
  id: number;
  name: string;
  year: string;
}

export interface StatusResponse {
  code: number;
  description: string;
  type: string;
}

export interface RoundInfoResponse {
  round: number;
}

export interface MatchProps {
  match: Event;
}