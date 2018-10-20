import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Match from '@/components/Match'
import PlayDesigner from '@/components/PlayDesigner'
import PlayerViewer from '@/components/PlayerViewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/match',
      name: 'match',
      component: Match
    },
    {
      path: '/designer',
      name: 'designer',
      component: PlayDesigner
    },
    {
      path: '/players',
      name: 'players',
      component: PlayerViewer
    }
  ]
})
