<template>
  <div>
    <h1>Posts</h1>
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
          <th>Item Title</th>
          <th>Item Body</th>
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
      <paginate
        :pageCount="20"
        :clickHandler="clickCallback"
        :prevText="'Prev'"
        :nextText="'Next'"
        :containerClass="'pagination'"
      ></paginate>
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
    clickCallback(pageNum) {
      let loader = this.$loading.show();
      let uri = "http://127.0.0.1:8000/api/index?page=" + pageNum;

      this.axios
        .get(uri)
        .then(response => {
          console.log(response);
          this.posts = response.data.data.data;
          loader.hide();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deletePost(id, index) {
      this.$snotify.confirm(
        "Are you sure you want to delete this post ?",
        "Delete Post",
        {
          // timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          buttons: [
            {
              text: "Yes",
              action: toast => {
                let loader = this.$loading.show();
                let URL = `http://127.0.0.1:8000/api/delete/${id}`;
                this.axios
                  .delete(URL)
                  .then(response => {
                    this.$delete(this.posts, index);
                    this.$snotify.success("Post has been deleted successfully");
                    loader.hide();
                  })
                  .catch(function(error) {
                    this.$snotify.error(error);
                    loader.hide();
                  });
                this.$snotify.remove(toast.id);
              },
              bold: false
            },
            {
              text: "No",
              action: toast => {
                console.log("Clicked: Later");
                this.$snotify.remove(toast.id);
              }
            }
          ]
        }
      );
    }
  },
  created() {
    this.clickCallback(1);
  }
};
</script>


<style scoped>
.pagination {
}
.page-item {
}
</style> 