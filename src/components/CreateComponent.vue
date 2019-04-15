<template>
  <div>
    <h1>Create Post</h1>
    <form @submit.prevent="addPost">
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
      post: {}
    };
  },
  methods: {
    addPost() {
      let URL = "http://127.0.0.1:8000/api/store";

      this.axios
        .post(URL, this.post)
        .then(data => {
          this.flashSuccess("Post is save successfully");
          this.$router.push({ name: "posts" });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>