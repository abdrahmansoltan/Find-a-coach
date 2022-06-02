<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "@/components/Coaches/CoachForm.vue";

export default {
  components: {
    CoachForm,
  },
  methods: {
    // getting data from form-component and handling it through Vuex
    saveData(data) {
      this.$store.dispatch("coaches/registerCoach", data);
      this.$router.replace("/coaches"); // same as push but prevents going backwards
    },
  },
};
</script>
