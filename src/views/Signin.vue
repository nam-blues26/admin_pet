<script setup>
import { onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";
const body = document.getElementsByTagName("body")[0];

const store = useStore();
onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});
onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});
</script>
<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="form-container">
                  <h2>Sign In</h2>
                  <form role="form" id="signInForm" @submit.prevent="login">
                    <div class="form-group">
                      <input id="email" type="text" placeholder="Username" name="email" size="lg" required v-model="username"/>
                    </div>
                    <div class="form-group">
                      <input id="password" type="password" placeholder="Password" name="password" size="lg" required v-model="password"/>
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-submit" variant="gradient" color="success" value="submit">Sign in</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url(&quot;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg&quot;);
                  background-size: cover;
                ">
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">
                  "Attention is the new currency"
                </h4>
                <p class="text-white position-relative">
                  The more effortless the writing looks, the more effort the
                  writer actually put into the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import UserService from '../service/UserService.js'
import Swal from 'sweetalert2';
import VueCookies from 'vue-cookies';
import router from '@/router';
export default {
  props: [''],
  components: {
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const response = await UserService.login(this.username, this.password);
      if (response.status == 200) {
        this.loggedIn = true;
        // Lưu trạng thái đăng nhập vào cookie với tên là "loggedIn" và thời gian sống 1 giờ
        VueCookies.set('loggedIn', true, '20m');
        router.push("/dashboard-default")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
        })
      }
    },
  },
}

</script>
<style>
.form-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
}

.btn-submit {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
