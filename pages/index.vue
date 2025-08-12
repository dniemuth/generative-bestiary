<template>
  <ion-page>
    <ion-split-pane when="md" content-id="main">
      <ion-menu content-id="main">
        <ion-header>
          <ion-segment v-model="tab">
            <ion-segment-button value="form">
              <ion-label>New Monster</ion-label>
            </ion-segment-button>
            <ion-segment-button value="list">
              <ion-label>Bestiary</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-header>
        <ion-content>
          <StatBlockForm v-if="tab === 'form'" :challengeRatings="CHALLENGE_RATINGS" :sizes="SIZES"
            :types="CREATURE_TYPES" />
          <BestiaryList v-else />
        </ion-content>
      </ion-menu>

      <div class="ion-page" id="main">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <!-- <ion-title>Main View</ion-title> -->
            <ion-buttons>
              <ion-button area-label="show stats"><ion-icon :icon="statsChart" area-hidden="true"></ion-icon></ion-button>
              <ion-button area-label="show story"><ion-icon :icon="book" area-hidden="true"></ion-icon></ion-button>
              <ion-button area-label="show image"><ion-icon :icon="image" area-hidden="true"></ion-icon></ion-button>
              <ion-button area-label="show model"><ion-icon :icon="build" area-hidden="true"></ion-icon></ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <StatBlock />
          <div v-if="monsterStory">{{ monsterStory }}</div>
          <div id="imagine-img">
            <img v-if="imagineImage" :src="imagineImage" alt="Imagine Image" />
          </div>
        </ion-content>
      </div>
    </ion-split-pane>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { book, build, heart, image, statsChart } from 'ionicons/icons';
const tab = ref("form")
import StatBlockForm from '../components/StatBlockForm.vue';
import BestiaryList from '../components/BestiaryList.vue';
import StatBlock from '../components/StatBlock.vue';
import { CHALLENGE_RATINGS, CREATURE_TYPES, SIZES } from '../utils/constants';

const imagineImage = useImagineImage();
const monsterStory = useMonsterStory();
// const { data } = await useFetch("/api/hello");
</script>
