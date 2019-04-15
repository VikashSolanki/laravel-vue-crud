<template>
  <div>
    <h1>Posts</h1>
    <flash-message class="myCustomClass"></flash-message>
    <div class="row">
      <div class="col-md-10"></div>

      <div class="col-md-2">
        <router-link :to="{ name: 'create' }" class="btn btn-primary">Create Post</router-link>
      </div>
    </div>
    <br>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Item Name</th>
          <th>Item Price</th>
          <th>Actions</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index" :row="post">
          <td>{{ post.id }}</td>
          <td>{{ post.name }}</td>
          <td>{{ post.description }}</td>
          <td>
            <router-link :to="{name: 'edit', params: { id: post.id }}" class="btn btn-primary">Edit</router-link>
          </td>
          <td>
            <button class="btn btn-danger" @click="deletePost(post.id, index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    };
  },
  methods: {
    deletePost(id, index) {
      let loader = this.$loading.show();
      let URL = `http://127.0.0.1:8000/api/delete/${id}`;
      this.axios
        .delete(URL)
        .then(response => {
          this.$delete(this.posts, index);
          this.flashSuccess("Post is delete successfully");
          loader.hide();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    let loader = this.$loading.show();
    let uri = "http://127.0.0.1:8000/api/index";

    this.axios
      .get(uri)
      .then(response => {
        this.posts = response.data.data;
        loader.hide();
      })
      .catch(function() {});
  }
};
</script>