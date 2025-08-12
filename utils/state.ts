export const useMonster = () => useState<any>('monster', () => ({}));
export const useMonsterPending = () => useState<any>('monsterPending', () => false);
export const useMonsterStory = () => useState<any>('monsterStory', () => '')
export const useImagineImage = () => useState<any>('imagineImage', () => '')
export const useSavedMonsters = () => useState<any>('savedMonsters', () => localStorage.getItem('monsters'))