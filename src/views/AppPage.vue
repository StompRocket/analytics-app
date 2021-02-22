<template>
  <div class="property">

    <div class="property__nav">
      <router-link to="/" class="brand">
        <img src="../assets/logo.png" alt="SR Logo">
        <div>
          <p class="SR">Stomp<span class="">Rocket</span></p>
          <p class="product">Analytics</p>
        </div>
      </router-link>

      <button class="btn">Settings</button>
    </div>
    <div class="property__timeframe">
      <p>Viewing data for</p>
      <select name="" id="" v-model="timeMode">
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="last7">Last 7 Days</option>
        <option value="last30">Last 30 Days</option>
        <option value="all">All Time</option>
      </select>
    </div>

    <div class="property__stats-header">
      <div class="header-stat">
        <p class="value visitors">{{visitors}}</p>
        <p class="description">visitors</p>
      </div>
      <div class="header-stat">
        <p class="value views">{{totalViews}}</p>
        <p class="description">total views</p>
      </div>

      <div class="header-stat">
        <p class="value">{{pages.length}}</p>
        <p class="description">unique pages visited</p>
      </div>
      <div class="header-stat">
        <p class="value">{{refferers.length}}</p>
        <p class="description">refferers</p>
      </div>
    </div>
    <div class="property__views-graph">
      <div class="chartContainer">
        <canvas id="propertyChart"></canvas>
      </div>

    </div>
    <div class="property__half-stat">
      <div class="header">
        <h3 class="title">Pages</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in pages" :key="page.path">
          <p class="label"> {{page.path}}</p>
          <p class="value"> {{page.views}}</p>
          <!--<progress :max="totalViews" :value="page.views"> {{page.views/totalViews}}% </progress>-->
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
   <div class="property__half-stat">
      <div class="header">
        <h3 class="title">Refferers</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in refferers" :key="page.path">
          <p class="label"> {{page.path}}</p>
          <p class="value"> {{page.views}}</p>
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
    <div class="property__half-quarter-stat">
      <div class="header">
        <h3 class="title">Browsers</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in browsers" :key="page.name">
          <p class="label"> {{page.name}}</p>
          <p class="value"> {{page.views}}</p>
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
    <div class="property__half-quarter-stat">
    <div class="header">
        <h3 class="title">Platforms</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in platforms" :key="page.name">
          <p class="label"> {{page.name}}</p>
          <p class="value"> {{page.views}}</p>
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
    <div class="property__half-quarter-stat">
    <div class="header">
        <h3 class="title">Operating Systems</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in os" :key="page.name">
          <p class="label"> {{page.name}}</p>
          <p class="value"> {{page.views}}</p>
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
    <div class="property__half-quarter-stat">
    <div class="header">
        <h3 class="title">Screen Sizes</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in screens" :key="page.width + ',' + page.height">
          <p class="label"> {{page.width}}x{{page.height}}</p>
          <p class="value"> {{page.views}}</p>
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
       
    <div class="property__half-quarter-stat">
    <div class="header">
        <h3 class="title">Countries</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in countries" :key="page.location.country">
          <p class="label"> {{page.location.country}}</p>
          <p class="value"> {{page.views}}</p>
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
 <div class="property__half-quarter-stat">
    <div class="header">
        <h3 class="title">Regions</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in regions" :key="page.location.region + ','+ page.location.country">
          <p class="label"> {{page.location.region}} / {{page.location.country}}</p>
          <p class="value"> {{page.views}}</p>
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
     <div class="property__half-quarter-stat">
    <div class="header">
        <h3 class="title">Cities</h3>
        <p class="key">views</p>
      </div>

      <div class="table">
        <div class="table__row" v-for="page in cities" :key="page.location.city + ','+ page.location.region">
          <p class="label"> {{page.location.city}} / {{page.location.region}}</p>
          <p class="value"> {{page.views}}</p>
          <div class="progressBar">
          <span :style="{'width': (page.views/totalViews) * 100 + '%'}"></span>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: "propertyPage",
    data() {
      return {
        timeMode: "last7",
        start: new Date(2021, 1, 1).toISOString(),
        end: new Date().toISOString(),
        views: null,
        visitors: 0,
        totalViews: 0,
        refferers: [],
        pages: [],
        browsers: [],
        platforms: [],
        os: [],
        clities: [],
        countries: [],
        regions: [],
        screens: [],
        chart: false
      }
    },
    computed: {
      auth() {

        return this.$store.getters.authData
      },
    },
    watch: {
      timeMode(val) {
        switch (val) {
          case "today":
            console.log("today")
            this.start = this.$moment().startOf('day').toISOString();
            this.end = new Date().toISOString()
            this.init()
            return
          case "yesterday":
            this.start = this.$moment().subtract(1, 'days').startOf('day').toISOString();
            this.end = this.$moment().subtract(1, 'days').endOf('day').toISOString();
            this.init()
            return
          case "last7":
            this.start = this.$moment().subtract(7, 'days').startOf('day').toISOString();
            this.end = new Date().toISOString()
            this.init()
            return
          case "last30":
            this.start = this.$moment().subtract(30, 'days').startOf('day').toISOString();
            this.end = new Date().toISOString()
            this.init()
            return
          case "all":
            this.start = new Date(2021, 1, 1).toISOString()
            this.end = new Date().toISOString()
            this.init()
            return

        }
      },
      auth(val) {
        this.init()
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        if (this.auth.token) {
       
         if (this.chart) {
           console.log(this.chart)
            this.chart.destroy()
             this.chart = false
         }
         
          fetch(`${this.$store.getters.api}/api/v1/data/${this.$route.params.id}/views`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: this.start,
              to: this.end,
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            // console.log(res)
            this.views = res.data
            this.visitors = res.visitors
            this.totalViews = res.totalViews
            let chartData = this.$dataProcessors.createChartFromViews(this.views)
            console.log(chartData)
            var ctx = document.getElementById("propertyChart");
            if (ctx) {
              console.log(chartData.unit)
              this.chart = new Chart(ctx, {
                type: chartData.unit == "hour" ? "bar" : "line",
                data: {
                  labels: chartData.lables,
                  datasets: [{
                      label: "visitors",
                      data: chartData.visitors,
                      cubicInterpolationMode: 'monotone',
                      tension: 0,
                      backgroundColor: "#d35e5d",
                      borderColor: "#d35e5d",
                      fill: false,

                    },
                    {
                      label: "views",
                      data: chartData.views,
                      cubicInterpolationMode: 'monotone',
                      tension: 0,
                      backgroundColor: "#894d4d",
                      borderColor: "#894d4d",
                      fill: false,

                    }
                  ],

                },
                options: {
                  //aspectRatio: 5,
                  responsive: true,
                  maintainAspectRatio: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    xAxes: [{
                      type: "time",
                      time: {
                        unit: chartData.unit
                      },
                      gridLines: {
                        display: false
                      }
                    }],
                    yAxes: [{

                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 6
                      },
                      gridLines: {
                        display: true
                      }
                    }]
                  }
                }
              });
            }
          })
          fetch(`${this.$store.getters.api}/api/v1/data/${this.$route.params.id}/pages`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: this.start,
              to: this.end,
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            // console.log(res)
            this.pages = res.data.sort((a,b)=> {
              return a.views < b.views
            })

          })
          fetch(`${this.$store.getters.api}/api/v1/data/${this.$route.params.id}/refferers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: this.start,
              to: this.end,
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            // console.log(res)
            this.refferers = res.data.sort((a,b)=> {
              return a.views < b.views
            })

          })
          fetch(`${this.$store.getters.api}/api/v1/data/${this.$route.params.id}/browsers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: this.start,
              to: this.end,
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            // console.log(res)
            this.browsers = res.data.sort((a,b)=> {
              return a.views < b.views
            })

          })
          fetch(`${this.$store.getters.api}/api/v1/data/${this.$route.params.id}/os`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: this.start,
              to: this.end,
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            //console.log(res)
            this.os = res.data.sort((a,b)=> {
              return a.views < b.views
            })

          })
          fetch(`${this.$store.getters.api}/api/v1/data/${this.$route.params.id}/platforms`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: this.start,
              to: this.end,
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            // console.log(res)
            this.platforms = res.data.sort((a,b)=> {
              return a.views < b.views
            })

          })
          fetch(`${this.$store.getters.api}/api/v1/data/${this.$route.params.id}/screens`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: this.start,
              to: this.end,
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            // console.log(res)
            this.screens = res.data.sort((a,b)=> {
              return a.views < b.views
            })

          })
          fetch(`${this.$store.getters.api}/api/v1/data/${this.$route.params.id}/locations`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: this.start,
              to: this.end,
              auth: this.auth.token
            })

          }).then(res => res.json()).then(res => {
            //console.log(res)
            this.cities = res.cities.sort((a,b)=> {
              return a.views < b.views
            })
            this.countries = res.countries.sort((a,b)=> {
              return a.views < b.views
            })
            this.regions = res.regions.sort((a,b)=> {
              return a.views < b.views
            })
          })
        }
      }
    }
  }
</script>