<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 gedf-main">
        <div class="text-center">
          <p class="form-check form-check-inline">Search by: </p>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="exampleRadios" id="username" value="username" v-model="searchMode">
            <label class="form-check-label" for="username">
              Username
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="exampleRadios" id="tag" value="tag" v-model="searchMode">
            <label class="form-check-label" for="tag">
              Tag
            </label>
          </div>
        </div>

        <div class="container mb-4">
          <div class="row justify-content-center">
              <form v-on:submit.prevent="searchForPosts" class="card card-sm">
                <div class="card-body row no-gutters align-items-center">
                  <div class="col-auto">
                    <i class="fas fa-search h4 text-body"></i>
                  </div>
                  <div class="col m-2">
                    <input class="form-control" placeholder="Search for posts" v-model="searchTerm">
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-primary" type="submit">Search</button>
                  </div>
                </div>
              </form>
          </div>
        </div>

        <flash-message></flash-message>

        <div v-for="post in reversePosts" :key="post._id">
          <div class="card gedf-card mb-3">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex justify-content-between align-items-center">
                      <div class="ml-2">
                          <div class="h5 m-0">{{ post.author_name }}</div>
                          <div class="h7 text-muted">@{{ post.author_username }}</div>
                      </div>
                  </div>
              </div>
            </div>
            <div class="card-body">
                <div class="text-muted h7 mb-2">{{ post.time }}</div>
                <p class="card-text">{{ post.content }}</p>
                <div v-for="tag in post.tags" :key="tag">
                  <span class="badge badge-primary mt-1 mr-1 mb-1 float-left">{{ tag }}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      searchMode: 'username',
      searchTerm: '',
      posts: []
    }
  },

  computed: {
    reversePosts() {
      return this.posts.slice().reverse();
    }
  },

  methods: {
    // Search for posts based on search mode which is defined user
    searchForPosts() {
      var url = '';
      if(this.searchMode === 'username')
        url = '/posts/searchbyuser/';
      else if(this.searchMode === 'tag')
        url = '/posts/searchbytag/';

      this.axios.get(url+this.searchTerm).then((response) => {
        this.posts = response.data;
        if(this.posts.length === 0)
          this.flash('No posts found', 'error');
        this.searchTerm = '';
      });
    }
  }
}
</script>