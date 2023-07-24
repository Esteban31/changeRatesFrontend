<template>
      <div class="container-fluid">
            <div class="row">
                  <div class="col-md-6" id="rightSection">
                        <div class="formContainer">
                              <h2>Login to Account</h2>
                              <small>Enter your credentials to access your account</small>
                              <loginForm/>
                        </div>
                  </div>
                  <div class="col-md-6"  id="leftSection"></div>
            </div>
      </div>
</template>

<script>

import loginForm from '../components/loginForm.vue';

export default {
      components: {loginForm}
}
</script>

<style scoped>

      .formContainer {
            align-items: center;
            justify-content: center;
            padding: 20px;
            width: 400px;
            height: 300px;
            margin-top: 100px;
            gap: 24px;
            margin-left: 160px;
            margin-right: 160px;
      }

      #leftSection {
            background-image: url('../assets/login-bg.png');
            background-size: cover; 
            background-position: center; 
            background-repeat: no-repeat; 
            height: 100vh;
      }
</style>