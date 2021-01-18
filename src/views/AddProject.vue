<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" required v-model="title" />
    <label>Details:</label>
    <textarea required v-model="details"></textarea>
    <button @edit="handleEdit">Add task</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      details: "",
      uri: "http://localhost:3000/projects",
    };
  },
  methods: {
    async handleSubmit() {
      let project = {
        title: this.title,
        details: this.details,
        complete: false,
      };
      try {
        const res = await fetch(this.uri, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(project),
        });
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.log("AddProject: ", error.message);
      }
    },
    handleEdit() {
      this.$router.push({ name: "Home" });
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
