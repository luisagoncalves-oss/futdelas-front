<template>
  <ion-card class="season-card">
    <ion-card-header>
      <ion-card-title class="card-title">Brasileirão Feminino A1</ion-card-title>
    </ion-card-header>
    
    <ion-card-content>
      <div class="season-content">
        <div class="tournament-logo">
          <ion-avatar>
            <ion-img 
              src="assets/br_feminino.png" 
              alt="Logo do Brasileirão"
            />
          </ion-avatar>
        </div>

        <div class="tournament-info">
          <h2 class="tournament-name">Temporada 2025</h2>
          
          <ion-badge class="status-badge">
            Finalizada
          </ion-badge>

          <div class="champion-section">
            <ion-avatar class="champion-avatar">
              <ion-img 
                src="assets/corinthians.png" 
                alt="Campeão atual"
              />
            </ion-avatar>
            <div class="champion-info">
              <strong class="champion-name">Corinthians</strong>
              <p class="champion-label">Atual campeão</p>
            </div>
          </div>
        </div>

        <div class="teams-count">
          <ion-icon :icon="peopleOutline"></ion-icon>
          <span>16 times</span>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonAvatar, 
  IonImg,
  IonBadge, 
  IonIcon
} from '@ionic/vue'
import { peopleOutline } from "ionicons/icons";
</script>

<style scoped>
.season-card {
  border-radius: 16px;
  margin: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  transition: all 0.3s ease;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e1e1e;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 8px;
}

.season-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.tournament-logo ion-avatar {
  width: 64px;
  height: 64px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.tournament-info {
  flex: 1;
  min-width: 200px;
}

.tournament-name {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #2b2b2b;
}

.status-badge {
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  background: #27ae60;
  color: white;
}

.champion-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding: 10px 12px;
  background: #f7f7f9;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.champion-avatar {
  width: 48px;
  height: 48px;
}

.champion-info {
  text-align: left;
  flex: 1;
}

.champion-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f1f1f;
}

.champion-label {
  font-size: 0.8rem;
  color: #777;
}

.teams-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f3f3f5;
  color: #6A0BDF;
  font-weight: 600;
  min-width: 70px;
  text-align: center;
}

.teams-count ion-icon {
  font-size: 1.4rem;
}

.teams-count span {
  font-size: 0.85rem;
}

@media (max-width: 480px) {
  .season-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .teams-count {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
