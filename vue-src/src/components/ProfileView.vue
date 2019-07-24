<template>
  <div class="container">
    <flash-message></flash-message>
    <h1>Profile</h1>
    <div class="themed-grid-col">Username: {{ username }}</div>
    <div class="themed-grid-col">Name: {{ name }}</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            username: '',
            name: ''
        }
    },

    created: function()
    {
        this.fetchDetails();
    },

    methods: {
        fetchDetails() {
            let url = '/users/profile';
            const config = {
              withCredentials: true
            };
            this.axios.get(url, config).then((response) => {
                this.username = response.data.username;
                this.name = response.data.name;
            }).catch((error) => {
                console.log(error);
                this.flash('Couldn\'t fetch the user data' , 'error');
            });
        }
    }
}
</script>