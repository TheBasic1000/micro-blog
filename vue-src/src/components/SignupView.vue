<template>
    <div class="container">
        <flash-message></flash-message>
        <form v-on:submit.prevent="onSignupSubmit">
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="user.username">
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="user.name">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="user.password">
            </div>

            <button type="submit" class="btn btn-warning btn-lg">Sign up</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user: {
                username: '',
                name: '',
                password: ''
            }
        }
    },

    methods: {
        onSignupSubmit() {
            let url = '/users/signup';
            const config = {
                withCredentials: true
            };
            this.axios.post(url, this.user, config).then((response) => {
                if(response.data.success === true) {
                    this.$router.push('/login');
                    this.flash(response.data.message, 'success');
                } else
                    this.flash(response.data.message, 'error');
            }).catch((error) => {
                console.log(error);
                this.flash(error.message, 'error');
            });
        }
    }
}
</script>