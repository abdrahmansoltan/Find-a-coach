import { createRouter, createWebHistory } from "vue-router";
import {
  CoachesList,
  CoachDetail,
  CoachesRegistration,
  ContactCoach,
  RequestsReceived,
  NotFound,
  UserAuth
} from "./pages";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        { path: "contact", component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    { path: "/register", component: CoachesRegistration },
    { path: "/requests", component: RequestsReceived },
    { path: "/auth", component: UserAuth },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
