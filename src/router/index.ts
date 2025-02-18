import { createRouter, createWebHistory } from 'vue-router'
import StageView from "@/views/StageView.vue";
import SponsorView from "@/views/SponsorView.vue";
import SpeakerView from "@/views/SpeakerView.vue";
import PovedaliONasView from "@/views/PovedaliONasView.vue";
import PageBuilderView from "@/views/PageBuilderView.vue";
import GalleryView from "@/views/GalleryView.vue";



const routes = [

  {
    path: '/',
    name: 'stages',
    component: StageView
  },

  {
    path: '/sponsors',
    name: 'sponsors',
    component: SponsorView
  },

  {
    path: '/speakers',
    name: 'speakers',
    component: SpeakerView
  },

  {
    path: '/povedaliONas',
    name: 'povedaliONas',
    component: PovedaliONasView
  },

  {
    path: '/pagebuilder',
    name: 'pagebuilder',
    component: PageBuilderView
  },

  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryView
  },





]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
