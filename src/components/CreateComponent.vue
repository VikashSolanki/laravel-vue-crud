<template>
  <div>
    <h1>Create Post</h1>
    <form @submit.prevent="addPost">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="(error, index) in errors" :key="index" :row="post">{{ error }}</li>
              </ul>
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Title:</label>
            <input type="text" class="form-control" v-model="post.name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Body:</label>
            <textarea class="form-control" v-model="post.description" rows="5"></textarea>
          </div>
        </div>
      </div>
      <br>
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
    <!-- <router-link></router-link> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      errors: []
    };
  },
  mounted() {},
  methods: {
    addPost() {
      if (this.post.name && this.post.description) {
        let loader = this.$loading.show();
        let URL = "http://127.0.0.1:8000/api/store";

        this.axios
          .post(URL, this.post)
          .then(data => {
            this.$snotify.success("Post has been saved successfully");
            this.$router.push({ name: "posts" });
            loader.hide();
          })
          .catch(function(error) {
            this.$snotify.error(error);
          });
      } else {
        this.errors = [];
        if (!this.post.name) {
          this.errors.push("Title is required.");
        }
        if (!this.post.description) {
          this.errors.push("Body is required.");
        }
      }
    }
  }
};
</script>