<script>
import { mapFields } from 'vuex-map-fields'
import { HdInput, HdCheckbox } from 'homeday-blocks'

import AppDescription from '@/components/AppDescription.vue'
import AppEula from '@/components/AppEula.vue'
import AppForm from '@/components/AppForm.vue'
import AppStep from '@/components/AppStep.vue'

export default {
    components: {
        HdInput, HdCheckbox,
        AppDescription, AppForm, AppEula, AppStep,
    },
    computed: {
        // automatic get/set for v-model
        ...mapFields('credentials', ['email', 'agree']),
    },
}
</script>

<template>
    <AppForm>
        <AppStep :num="3">User agreement</AppStep>

        <AppDescription>All fields are required to fill</AppDescription>

        <HdInput
            label="E-mail"
            lang="en"
            name="email"
            required
            type="email"
            v-model="email" />

        <AppEula />

        <HdCheckbox
            innerLabel="Agree with terms and services"
            lang="en"
            name="agree"
            required
            v-model="agree" />
    </AppForm>
</template>
