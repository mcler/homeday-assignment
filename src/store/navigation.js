export const navigation = {
    namespaced: true,
    getters: {
        routeName: (_, __, rootState) => rootState.route.name,

        canGoPageEmail: (_, __, rootState) => Boolean(rootState.credentials.firstname && rootState.credentials.lastname && !rootState.credentials.usernameChecking && rootState.credentials.usernameValid),
        canGoPageGithub: (_, getters, rootState, rootGetters) => Boolean(getters.canGoPageEmail && rootState.credentials.agree && rootGetters['credentials/emailValid']),

        buttons: (_, getters) => {
            switch (getters.routeName) {
                case 'home':
                    return {
                        start: true,
                    }
                case 'login':
                    return {
                        prev: { to: 'home' },
                        next: { to: 'email', disabled: !getters.canGoPageEmail },
                    }
                case 'email':
                    return {
                        prev: { to: 'login' },
                        next: { to: 'github', disabled: !getters.canGoPageGithub },
                    }
                case 'github':
                    return {
                        prev: { to: 'email' },
                        next: { disabled: true, hidden: true },
                    }
                default:
                    return {}
            }
        },
    },
}
