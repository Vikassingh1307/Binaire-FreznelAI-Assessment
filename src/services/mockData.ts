import { tmdbClient } from '../services/apiClient';

// Fallback data if TMDB API key is missing
export const FALLBACK_DATA = {
  page: 1,
  total_pages: 5,
  results: [
    { id: 1, title: 'Cyber Hunter', overview: 'An expansive open-world adventure.', backdrop_path: '/xg27NrVcbABZAxqv70qcTtafEE0.jpg', poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEN21.jpg' },
    { id: 2, title: 'Galactic Warfare', overview: 'Intense space battles and strategy.', backdrop_path: '/8rpDcsfLJypbO6vtec0g4uNqpGA.jpg', poster_path: '/1Z80mJp1w9jIfPzYI2X1l1vNqS7.jpg' },
    { id: 3, title: 'Fantasy Quest', overview: 'A deep RPG with magical elements.', backdrop_path: '/sR0spHNvwcZ1QWJd17L8S2PofN0.jpg', poster_path: '/t6HIqrHeCPk0QIt82jN8Bq8a0E3.jpg' },
    { id: 4, title: 'Racing Apex', overview: 'High speed competitive racing.', backdrop_path: '/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg', poster_path: '/r2J02Z2OpNTctfOSN1YdGNQ8k1H.jpg' },
    { id: 5, title: 'Survival Island', overview: 'Crafting and survival on a deserted island.', backdrop_path: '/vL5LR6WdxWPjA8ZofLw5tWzO9y1.jpg', poster_path: '/xZ2iE6QhP2oI2P1H9M2sJ6kXmC7.jpg' },
    { id: 6, title: 'Zombie Night', overview: 'Survive the undead hordes.', backdrop_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', poster_path: '/1g0dhYtq4irTY1d1v6PebA4E2G2.jpg' },
    { id: 7, title: 'City Builder 2026', overview: 'Manage your own metropolis.', backdrop_path: '/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg', poster_path: '/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg' },
    { id: 8, title: 'Dungeon Crawler', overview: 'Explore dark dungeons for loot.', backdrop_path: '/gKkl37XNpnq4rZ2g0lGgN3H1Ea.jpg', poster_path: '/vVpKiVsqItdzL8UOFXq4BAnr7nC.jpg' },
  ]
};
