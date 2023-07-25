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
import axios from "axios";
import Swal from "sweetalert2";

const backendUri = import.meta.env.VITE_BACKEND_URL;

export default {
      data() {
            return {
                  formData: {
                        email: "",
                        password: "",
                  },
            };
      },
      methods: {
            async login() {
                  try {
                        const req = await axios.post(
                              `${backendUri}login`,
                              this.formData
                        );

                        if (req.data.process) {
                              localStorage.setItem(
                                    "accesToken",
                                    req.data.token
                              );
                              this.$router.push("/dashboard");
                        } else {
                              Swal.fire({
                                    title: "Upps!",
                                    text: "This user does not exist",
                                    icon: "error",
                                    confirmButtonText: "Aceptar",
                              });
                        }
                  } catch (error) {
                        alert(error.message);
                  }
            },
      },
};
</script>
