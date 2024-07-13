<template>
  <v-card class="px-10 py-12" max-width="400" elevation="6" :loading="isLoading">
    <div class="text-h6 mb-4">Введите email</div> 
    <v-form @submit.prevent>
      <v-row>
        <v-col cols="12"> 
          <v-text-field
            v-model="state.email"
            label="Email"
            variant="outlined"
            density="compact"
            hide-details
            @keyup.enter.prevent="submitForm"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="number"
            label="Number"
            v-maska="'##-##-##'"
            variant="outlined"
            density="compact"
            hide-details
            disabled
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" block :disabled="isLoading || v$.$invalid" @click="submitForm">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { vMaska } from "maska/vue"

export default {
  emits: ['error'],
  directives: {
    maska: vMaska
  },
  setup(_, { emit }) {
    const number = ref('')
    const isLoading = ref(false)
    const state = reactive({
      email: ''
    })
    const rules = { 
      email: { required, email }
    }
    const v$ = useVuelidate(rules, state)

    let controller

    const submitForm = async () => {
      v$.value.$touch()

      if (v$.value.$error) {
        emit('error', 'Try valid email please')
        return
      }

      number.value = ''
      isLoading.value = true

      if (controller) {
        controller.abort()
      }

      controller = new AbortController()

      try {
        const response = await axios.get('http://localhost:3000/api/search', {
          params: { email: state.email },
          signal: controller.signal
        })
        number.value = response?.data?.number || ''
        isLoading.value = false
        controller = null
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled')
        } else {
          emit('error', error?.response?.data?.error || error.message)
          isLoading.value = false
          controller = null
        }
        number.value = ''
      } 

      
    
    }

    return { state, number, isLoading, v$, submitForm }
  },
}
</script>
