<template>
  <div class="container">
    <div class="row">
      <!-- The bootstrap template used in rendering the posts is taken from 'https://bootsnipp.com/snippets/yNa0V' and it has been made by @tantarico -->
      <div class="col-md-6 gedf-main">
        <p v-if="!isLoggedIn">Welcome to MicroBlog! <router-link to="/signup">Sign up</router-link> or <router-link to="/login">Log In</router-link> 
        to start publishing posts to the feed below.</p>
        <p v-if="isLoggedIn">Welcome to MicroBlog! You can create new posts below. Go to <router-link to="/search">Search</router-link> to 
        make searchs by username or hashtag.</p>

        <div v-if="isLoggedIn" class="card gedf-card mb-4">
          <form v-on:submit.prevent="addPost" class="card-body">
            <div class="form-group">
                <label class="sr-only" for="message">post</label>
                <textarea class="form-control" id="message" rows="3" placeholder="What's up today?" maxlength="330" v-model="post.content"></textarea>
            </div>
            <form v-on:submit.prevent="addTag">
              <div class="form-group form-inline">
                  <label class="sr-only" for="tag">tag</label>
                  <input class="form-control col-md-4 mr-2" id="tag" rows="1" placeholder="New tag" maxlength="30" v-model="tag"/>
                  <button type="submit" class="btn btn-primary">Add</button>
              </div>
            </form>
            <div v-for="(tag, index) in post.tags" :key="index">
              <span class="badge badge-primary m-1 float-left">{{ tag }} <a href="#" class="badge badge-primary" @click="removeTag(index)"><b>X</b></a></span>
            </div>
            <div class="btn-toolbar justify-content-between float-right">
              <button type="submit" class="btn btn-primary">Publish</button>
            </div>
          </form>
        </div>
        
        <div v-if="postsFound === false">
          <h3>There are no posts yet :(</h3>
        </div>

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
      isLoggedIn: this.authenticate(),
      tag: '',
      post: {
        content: '',
        tags: []
      },
      posts: [],
      postsFound: true
    }
  },

  computed: {
    reversePosts() {
      return this.posts.slice().reverse();
    }
  },

  created: function()
  {
    this.$bus.$on('logged', () => {
      this.authenticate();
    });
    this.fetchPosts();
  },

  methods: {
    // Check if user is logged in or not
    authenticate() {
      let url = '/users/authenticate';
      const config = {
        withCredentials: true
      };
      this.axios.get(url, config).then((response) => {
        this.isLoggedIn = response.data;
      });
    },

    // Fetch all posts from database
    fetchPosts() {
      let url = '/posts/list';
      this.axios.get(url).then((response) => {
        this.posts = response.data;
        if(this.posts.length === 0)
          this.postsFound = false;
      });
    },

    addTag() {
      this.post.tags.push(this.tag);
      this.tag = '';
    },

    removeTag(id) {
      this.post.tags.splice(id, 1);
    },

    // Add post to the array and update the list
    addPost() {
      let url = '/posts/add';
      const config = {
        withCredentials: true
      };
      this.axios.post(url, this.post, config).then((response) => {
        console.log(response);
        this.fetchPosts();
        this.post.content = '';
        this.post.tags = [];
        this.postsFound = true;
      });
    }
  }
}
</script>