<template>
  <div class="tabela-wrapper">
    <div class="tabela-container">
      <!-- Cabeçalho -->
      <div class="cabecalho-tabela">
        <div class="coluna-posicao">
          <Text content="#" size="xs" weight="semibold" color="medium" />
        </div>
        <div class="coluna-time">
          <Text content="Equipe" size="xs" weight="semibold" color="medium" />
        </div>
        <div class="coluna-numero">
          <Text content="J" size="xs" weight="semibold" color="medium" />
        </div>
        <div class="coluna-numero">
          <Text content="V" size="xs" weight="semibold" color="medium" />
        </div>
        <div class="coluna-numero">
          <Text content="E" size="xs" weight="semibold" color="medium" />
        </div>
        <div class="coluna-numero">
          <Text content="D" size="xs" weight="semibold" color="medium" />
        </div>
        <div class="coluna-numero">
          <Text content="GP" size="xs" weight="semibold" color="medium" />
        </div>
        <div class="coluna-numero">
          <Text content="GC" size="xs" weight="semibold" color="medium" />
        </div>
        <div class="coluna-pontos">
          <Text content="PTS" size="xs" weight="semibold" color="medium" />
        </div>
      </div>

      <!-- Linhas dos times -->
      <div 
        v-for="row in standings" 
        :key="row.id"
        class="linha-time"
        :class="getRowClass(row.position)"
      >
        <div class="coluna-posicao">
          <ion-badge 
            :color="getPositionBadgeColor(row.position)"
            class="position-badge"
          >
            {{ row.position }}
          </ion-badge>
        </div>
        
        <div class="coluna-time">
          <TeamFlag
            :team-name="row.team?.name"
            :colors="row.team?.teamColors"
            size="xs"
          />
          <Text 
            :content="row.team?.name"
            size="xs"
            weight="medium"
            custom-class="team-name"
          />
        </div>
        
        <div class="coluna-numero">
          <Text :content="row.matches?.toString()" size="xs" />
        </div>
        
        <div class="coluna-numero">
          <Text :content="row.wins?.toString()" size="xs" />
        </div>
        
        <div class="coluna-numero">
          <Text :content="row.draws?.toString()" size="xs" />
        </div>
        
        <div class="coluna-numero">
          <Text :content="row.losses?.toString()" size="xs" />
        </div>
        
        <div class="coluna-numero">
          <Text :content="row.scoresFor?.toString()" size="xs" />
        </div>
        
        <div class="coluna-numero">
          <Text :content="row.scoresAgainst?.toString()" size="xs" />
        </div>
        
        <div class="coluna-pontos">
          <Text 
            :content="row.points?.toString()" 
            size="xs" 
            weight="bold" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonBadge } from '@ionic/vue'
import Text from '../../../components/text/index.component.vue'
import TeamFlag from '../../../team/components/team-flag.component.vue'
import { TableProps } from './types';

defineProps<TableProps>()

const getRowClass = (position: number) => {
  const classes = []
  if (position % 2 === 0) classes.push('linha-par')
  if (position <= 4) classes.push('zona-libertadores')
  if (position > 12) classes.push('zona-rebaixamento')
  return classes
}

const getPositionBadgeColor = (position: number): string => {
  if (position <= 4) return 'success'
  if (position > 12) return 'danger'
  return 'medium'
}
</script>

<style scoped>
.tabela-wrapper {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
}

.tabela-container {
  min-width: 600px;
  width: 100%;
}

.cabecalho-tabela {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
  padding: 12px 8px;
  font-weight: 600;
  gap: 4px;
  position: sticky;
  left: 0;
}

.linha-time {
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #f1f3f4;
  gap: 4px;
  min-height: 48px;
}

.linha-par {
  background: #fafbfc;
}

.zona-libertadores {
  background: rgba(40, 167, 69, 0.05);
  border-left: 3px solid var(--ion-color-success);
}

.zona-rebaixamento {
  background: rgba(220, 53, 69, 0.05);
  border-left: 3px solid var(--ion-color-danger);
}

.coluna-posicao {
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.coluna-time {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding-right: 8px;
  flex-shrink: 0;
}

.coluna-numero {
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.coluna-pontos {
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-weight: 600;
}

.position-badge {
  font-size: 0.7rem;
  min-width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0; 
  line-height: 1;
}

::v-deep(.team-name) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  margin: 0;
}

::v-deep(.text-size-xs) {
  line-height: 1.2;
  margin: 0;
}

.tabela-wrapper::-webkit-scrollbar {
  height: 6px;
}

.tabela-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.tabela-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.tabela-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@media (min-width: 768px) {
  .tabela-container {
    min-width: auto;
    width: 100%;
  }
  
  .cabecalho-tabela {
    padding: 14px 12px;
    gap: 8px;
  }
  
  .linha-time {
    padding: 14px 12px;
    gap: 8px;
    min-height: 52px;
  }
  
  .coluna-posicao {
    width: 36px;
  }
  
  .coluna-numero {
    width: 32px;
  }
  
  .coluna-pontos {
    width: 40px;
  }
  
  .coluna-time {
    gap: 12px;
  }
  
  .position-badge {
    min-width: 24px;
    height: 24px;
  }
}

@media (min-width: 1024px) {
  .cabecalho-tabela {
    padding: 16px;
    gap: 12px;
  }
  
  .linha-time {
    padding: 16px;
    gap: 12px;
  }
  
  .coluna-posicao {
    width: 40px;
  }
  
  .coluna-numero {
    width: 36px;
  }
  
  .coluna-pontos {
    width: 44px;
  }
  
  .coluna-time {
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .tabela-container {
    min-width: 550px; 
  }
  
  .cabecalho-tabela {
    padding: 10px 6px;
    gap: 3px;
  }
  
  .linha-time {
    padding: 10px 6px;
    gap: 3px;
    min-height: 44px;
  }
  
  .coluna-posicao {
    width: 28px;
  }
  
  .coluna-numero {
    width: 24px;
  }
  
  .coluna-pontos {
    width: 32px;
  }
  
  .coluna-time {
    gap: 6px;
  }
  
  .position-badge {
    min-width: 20px;
    height: 20px;
    font-size: 0.65rem;
  }
}
</style>