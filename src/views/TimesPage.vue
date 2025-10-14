<template>
  <div>
    <TeamCard
      v-for="team in times"
      :key="team.teamId"
      :teamData="team"
      :isFavorite="timeFavorito?.teamId === team.teamId"
      @saveFavorite="handleSaveFavorite"
      @deleteFavorite="handleDeleteFavorite"
    />
  </div>
</template>

<script setup lang="ts">
import { Team } from '@/api/types/team.type';
import { onMounted, ref } from 'vue';
import TeamCard from '@/components/TeamCard.vue';
import { FavoriteTeam } from '@/api/types/favoriteTeam.type';

// Mock data baseado no JSON fornecido
const mockTeamsData: Team[] = [
  {
    "teamId": "dbf91e51-3f6e-4b9a-bc98-aaa23b9c98aa",
    "id": 312544,
    "name": "Cruzeiro",
    "nameCode": "CRU",
    "teamColors": {
      "primary": "#0033cc",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
  },
  {
    "teamId": "3fc854ae-2351-46a5-8744-a5fb8771864f",
    "id": 223182,
    "name": "Corinthians",
    "nameCode": "COR",
    "teamColors": {
      "primary": "#ffffff",
      "secondary": "#000000",
      "text": "#000000"
    },
  },
  {
    "teamId": "df3b96d0-97b5-463a-a6ff-b129b93936d3",
    "id": 312545,
    "name": "São Paulo",
    "nameCode": "SAO",
    "teamColors": {
      "primary": "#ffffff",
      "secondary": "#000000",
      "text": "#000000"
    },
  },
  {
    "teamId": "fd606936-f788-46ad-82f2-10bf62aee206",
    "id": 312542,
    "name": "Palmeiras",
    "nameCode": "PAL",
    "teamColors": {
      "primary": "#339966",
      "secondary": "#336633",
      "text": "#336633"
    },
  },
  {
    "teamId": "34c6d092-63a5-4d4e-a5cc-f5e3786f514d",
    "id": 248722,
    "name": "Flamengo",
    "nameCode": "FLA",
    "teamColors": {
      "primary": "#ff0000",
      "secondary": "#000000",
      "text": "#000000"
    },
  },
  {
    "teamId": "06bc6f9f-8c4b-4817-836b-9bba3cc1786b",
    "id": 223371,
    "name": "Ferroviária",
    "nameCode": "FER",
    "teamColors": {
      "primary": "#9c271a",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
  },
  {
    "teamId": "7c0f65c9-6591-4f62-a590-9fa6eecbde90",
    "id": 342756,
    "name": "EC Bahia",
    "nameCode": "BAH",
    "teamColors": {
      "primary": "#ffffff",
      "secondary": "#333399",
      "text": "#333399"
    },
  },
  {
    "teamId": "832ab268-801b-4693-9109-55fe050801ce",
    "id": 368297,
    "name": "Red Bull Bragantino",
    "nameCode": "RBB",
    "teamColors": {
      "primary": "#363636",
      "secondary": "#d8d8d6",
      "text": "#d8d8d6"
    },
  },
  {
    "teamId": "f55828dd-f4fb-473c-8b33-bee41e89944a",
    "id": 286246,
    "name": "América Mineiro",
    "nameCode": "AME",
    "teamColors": {
      "primary": "#056635",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
  },
  {
    "teamId": "9761a22a-3b17-492c-8c43-970dc63bf055",
    "id": 312739,
    "name": "Fluminense",
    "nameCode": "FLU",
    "teamColors": {
      "primary": "#660000",
      "secondary": "#006633",
      "text": "#006633"
    },
  },
  {
    "teamId": "f1ab4234-c49b-488e-aafd-edfd476b99e8",
    "id": 248726,
    "name": "Grêmio",
    "nameCode": "GRE",
    "teamColors": {
      "primary": "#3399ff",
      "secondary": "#000033",
      "text": "#000033"
    },
  },
  {
    "teamId": "63465d89-8448-4084-b969-5523f958a0a2",
    "id": 311632,
    "name": "Internacional",
    "nameCode": "INT",
    "teamColors": {
      "primary": "#cc0000",
      "secondary": "#000000",
      "text": "#000000"
    },
  },
  {
    "teamId": "b782d560-2e3b-486e-8da5-38902253e30b",
    "id": 342763,
    "name": "Real Brasília FC",
    "nameCode": "REA",
    "teamColors": {
      "primary": "#0a87f9",
      "secondary": "#16115f",
      "text": "#16115f"
    },
  },
  {
    "teamId": "4ba29373-b56d-4926-909f-c4fe23b5c6d0",
    "id": 396744,
    "name": "EC Juventude",
    "nameCode": "JUV",
    "teamColors": {
      "primary": "#374df5",
      "secondary": "#374df5",
      "text": "#ffffff"
    },
  },
  {
    "teamId": "cd1f4ec3-b574-497c-8175-0b1cae2d7e2d",
    "id": 284444,
    "name": "3B Sport",
    "nameCode": "3B",
    "teamColors": {
      "primary": "#0000ff",
      "secondary": "#d90015",
      "text": "#d90015"
    },
  },
  {
    "teamId": "270dc447-8770-45f1-b833-396588539592",
    "id": 248717,
    "name": "Sport Recife",
    "nameCode": "REC",
    "teamColors": {
      "primary": "#cc0000",
      "secondary": "#000000",
      "text": "#000000"
    },
  }
];

const times = ref<Team[]>([]);
const timeFavorito = ref<FavoriteTeam | null>(null);
const userId = '12345';

// Função mock para buscar times
const fetchTeams = async () => {
  try {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    times.value = mockTeamsData;
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    times.value = [];
  }
}

// Função mock para buscar time favorito
const fetchFavoriteTeam = async () => {
  try {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Para demonstração, vamos simular que o Corinthians é o favorito
    // Em uma aplicação real, isso viria do localStorage ou banco de dados
    const favoriteFromStorage = localStorage.getItem(`favoriteTeam_${userId}`);
    
    if (favoriteFromStorage) {
      timeFavorito.value = JSON.parse(favoriteFromStorage);
    } else {
      timeFavorito.value = null;
    }
  } catch (error) {
    console.error('Erro ao buscar time favorito:', error);
    timeFavorito.value = null;
  }
}

const handleSaveFavorite = async (teamId: string) => {
  if (timeFavorito.value) {
    console.warn('Usuário já possui um time favorito');
    return;
  }

  try {
    const team = times.value.find(t => t.teamId === teamId);
    if (!team) {
      console.error('Time não encontrado');
      return;
    }

    const favoriteTeam = {
      teamId: teamId,
      anonymousUserId: userId,
      team: team 
    };

    await new Promise(resolve => setTimeout(resolve, 300));
    
    localStorage.setItem(`favoriteTeam_${userId}`, JSON.stringify(favoriteTeam));
    timeFavorito.value = favoriteTeam;
    
    console.log('Time adicionado aos favoritos:', favoriteTeam);
  } catch (error) {
    console.error('Erro ao salvar favorito:', error);
  }
}

const handleDeleteFavorite = async () => {
  try {
    if (timeFavorito.value) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      localStorage.removeItem(`favoriteTeam_${userId}`);
      timeFavorito.value = null;
      
      console.log('Time removido dos favoritos');
    }
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
  }
}

onMounted(async () => {
  await Promise.all([fetchTeams(), fetchFavoriteTeam()]);
});
</script>

<style scoped>
div {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(135deg, #faf9ff 0%, #f5f3ff 100%);
  min-height: 100vh;
}

@media (max-width: 768px) {
  div {
    padding: 12px;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  div {
    padding: 8px;
    gap: 8px;
  }
}
</style>