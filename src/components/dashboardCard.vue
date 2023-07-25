<template>
      <div>
            <div class="card" id="cardRates">
                  <div class="card-body">
                        <div class="row">
                              <div class="col">
                                    <img
                                          :src="selectedImageFrom"
                                          alt=""
                                          class="rounded"
                                    />
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
                              <div class="col">
                                    <input
                                          v-model="amountToChange"
                                          type="number"
                                          class="form-control"
                                    />
                              </div>
                              <div class="col">
                                    <button
                                          class="btn btn-primary convertButton"
                                          v-on:click="convert"
                                          :disabled="convertButton.disabled"
                                    >
                                          {{ convertButton.message }}
                                    </button>
                              </div>
                              <div class="col">
                                    <img
                                          :src="selectedImageTo"
                                          alt=""
                                          class="rounded"
                                    />
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
                              <div class="col">
                                    <input
                                          v-model="changeValue"
                                          type="number"
                                          class="form-control"
                                          readonly
                                    />
                              </div>
                        </div>
                        <br />
                        <div class="row">
                              <h4 v-if="chartData.datasets[0].data.length > 9">
                                    From {{ selectedFrom.currencyName }} to
                                    {{ selectedTo.currencyName }}
                              </h4>
                              <div class="col-md-12">
                                    <br />
                                    <center v-if="loaded">
                                          <img
                                                src="../assets/chart-icon.png"
                                                style="opacity: 0.5"
                                          /><br />
                                          <small
                                                >Start to convert to display
                                                Historial Rates Chart</small
                                          >
                                    </center>
                                    <Line
                                          v-if="
                                                chartData.datasets[0].data
                                                      .length > 9
                                          "
                                          :options="chartOptions"
                                          :data="chartData"
                                    />
                              </div>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
import axios from "axios";
const backendUri = import.meta.env.VITE_BACKEND_URL;

import { Line } from "vue-chartjs";
import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
} from "chart.js";

ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
);

export default {
      components: { Line },
      data() {
            return {
                  loaded: true,
                  convertButton: {
                        disabled: false,
                        message: "Convert",
                  },
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
                  amountToChange: 0,
                  changeValue: 0,
                  chartData: {
                        labels: [
                              "Junio 11",
                              "Junio 12",
                              "Junio 13",
                              "Junio 14",
                              "Junio 15",
                              "Junio 16",
                              "Junio 17",
                              "Junio 18",
                              "Junio 19",
                              "Junio 20",
                        ],
                        datasets: [
                              {
                                    label: "Value across the last 14 days",
                                    backgroundColor: "#f87979",
                                    data: [
                                          1000, 2000, 3000, 4000, 5000, 6000,
                                          7000, 8000, 9000,
                                    ],
                              },
                        ],
                  },
                  chartOptions: {
                        responsive: true,
                  },
            };
      },
      methods: {
            async getAllCountries() {
                  const accessToken = localStorage.getItem("accesToken");

                  try {
                        const res = await axios.get(`${backendUri}countries`, {
                              headers: {
                                    Authorization: `Bearer ${accessToken}`,
                              },
                        });

                        this.from = res.data.countries;
                        this.to = res.data.countries;
                  } catch (error) {
                        alert(error.message);
                  }
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
                        amount: this.amountToChange,
                  };

                  try {
                        this.convertButton.disabled = true;
                        this.convertButton.message = "Converting...";

                        const res = await axios.post(
                              `${backendUri}convert`,
                              data,
                              {
                                    headers: {
                                          Authorization: `Bearer ${accessToken}`,
                                    },
                              }
                        );

                        // assign the result to display it
                        this.changeValue = res.data.result;

                        // Default Data cheat
                        this.chartData.datasets[0].data = [
                              1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,
                              9000,
                        ];

                        // get historial rate from and to Rates
                        this.getHistorialRate();

                        this.convertButton.disabled = false;
                        this.convertButton.message = "Convert";
                  } catch (error) {
                        alert(error.message);
                  }
            },

            async getHistorialRate() {
                  const accessToken = localStorage.getItem("accesToken");

                  const from = this.selectedFrom.currency;
                  const to = this.selectedTo.currency;

                  try {
                        const res = await axios.get(
                              `${backendUri}historial/${from}/${to}`,
                              {
                                    headers: {
                                          Authorization: `Bearer ${accessToken}`,
                                    },
                              }
                        );

                        this.chartData.labels = res.data.labels;
                        this.chartData.datasets[0].data = res.data.values;

                        this.loaded = false;
                  } catch (error) {
                        alert(error.message);
                  }
            },
      },
      mounted() {
            this.getAllCountries();
      },
};
</script>

<style scoped>
#cardRates {
      margin: 80px;
      -webkit-box-shadow: 14px 13px 16px -7px rgba(224, 224, 223, 1);
      -moz-box-shadow: 14px 13px 16px -7px rgba(224, 224, 223, 1);
      box-shadow: 14px 13px 16px -7px rgba(224, 224, 223, 1);
}

img {
      max-width: 30%;
}

.col {
      align-items: center !important;
      display: grid !important;
      justify-items: center !important;
}

.convertButton {
      background: hsla(197, 100%, 63%, 1);

      background: linear-gradient(
            90deg,
            hsla(197, 100%, 63%, 1) 0%,
            hsla(294, 100%, 55%, 1) 100%
      );

      background: -moz-linear-gradient(
            90deg,
            hsla(197, 100%, 63%, 1) 0%,
            hsla(294, 100%, 55%, 1) 100%
      );

      background: -webkit-linear-gradient(
            90deg,
            hsla(197, 100%, 63%, 1) 0%,
            hsla(294, 100%, 55%, 1) 100%
      );

      filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#40c9ff", endColorstr="#e81cff", GradientType=1 );

      border-color: white;

      border-radius: 22px;
}
</style>
