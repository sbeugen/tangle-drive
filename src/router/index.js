import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/main_page/MainPage'
import UploadSection from '@/components/main_page/upload_section/UploadSection' 
import DownloadSection from '@/components/main_page/download_section/DownloadSection' 
import AboutPage from '@/components/about_page/AboutPage' 

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      redirect: 'upload',
      children: [
        {
          path: 'upload',
          name: 'Upload',
          component: UploadSection
        },
        {
          path: 'download',
          name: 'Download',
          component: DownloadSection
        }
      ]
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage
    }
  ]
})
