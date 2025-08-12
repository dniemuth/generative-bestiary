<template>
    <ion-list class="beastList">
        <ion-item v-for="monster in monsters" :key="monster.name" :inset="true" lines="full" button @click="setMonster(monster)">
            {{ monster.name }}
        </ion-item>
    </ion-list>
</template>

<script setup>
const monster = useMonster();
const savedMonsters = useSavedMonsters();
const monsters = ref(JSON.parse(savedMonsters.value))

const setMonster = (e) => {
    monster.value = e;
}
</script>

<style scoped>
.beastList {
    height: 100%;
}
</style>