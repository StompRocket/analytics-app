<template>
  <div class="page home">
    <div class="home__nav">
      <div class="brand">
        <img src="../assets/logo.png" alt="SR Logo">
        <div>
          <p class="SR">Stomp<span class="">Rocket</span></p>
          <p class="product">Analytics</p>
        </div>
      </div>

      <button class="btn dark" @click="this.$parent.logout">Logout</button>
    </div>
    <div class="home__main">
      <div class="home__main__header">

        <div class="text">
          <h1 class="title--large">Good {{greeting}}</h1>
          <p class="">{{date}}</p>
        </div>
        <button class="btn">Add Site</button>


      </div>
      <div class="home__properties">
        <router-link v-for="property in properties" :key="property['_id']" :to="`/property/${property['_id']}`"
          class="properties__card">
          <h2 class="name">{{property.domain}}</h2>

          <canvas v-if="property.chartData.views && property.chartData.views.length > 1" :id="property['_id']"></canvas>
          <div class="notEnough" v-if="!property.chartData.views || property.chartData.views.length <= 1">
          <p>Not Enough Data</p>
          </div>
          <div class="properties__statRow">
            <p class="visitors">Visitors: <span>{{property.stats.visitors}}</span></p>
            <p class="views">Page Views: <span>{{property.stats.views.length}}</span></p>
          </div>

        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import "moment"
  import "chart.js"
  export default {
    name: "Home",
    data() {
      return {
        date: ""
      }
    },
    computed: {
      auth() {

        return this.$store.getters.authData
      },
      properties() {
        return this.$store.getters.properties
      },
      greeting() {
      let m = this.$moment()
	var g = null; //return g
	
	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
	
	var split_afternoon = 12 //24hr time to split the afternoon
	var split_evening = 17 //24hr time to split the evening
	var currentHour = parseFloat(m.format("HH"));
	
	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		g = "Afternoon";
	} else if(currentHour >= split_evening) {
		g = "Evening";
	} else {
		g = "Morning";
	}
	
	return g;

      }
    },
    watch: {
      auth(val) {
        this.init()
      },
      properties(val) {

      }
    },
    async mounted() {
      this.init()

    },
    methods: {
      init() {
        //console.log(this.auth)
        if (this.auth && this.auth.token) {

          fetch(`${this.$store.getters.api}/api/v1/user/${this.auth.uid}/properties`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            console.log(res, "properties")
            let data = res.data
            data.map(p => {


              console.log(p)
              if (p.stats) {
                console.log(p.stats.visitors, p.stats.views.length)
              }
              let data = this.$dataProcessors.createChartFromViews(p.stats.views, 'day')
              p.chartData = data
              return p



            })
            this.$store.commit("properties", data)
            this.date = this.$moment().format('MMMM Do YYYY, h:mm:ss a')
            this.$nextTick(() => {
              if (data.length > 0) {
                data.forEach(p => {
                  var ctx = document.getElementById(p["_id"]);
                  if (ctx) {
                    var myChart = new Chart(ctx, {
                      type: 'line',
                      data: {
                        labels: p.chartData.lables,
                        datasets: [{
                            label: "views",
                            data: p.chartData.views,
                             cubicInterpolationMode: 'monotone',
                        tension: 0,
                         backgroundColor: "#894d4d",
        borderColor: "#894d4d",
        fill: false,

                          },
                          {
                            label: "visitors",
                            data: p.chartData.visitors,
                             cubicInterpolationMode: 'monotone',
                        tension: 0,
                          backgroundColor: "#d35e5d",
        borderColor: "#d35e5d",
        fill: false,

                          }
                        ],

                      },
                      options: {
                       
                        scales: {
                          xAxes: [{
                            type: "time",
                            time: {
                              unit: p.chartData.unit
                            }
                          }],
                          yAxes: [{

                            ticks: {
                              beginAtZero: true
                            }
                          }]
                        }
                      }
                    });
                  }

                })
              }
            })


          })
        }
      }
    }
  }
</script>