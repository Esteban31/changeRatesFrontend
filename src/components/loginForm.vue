<template>
      <form v-on:submit.prevent="login">
            <input
                  type="email"
                  class="form-control"
                  placeholder="Enter email"
                  v-model="formData.email"
            />
            <br />
            <input
                  type="password"
                  class="form-control"
                  placeholder="Enter Password"
                  v-model="formData.password"
            />
            <br />
            <div class="form-check">
                  <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                        Remember machine for 30 days
                  </label>
            </div>
            <br />
            <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="submit">Login</button>
            </div>
      </form>
</template>

<script>
export default {
      data() {
            return {
                  formData: {
                        email: "",
                        password: "",
                  }
            }
      },
      methods: {
            // import.meta.env.VITE_API_ROUTE_DEV
            async login() {
                  console.log(this.formData)
            }
      },
}
</script>
