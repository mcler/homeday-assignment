// less code for getters/setters and v-model
import { getField, updateField } from 'vuex-map-fields'
import { FormValidationService } from 'homeday-blocks'
import debounce from 'lodash/debounce'
import { getUser } from '@/utils/api'
import { createSetters } from '@/utils/createSetters'
import { isGithubUsernameValid } from '@/utils/isGithubUsernameValid'

export const credentials = {
    namespaced: true,
    state: {
        firstname: '',
        lastname: '',
        username: '',
        usernameChecking: false,
        usernameValid: null,

        email: '',
        agree: false,
    },
    getters: {
        getField, // for v-model support

        emailValid: (state) => !!state.email && FormValidationService.email(state.email),
    },
    mutations: {
        updateField, // for v-model support

        ...createSetters(['firstname', 'lastname',  'username', 'usernameChecking', 'usernameValid', 'email', 'agree']),
    },
    actions: {
        /**
         * Checks validity of GitHub username
         */
        checkUsername({ state: { username }, commit, dispatch }) {
            if (!username) {
                commit('SET_USERNAME_CHECKING', false)
                commit('SET_USERNAME_VALID', null)
                return Promise.resolve()
            }

            if (!isGithubUsernameValid(username)) {
                commit('SET_USERNAME_CHECKING', false)
                commit('SET_USERNAME_VALID', false)
                return Promise.resolve()
            }

            commit('SET_USERNAME_CHECKING', true)
            commit('SET_USERNAME_VALID', null)

            return new Promise(resolve => dispatch('checkUsernameRemote', resolve))
        },
        /**
         * Checks validity of GitHub username via network request
         */
        checkUsernameRemote: debounce(function ({ state: { username }, commit }, resolve) {
            return getUser(username)
                .then(() => commit('SET_USERNAME_VALID', true))
                .catch(() => commit('SET_USERNAME_VALID', false))
                .finally(() => {
                    commit('SET_USERNAME_CHECKING', false)
                    resolve()
                })
        }, 200),
    },
}
