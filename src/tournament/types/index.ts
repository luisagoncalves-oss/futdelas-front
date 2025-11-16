import { TeamResponse } from "@/team/types"

export interface TournamentProps {
  name: string
  season: string
  titleHolder: string
  isActive: boolean
  startDate: string
  endDate: string
}

export interface TournamentResponse {
  uniqueTournament: UniqueTournament,
}

export interface UniqueTournament {
    name?: string,
    titleHolder: string,
    startDateTimestamp?: number,
    endDateTimestamp?: number,
}
