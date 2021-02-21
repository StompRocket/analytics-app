

const moment = require("moment")
function createChartFromViews (views, unit) {
    let sortedViews = views.sort((a, b) => {
        return moment(a).isBefore(moment(b))
    })
    if (sortedViews.length <= 0) {
        return []
    }
    let firstDate = moment(sortedViews[0].time)
    let lastDate = moment(sortedViews[sortedViews.length - 1].time)
    let dayDiff = Math.abs(lastDate.diff(firstDate, "days", true))
    //console.log(sortedViews)
    let standardizedViews = {}
    let standardizedVisitors = {}
    if (!unit) { 
        unit = "hour"
        console.log("dat diff", dayDiff)
    if (dayDiff > 1) {
        unit = "day"
    } 
    }
   
    sortedViews.forEach(view => { 
            let date = moment(view.time).startOf(unit).toISOString()
            if (standardizedViews[date]) {
                standardizedViews[date].count++
            } else { 
                standardizedViews[date] = {count: 0, key: date}
            }
        if (view.landing) { 
 if (standardizedVisitors[date]) {
                standardizedVisitors[date].count++
            } else { 
                standardizedVisitors[date] = {count: 0, key: date}
            }
        }
    })
    let viewsData = []
    let visitorsData = []
    Object.keys(standardizedViews).forEach(a => { 
        viewsData.push({
            t: moment(a).toDate(),
            y: standardizedViews[a].count
        })
    
    })
     Object.keys(standardizedVisitors).forEach(a => { 
        visitorsData.push({
            t: moment(a).toDate(),
            y: standardizedVisitors[a].count
        })
    
    })
    
     sortedViews = viewsData.sort((a, b) => { 
        return moment(a.t).isBefore(moment(b.t))
    })
    let sortedVisitors = visitorsData.sort((a, b) => { 
        return moment(a.t).isBefore(moment(b.t))
    })
    //console.log(standardizedViews, viewsData)
    return {
        views: sortedViews, 
        visitors: sortedVisitors,
        labels: sortedViews.map(a => { return moment(a.t).format("MMMM Do YYYY, h:mm:ss a") }),
        unit: unit
    } 
   
}
module.exports = {createChartFromViews}