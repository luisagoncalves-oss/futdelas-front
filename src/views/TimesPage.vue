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
import { TeamService } from '@/api/team.service';
import TeamCard from '@/components/TeamCard.vue';
import { FavoriteTeam } from '@/api/types/favoriteTeam.type';
import { FavoriteTeamService } from '@/api/favoriteTeam.service';

const times = ref<Team[]>([]);
const timeFavorito = ref<FavoriteTeam | null>(null);
const userId = '12345';

const fetchTeams = async () => {
  try {
    const result = await TeamService.getAllTeams();
    times.value = result;
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    times.value = [];
  }
}

const fetchFavoriteTeam = async () => {
  try {
    const result = await FavoriteTeamService.getFavoriteTeam(userId);
    timeFavorito.value = result;
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
    const body: FavoriteTeam = {
      teamId: teamId,
      anonymousUserId: userId,
    }
    const result = await FavoriteTeamService.saveTeam(body);
    timeFavorito.value = result;
    console.log('Time adicionado aos favoritos:', result);
  } catch (error) {
    console.error('Erro ao salvar favorito:', error);
  }
}

const handleDeleteFavorite = async () => {
  try {
    if (timeFavorito.value) {
      await FavoriteTeamService.deleteTeam(userId);
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