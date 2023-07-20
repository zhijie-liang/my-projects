import Vue from 'vue'
import VueRouter from 'vue-router'
// import News from '../components/App/News'

Vue.use(VueRouter)

const Logo = () => import("../components/App/Logo.vue");
const Home = () => import("../components/App/Home.vue");
const Main = () => import("../components/App/Home/Main.vue");
const Main2 = () => import("../components/App/Home/Main2.vue");
const Main3 = () => import("../components/App/Home/Main3.vue");
const Main4 = () => import("../components/App/Home/Main4.vue");
const Main5 = () => import("../components/App/Home/Main5.vue");
const Main6 = () => import("../components/App/Home/Main6.vue");
const Main7 = () => import("../components/App/Home/Main7.vue");
const Main8 = () => import("../components/App/Home/Main8.vue");
const Main9 = () => import("../components/App/Home/Main9.vue");
const Main10 = () => import("../components/App/Home/Main10.vue");
const Map_Penetration = () => import("../components/App/Map_Penetration.vue");
const Map_Penetration_3D = () => import("../components/App/Map_Penetration_3D.vue");
const Map_3D = () => import("../components/App/Map_3D.vue");
const ProductIntroduction = () => import("../components/BppLZJ/ProductIntroduction.vue");
const News = () => import("../components/BppLZJ/News.vue");
const CityComponent = () => import("../components/App/CityComponent.vue");
const CityMap = () => import("../components/App/CityMap.vue");
const ColorPicker = () => import("../components/App/ColorPicker.vue");
// const Cascader = () => import("../components/App/Cascader.vue");
const ContactUs = () => import("../components/App/ContactUs.vue");
const cs1 = () => import("../components/cs/cs1.vue");
const cs2 = () => import("../components/cs/cs2.vue");
const cs3 = () => import("../components/cs/cs3.vue");

const routes = [
  {
    path: '/Logo',
    name: 'Logo',
    component: Logo,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'Main',
        name: 'Main',
        component: Main
      },
      {
        path: 'Main2',
        name: 'Main2',
        component: Main2
      },
      {
        path: 'Main3',
        name: 'Main3',
        component: Main3
      },
      {
        path: 'Main4',
        name: 'Main4',
        component: Main4
      },
      {
        path: 'Main5',
        name: 'Main5',
        component: Main5
      },
      {
        path: 'Main6',
        name: 'Main6',
        component: Main6
      },
      {
        path: 'Main7',
        name: 'Main7',
        component: Main7
      },
      {
        path: 'Main8',
        name: 'Main8',
        component: Main8
      },
      {
        path: 'Main9',
        name: 'Main9',
        component: Main9
      },
      {
        path: 'Main10',
        name: 'Main10',
        component: Main10
      },
    ]
  },
  {
    path: '/Map_Penetration',
    name: 'Map_Penetration',
    component: Map_Penetration,
  },
  {
    path: '/Map_Penetration_3D',
    name: 'Map_Penetration_3D',
    component: Map_Penetration_3D,
  },
  {
    path: '/Map_3D',
    name: 'Map_3D',
    component: Map_3D,
  },
  {
    path: '/ProductIntroduction',
    name: 'ProductIntroduction',
    component: ProductIntroduction,
  },
  {
    path: '/News',
    name: 'News',
    component: News,
  },
  {
    path: '/CityComponent',
    name: 'CityComponent',
    component: CityComponent,
  },
  {
    path: '/CityMap',
    name: 'CityMap',
    component: CityMap,
  },
  {
    path: '/ColorPicker',
    name: 'ColorPicker',
    component: ColorPicker,
  },
  // {
  //   path: '/Cascader',
  //   name: 'Cascader',
  //   component: Cascader,
  // },  
  // {
  //   path: '/ColorPicker',
  //   name: 'ColorPicker',
  //   component: ColorPicker,
  // },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: ContactUs,
  },
  {
    path: '/cs1',
    name: 'cs1',
    component: cs1,
  },
  {
    path: '/cs2',
    name: 'cs2',
    component: cs2,
  },
  {
    path: '/cs3',
    name: 'cs3',
    component: cs3,
  },
]
const router = new VueRouter({
  routes
})

export default router
