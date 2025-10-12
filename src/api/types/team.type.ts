export interface Team {
    teamId: string,
    id: number,
    name: string,
    nameCode: string,
    teamColors: object,
}

export interface TeamDetails {
    team?: Team,
    pregameForm?: PregameForm,
}

export interface PregameForm {
    position?: number;
}