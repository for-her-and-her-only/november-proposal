const KEY = 'renewal.celebrationVisited';

export const markCelebrationVisited = () => window.localStorage.setItem(KEY, '1');

export const hasVisitedCelebration = () => window.localStorage.getItem(KEY) === '1';
