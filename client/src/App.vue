<template>
  <v-app>
    <v-main>
      <v-container class="d-flex flex-column align-center justify-center fill-height">
        <SearchForm @error="showError" /> 
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" color="error" class="text-center"> 
      {{ snackbarMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { ref } from 'vue'
import SearchForm from './components/SearchForm.vue'

export default {
  components: {
    SearchForm,
  },
  setup() {
    const snackbar = ref(false)
    const snackbarMessage = ref('')

    const showError = (message) => {
      snackbarMessage.value = message
      snackbar.value = true
    }

    return { snackbar, snackbarMessage, showError }
  },
}
</script>
