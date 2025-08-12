<template>
  <ion-list class="bestiaryForm">
    <ion-list>
      <ion-item>
        <ion-select v-model="size" label="Size" interface="popover" label-placement="floating">
          <ion-select-option value="">Any</ion-select-option>
          <ion-select-option v-for="size in sizes" :key="size">{{
          size
        }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-select v-model="type" label="Type" interface="popover" label-placement="floating">
          <ion-select-option value="">Any</ion-select-option>
          <ion-select-option v-for="creatureType in types" :key="creatureType">{{
          creatureType
        }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-select v-model="cr" label="Challenge Rating" interface="popover" label-placement="floating">
          <ion-select-option value="">Any</ion-select-option>
          <ion-select-option v-for="cr in challengeRatings" :key="cr">{{
          cr
        }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-textarea v-model="details" label="Extra Details" label-placement="floating"
          placeholder="Add some additional details about the creature"></ion-textarea>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-button expand="block" @click="generateStats()">Generate Stats</ion-button>
      <ion-button expand="block" fill="outline" @click="generateStory()">Generate Story</ion-button>
      <ion-button expand="block" color="tertiary" @click="imagine()">Generate Image</ion-button>
      <ion-button expand="block" color="tertiary" fill="outline" @click="console.log('hello')">Generate
        Mini</ion-button>
    </ion-list>
  </ion-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cleanPALMResponse } from "../utils/helpers";
const props = defineProps<{
  sizes: string[];
  types: string[];
  challengeRatings: number[];
}>();

const tab = ref("form")
const model = ref("palm");
const size = ref("");
const type = ref("");
const cr = ref("");
const details = ref("");
const stats = ref("");
const monster = useMonster();
const monsterPending = useMonsterPending();
const monsterStory = useMonsterStory();
const imagineImage = useImagineImage();
const savedMonsters = useSavedMonsters();

const generateStats = async () => {
  monsterPending.value = true;
  monster.value = {};
  const { data, status } = await useFetch("/api/monsters", {
    query: {
      cr: cr.value,
      details: details.value,
      model: model.value,
      size: size.value,
      type: type.value,
      limit: 5,
    },
  });
  monsterPending.value = status.value === 'pending';

  const monsterData =
    model.value === "palm"
      ? cleanPALMResponse(data.value?.candidates[0]?.content?.parts[0]?.text ?? "")
      : data.value?.choices[0]?.message?.content ?? "";
  monster.value = JSON.parse(monsterData);
  const allMonsters = JSON.parse(savedMonsters.value) ?? [];
  const combinedMonsters = [...allMonsters, JSON.parse(monsterData)]
  localStorage.setItem('monsters', JSON.stringify(combinedMonsters));
  savedMonsters.value = JSON.stringify(combinedMonsters)
};

const generateStory = async () => {
  const { data } = await useFetch("/api/story", {
    query: {
      cr: cr.value,
      details: details.value,
      model: model.value,
      size: size.value,
      type: type.value,
      name: monster.value.name ?? '',
      alignment: monster.value.alignment ?? '',
    },
  })
  monsterStory.value = data.value?.candidates[0]?.content?.parts[0]?.text ?? ''
}

const imagine = async () => {
  const { data } = await useFetch("/api/imagine", {
    query: {
      cr: cr.value,
      details: details.value,
      model: model.value,
      size: size.value,
      type: type.value,
      limit: 5,
    },
  })
  imagineImage.value = data.value?.data?.[0]?.url ?? ''
}
</script>
<style scoped>
.bestiaryForm {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>