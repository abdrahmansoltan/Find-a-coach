import { createRouter, createWebHistory } from "vue-router";
import {
  CoachDetail,
  CoachesRegistration,
  ContactCoach,
  RequestsReceived,
  NotFound,
} from "./pages";
import CoachesList from "./pages/Coaches/CoachesList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      children: [
        { path: "contact", component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    { path: "/register", component: CoachesRegistration },
    { path: "/requests", component: RequestsReceived },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
