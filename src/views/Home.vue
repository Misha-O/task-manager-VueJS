<template>
  <div class="home">
    <FilterNav @filterChange="setFilter" :current="current" />
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject
          :project="project"
          @delete="handleDelete"
          @complete="handleComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SingleProject from "../components/SingleProject.vue";
import FilterNav from "../components/FilterNav.vue";
export default {
  name: "Home",
  components: { SingleProject, FilterNav },
  data() {
    return {
      projects: [],
      current: "all",
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:3000/projects");
      this.projects = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  },
  methods: {
    handleDelete(id) {
      this.projects = this.projects.filter((project) => project.id !== id);
    },
    handleComplete(id) {
      let p = this.projects.find((project) => project.id === id);
      p.complete = !p.complete;
    },
    setFilter($event) {
      this.current = $event;
    },
  },
  computed: {
    filteredProjects() {
      if (this.current === "completed") {
        return this.projects.filter((project) => project.complete);
      }
      if (this.current === "pending") {
        return this.projects.filter((project) => !project.complete);
      }
      return this.projects;
    },
  },
};
</script>
