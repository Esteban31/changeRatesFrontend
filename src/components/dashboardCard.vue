<template>
      <div>
            <div class="card" id="cardRates">
                  <div class="card-body">
                        <div class="row">
                              <div class="col">
                                    <img :src="selectedImageFrom" alt="" class="rounded" />
                              </div>
                              <div class="col">
                                    <select
                                          class="form-control"
                                          v-model="selectedFrom"
                                          v-on:change="changeFlagImage(1)"
                                    >
                                          <option
                                                :value="country"
                                                v-for="country in from"
                                          >
                                                {{ country.currencyName }} -
                                                {{ country.name }}
                                          </option>
                                    </select>
                              </div>
                              <div class="col"><input v-model="amountToChange" type="number" class="form-control"></div>
                              <div class="col"><button class="btn btn-primary" v-on:click="convert">Conversion</button></div>
                              <div class="col">
                                    <img :src="selectedImageTo" alt="" class="rounded" />
                              </div>
                              <div class="col">
                                    <select
                                          class="form-control"
                                          v-model="selectedTo"
                                          v-on:change="changeFlagImage(2)"
                                    >
                                          <option
                                                :value="country"
                                                v-for="country in to"
                                          >
                                                {{ country.currencyName }} -
                                                {{ country.name }}
                                          </option>
                                    </select>
                              </div>
                              <div class="col"><input v-model="changeValue" type="number" class="form-control" readonly></div>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
import axios from "axios";
const backendUri = import.meta.env.VITE_BACKEND_URL;

export default {
      data() {
            return {
                  selectedImageFrom: "https://flagcdn.com/w320/as.png",
                  selectedImageTo: "https://flagcdn.com/w320/as.png",
                  from: [],
                  to: [],
                  selectedFrom: {
                        flag: "https://flagcdn.com/w320/as.png",
                        name: "American Samoa",
                        currencyName: "United States dollar",
                        currency: "USD",
                  },
                  selectedTo: {
                        flag: "https://flagcdn.com/w320/as.png",
                        name: "American Samoa",
                        currencyName: "United States dollar",
                        currency: "USD",
                  },
                  amountToChange:0,
                  changeValue:0
            };
      },
      methods: {
            async getAllCountries() {

                  const accessToken = localStorage.getItem("accesToken");

                  const res = await axios.get(`${backendUri}countries`, {
                        headers: {
                              Authorization: `Bearer ${accessToken}`,
                        },
                  });

                  this.from = res.data.countries;
                  this.to = res.data.countries;
            },

            changeFlagImage(zone) {

                  if (zone === 1) {
                        this.selectedImageFrom = this.selectedFrom.flag;
                  } else {
                        this.selectedImageTo = this.selectedTo.flag;
                        
                  }
            },

            async convert() {

                  const accessToken = localStorage.getItem("accesToken");
                  
                  const data = {
                        from: this.selectedFrom.currency,
                        to: this.selectedTo.currency,
                        amount: this.amountToChange
                  }

                  const res = await axios.post(`${backendUri}convert`, data, {
                        headers: {
                              Authorization: `Bearer ${accessToken}`,
                        },
                  });

                  this.changeValue = res.data.result
            }
      },
      mounted() {
            this.getAllCountries();
      },
};
</script>

<style scoped>
#cardRates {
      margin: 45px;
      -webkit-box-shadow: 14px 13px 16px -7px rgba(224,224,223,1);
      -moz-box-shadow: 14px 13px 16px -7px rgba(224,224,223,1);
      box-shadow: 14px 13px 16px -7px rgba(224,224,223,1);
}

img {
      max-width: 30%;
}

.col{
      align-items: center!important;
      display: grid!important;
      justify-items: center!important;;
}
</style>
