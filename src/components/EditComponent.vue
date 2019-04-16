<template>
  <div>
    <h1>Edit Post</h1>
    <form @submit.prevent="updatePost">
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
        <button class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      post: [],
      errors: []
    };
  },
  created() {
    let URL = `http://127.0.0.1:8000/api/show/${this.$route.params.id}`;
    this.axios
      .get(URL)
      .then(response => {
        console.log(response.data.data.name);
        this.post = response.data.data;
      })
      .catch(function() {});
  },
  methods: {
    updatePost() {
      if (this.post.name && this.post.description) {
        let URL = `http://127.0.0.1:8000/api/update/${this.$route.params.id}`;
        let loader = this.$loading.show();
        this.axios
          .post(URL, this.post)
          .then(response => {
            this.post = response.data.data;
            this.$router.push({ name: "posts" });
            this.$snotify.success("Post has been updated successfully");
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