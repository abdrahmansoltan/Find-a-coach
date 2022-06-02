<template>
  <!-- If fetching data fails -->
  <!-- !!error -> to make sure we pass a boolean -->
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>

  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && isLoading" link to="/register"
          >Register as a coach</base-button
        >
      </div>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
</template>

<script>
import CoachFilter from "@/components/Coaches/CoachFilter.vue";
import CoachItem from "../../components/Coaches/CoachItem.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
  },
  components: { CoachItem, CoachFilter },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches");
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    handleError() {
      // reset error status
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
