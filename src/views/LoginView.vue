<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { HdIcon, HdInput, HdLoadingSpinner } from 'homeday-blocks'

import check from 'homeday-assets/S/check.svg'
import error from 'homeday-assets/S/error.svg'

import AppDescription from '@/components/AppDescription.vue'
import AppForm from '@/components/AppForm.vue'
import AppStep from '@/components/AppStep.vue'

export default {
    components: {
        HdIcon, HdInput, HdLoadingSpinner,
        AppDescription, AppForm, AppStep,
    },
    data: () =>({
        icons: { check, error },
    }),
    computed: {
        // automatic get/set for v-model
        ...mapFields('credentials', ['firstname', 'lastname', 'username']),

        ...mapState('credentials', ['usernameChecking', 'usernameValid']),

        showUserCheckError() {
            return !this.usernameChecking && this.usernameValid === false
        },
        showUserCheckSuccess() {
            return !this.usernameChecking && this.usernameValid === true
        },
    },
    watch: {
        usernameValid(newValue) {
            // Not a beautiful way to output in HdInput an outside error
            // as HdInput does not support :error/:helper properties
            if (newValue === false && this.$refs.username.isValid) {
                this.$refs.username.showError('User does not exist')
            }
        },
    },
    methods: {
        ...mapActions('credentials', ['checkUsername']),
    },
}
</script>

<template>
    <AppForm>
        <AppStep :num="2">Your credentials</AppStep>

        <AppDescription>All fields are required to fill</AppDescription>

        <HdInput
            v-model="firstname"
            label="Firstname"
            lang="en"
            name="firstname"
            required />

        <HdInput
            v-model="lastname"
            label="lastname"
            lang="en"
            name="lastname"
            required />

        <HdInput
            ref="username"
            v-model="username"
            label="Github account"
            lang="en"
            name="gh-username"
            required
            @input="checkUsername">
            <template #input-right>
                <HdLoadingSpinner v-show="usernameChecking" class="login-spinner" />
                <HdIcon
                    v-show="showUserCheckError"
                    class="login-icon login-icon--error"
                    :src="icons.error" />
                <HdIcon
                    v-show="showUserCheckSuccess"
                    class="login-icon login-icon--success"
                    :src="icons.check" />
            </template>
        </HdInput>
    </AppForm>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.loading-spinner.login-spinner,
.login-icon {
    height: rem-calc(24);
    width: rem-calc(24);
}

.login-icon {
    &--error path {
        fill: $error-color;
    }
    &--success path {
        fill: $success-color;
    }
}
</style>
