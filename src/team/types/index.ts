export interface TeamResponse {
  id: number;
  name: string;
  nameCode: string;
  teamColors: TeamColors;
  manager: Manager;
  pregameForm: PregameForm;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface Manager {
  name: string;
}

export interface PregameForm {
  position: number;
}

export interface TeamProps {
  team: TeamResponse;
}