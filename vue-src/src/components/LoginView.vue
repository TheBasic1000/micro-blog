<template>
    <div class="container">
        <flash-message></flash-message>
        <form v-on:submit.prevent="onLoginSubmit">
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="user.username">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="user.password">
            </div>

            <button type="submit" class="btn btn-warning btn-lg">Log in</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        onLoginSubmit() {
            let url = '/users/login';
            const config = {
                withCredentials: true
            };
            this.axios.post(url, this.user, config).then((response) => {
                if(response.data.success === true) {
                    this.$bus.$emit('logged', 'User logged');
                    this.$router.push('/profile');
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