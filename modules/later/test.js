var later = require('later');
later.date.localTime();

console.log("Now:"+new Date());

var demo1_a = {schedules: [{h_a: [17]}]};
var demo2_b = {schedules: [{h_b: [17]}]};

var occurrences = later.schedule(demo1_a).next(3);
for(var i = 0; i < occurrences.length; i++) {
    console.log(occurrences[i]);
}

occurrences = later.schedule(demo2_b).next(3);
for(var i = 0; i < occurrences.length; i++) {
    console.log(occurrences[i]);
}