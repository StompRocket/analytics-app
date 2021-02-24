

const moment = require("moment")
var expression = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
function createChartFromViews (views, unit) {
    let sortedViews = views.sort((a, b) => {
        return moment(a).isBefore(moment(b))
    })
    if (sortedViews.length <= 0) {
        return []
    }
    let arrayFirst = moment(sortedViews[0].time)
    let arrayLast = moment(sortedViews[sortedViews.length - 1].time)
    let firstDate = arrayLast.isAfter(arrayFirst) ? arrayFirst : arrayLast;
    let lastDate = arrayLast.isAfter(arrayFirst) ? arrayLast : arrayFirst;
    let dayDiff = lastDate.diff(firstDate, "days", true)
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
                standardizedViews[date] = {count: 1, key: date}
            }
        if (view.landing) { 
 if (standardizedVisitors[date]) {
                standardizedVisitors[date].count++
            } else { 
                standardizedVisitors[date] = {count: 1, key: date}
            }
        }
    })
/*
    let workingDay = moment(firstDate)

    do { 
        workingDay = workingDay.add(1, unit)
        console.log("day", unit, workingDay.format("MMMM Do YYYY, h:mm:ss a"))

    } while (workingDay.isSame(lastDate, unit))
*/

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
function getURLComponents(url) {
        var pattern = /(.+:\/\/)?([^\/]+)(\/.*)*/i;
        var arr = pattern.exec(url);
        return {
            url: arr[0],
            protocal: arr[1],
            hostname: arr[2],
            page: arr[3]

        }
}
   function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
   }
function validIP (str) { 
    const result = expression.test(str)
    console.log(str, result)
    return result
}
module.exports = {createChartFromViews, getURLComponents, validURL, validIP}