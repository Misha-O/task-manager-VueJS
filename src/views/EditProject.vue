<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" required v-model="title" />
    <label>Details:</label>
    <textarea required v-model="details"></textarea>
    <button>Edit task</button>
  </form>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      title: "",
      details: "",
      uri: "http://localhost:3000/projects/" + this.id,
    };
  },
  async mounted() {
    const res = await fetch(this.uri);
    const project = await res.json();
    this.title = project.title;
    this.details = project.details;
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await fetch(this.uri, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ title: this.title, details: this.details }),
        });
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.log("EditProject: ", error.message);
      }
    },
  },
};
</script>

<style>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  resize: none;
  font-size: 18px;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
</style>
