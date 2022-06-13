import Vue from 'vue'
import Vuex from 'vuex'

import { credentials } from './credentials'
import { githubUser } from './githubUser'
import { githubRepos } from './githubRepos'
import { navigation } from './navigation'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        credentials,
        githubUser,
        githubRepos,
        navigation,
    },
})
