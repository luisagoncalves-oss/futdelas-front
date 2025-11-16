// controller/team.controller.ts
import { TeamResponse } from '../types';

// Mock data
const mockTeams: TeamResponse[] = [
  {
    id: 1,
    name: "Flamengo",
    nameCode: "FLA",
    teamColors: {
      primary: "#C12A2E",
      secondary: "#000000",
      text: "#FFFFFF"
    },
    manager: {
      name: "Tite",
    },
    pregameForm: {
      position: 1,
    }
  },
  {
    id: 2,
    name: "Palmeiras",
    nameCode: "PAL",
    teamColors: {
      primary: "#006437",
      secondary: "#FFFFFF",
      text: "#000000"
    },
    manager: {
      name: "Abel Ferreira",
    },
    pregameForm: {
      position: 2,
    }
  },
  // ... mais 3 times
];

export class TeamController {
  static async getAllTeams(): Promise<TeamResponse[]> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retorna mock data
    return [...mockTeams];
  }

  static async getTeamById(teamId: number): Promise<TeamResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) {
      throw new Error('Time não encontrado');
    }
    
    return { ...team };
  }
}