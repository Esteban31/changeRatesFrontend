<template>
      <div class="container-fluid">
            <center>
                  <h1>Currency Converter</h1>
                  <br />
                  <p>
                        Convert popular currencies from around the world with
                        updated exchange rates using our calculator.
                  </p>
            </center>
            <div class="row">
                  <div class="col-md-12">
                        <dashboardCard />
                  </div>
            </div>
      </div>
</template>

<script>
import dashboardCard from "../components/dashboardCard.vue";
export default {
      components: { dashboardCard },
};
</script>

<style scoped>

.container-fluid {
      margin-top: 20px !important;
      background-color: #F8F8F8;
}
</style>
