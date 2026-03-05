import { createRouter, createWebHistory } from "vue-router";

import IntroPage from "../pages/IntroPage.vue";
import QuizPage from "../pages/QuizPage.vue";
import LetterPage from "../pages/LetterPage.vue";
import GalleryPage from "../pages/GalleryPage.vue";
import ReasonsPage from "../pages/ReasonsPage.vue";
import FinalGiftPage from "../pages/FinalGiftPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "intro", component: IntroPage },
    { path: "/quiz", name: "quiz", component: QuizPage },
    { path: "/letter", name: "letter", component: LetterPage },
    { path: "/gallery", name: "gallery", component: GalleryPage },
    { path: "/reasons", name: "reasons", component: ReasonsPage },
    { path: "/gift", name: "gift", component: FinalGiftPage },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});