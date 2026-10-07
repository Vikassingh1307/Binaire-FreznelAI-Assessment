# Binaire-FreznelAI-Assessment

This project is a recreation of the Steam Web-Store UI, built as part of the Binaire Private Limited Javascript Developer Assessment.

## Features Implemented
- **3 Reference UIs Replicated:** Homepage, Top Sellers (Search), and Open World Category.
- **Tech Stack:** React (Vite), TypeScript, Tailwind CSS, and GSAP for animations.
- **Firebase Authentication:** Custom Sign-up and Login screen using Firebase.
- **TMDB API Integration:** Fetches movies/game data using OOP principles.
- **Custom Lazy Loading:** Built from scratch using `IntersectionObserver` (no external libraries).
- **Custom Pagination:** Built from scratch.
- **Offline Support:** App detects network loss, displays a UI indicator, and falls back to `localStorage` cached data.
- **Accessibility & Interactions:** Full support for `hover`, `focus`, `focus-visible`, `focus-within`, `active`, and `target` states.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configuration:**
   - Open `src/services/apiClient.ts` and add your **TMDB API Key**.
   - Open `src/config/firebase.ts` and add your **Firebase Project Configuration**.

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view the application.

## Architecture Highlights
- **OOP Principles:** Services like `TMDBApiClient`, `FirebaseAuthService`, and `LazyImageObserver` are built as Classes.
- **No SSR:** Rendered purely on the client-side as requested.
