

function runLiDoseResponseCurves(input) {

  if(document.getElementById("graph0") !== null) {

	        $( "#graph0" ).html('');

   }

  if(document.getElementById("graph") !== null) {

	        $( "#graph" ).html('');

   }

  if(document.getElementById("graph2") !== null) {

	        $( "#graph2" ).html('');

   }



var margins = [40, 40, 75, 100];

//var width = 600 - margins[1] - margins[3];

var width = 450 - margins[1] - margins[3];

var height = 350 - margins[0] - margins[2];



var nudge = (function () {

  var ε = 1e-6;

  return function (x, s) { return x * (1 + s*ε); }

})();



//var xmin = nudge(1e-11, -1);

//var xmax = 0.001;

var xmin = nudge(0.01, -1);

var xmax = 10;

var ymin = 0;

var ymax =  1.05;

var ymin_GR = -1.05;



// graph0 scale

var xmin0 = 0

var xmax0 = 3

var ymin0 = 0

var ymax0 = 5


var scale_x0 = d3.scale.linear().domain([xmin0, xmax0]).range([0, width]);

var scale_y0 = d3.scale.linear().domain([ymin0, ymax0]).range([height , 0]);



// graph1 scale

var scale_x = d3.scale.log().domain([xmin, xmax]).range([0, width]);

var scale_y = d3.scale.linear().domain([ymin, ymax]).range([height, 0]);



// graph2 scale

var scale_y_GR = d3.scale.linear().domain([ymin_GR, ymax]).range([height, 0]);



var svg0 = d3.select("#graph0").append("svg");

var graph0 = svg0

    .attr("width", width + margins[1] + margins[3])

    .attr("height", height + margins[0] + margins[2])

    .append("g")

    .attr("transform", "translate(" + margins[3] + ", " + margins[0] + ")");



var svg = d3.select("#graph").append("svg");

var graph = svg

    .attr("width", width + margins[1] + margins[3])

    .attr("height", height + margins[0] + margins[2])

    .append("g")

    .attr("transform", "translate(" + margins[3] + ", " + margins[0] + ")");



var svg2 = d3.select("#graph2").append("svg");

var graph2 = svg2

    .attr("width", width + margins[1] + margins[3])

    .attr("height", height + margins[0] + margins[2])

    .append("g")

    .attr("transform", "translate(" + margins[3] + ", " + margins[0] + ")");



var log10 = (function () {

  var factor = 1/Math.log(10);

  return function (x) { return Math.log(x)*factor }

})();



var log2 = (function () {

  var factor = 1/Math.log(2);

  return function (x) { return Math.log(x)*factor }

})();



var areapath0a = graph0.append("path").attr("class", "area");

var graphpath0a = graph0.append("path").attr("id", "line0").attr("class", "plotline");



// colored lines for first plot (0b through 0f)

var areapath0b = graph0.append("path").attr("class", "area");

var graphpath0b = graph0.append("path").attr("id", "line1").attr("class", "plotline").style("stroke", d3.hcl("#993404"));

var areapath0c = graph0.append("path").attr("class", "area");

var graphpath0c = graph0.append("path").attr("id", "line2").attr("class", "plotline").style("stroke", d3.hcl("#c90d0d"));



var areapath0d = graph0.append("path").attr("class", "area");

var graphpath0d = graph0.append("path").attr("id", "line3").attr("class", "plotline").style("stroke", d3.hcl("#D4440E"));



var areapath0e = graph0.append("path").attr("class", "area");

var graphpath0e = graph0.append("path").attr("id", "line4").attr("class", "plotline").style("stroke", d3.hcl("#D95F0E"));



var areapath0f = graph0.append("path").attr("class", "area");

var graphpath0f = graph0.append("path").attr("id", "line5").attr("class", "plotline").style("stroke", d3.hcl("#FE9929"));



var areapath = graph.append("path").attr("class", "area");

var graphpath = graph.append("path").attr("class", "plotline");



var areapath2 = graph2.append("path").attr("class", "area");

var graphpath2 = graph2.append("path").attr("class", "plotline");



var leftedge = 0;

/*

var ec50path = graph.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));

var ic50path = graph.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));

var einfpath = graph.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));

var emaxpath = graph.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));

var mpath = graph.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));





var hmelabel = graph.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + (leftedge + 3) + ", " + 0 + ")")

    .append("text");

hmelabel.append("tspan").text("hme/E");

hmelabel.append("tspan").attr("class", "subscript")

                        .attr("dy", 0.5 + "ex")

                        .text("0");

hmelabel.append("tspan").attr("dy", -0.5 + "ex").text("=");

hmelabel.append("tspan").attr("class", "value");



var emaxlabel = graph.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + (leftedge + 3) + ", " + 0 + ")")

    .append("text");

emaxlabel.append("tspan").text("E");

emaxlabel.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("max");

emaxlabel.append("tspan").attr("dy", -0.5 + "ex").text("/E");

emaxlabel.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("0");

emaxlabel.append("tspan").attr("dy", -0.5 + "ex").text("=");

emaxlabel.append("tspan").attr("class", "value");



var einflabel = graph.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + (leftedge + 3) + ", " + 0 + ")")

    .append("text");



einflabel.append("tspan").text("E");

einflabel.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("∞");

einflabel.append("tspan").attr("dy", -0.5 + "ex").text("/E");

einflabel.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("0");

einflabel.append("tspan").attr("dy", -0.5 + "ex").text("=");

einflabel.append("tspan").attr("class", "value");





var ec50label = graph.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + scale_x(xmin) + ", " +

                                      (height - 3) + ") " + "rotate(-90)")

    .append("text");

ec50label.append("tspan").text("EC");

ec50label.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("50");

ec50label.append("tspan").attr("dy", -0.5 + "ex").text("=");

ec50label.append("tspan").attr("class", "value");





var ic50label = graph.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + scale_x(xmin) + ", " +

                                      (height - 3) + ") " + "rotate(-90)")

    .append("text");

ic50label.append("tspan").text("IC");

ic50label.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("50");

ic50label.append("tspan").attr("dy", -0.5 + "ex").text("=");

ic50label.append("tspan").attr("class", "value");

*/



// graph0

(function () {



  var gfmt = d3.format('0.1g');



  var xax = d3.svg.axis()

      .scale(scale_x0)

      .tickValues(d3.range(0, 4, 1))

      //.tickSubdivide(6)

      //.tickSize(6, 3, 0)

      .tickFormat(gfmt);



  var ticks = graph0.append("g")

        .attr("class", "x axis")

        .attr("transform", "translate(0," + scale_y0(0) + ")")

        .call(xax)

        .selectAll("text")



  var xax_label = graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(xmin0) + ", " +

                                        scale_y0(0.5) + ") " +

                         "rotate(-90)")

      .append("text")

      .style("text-anchor", "middle")



  var yax = d3.svg.axis()

      .scale(scale_y0)

      .orient("left")

      .tickValues(d3.range(0, 6, 1))

      //.tickSubdivide(10)

      //.tickSize(6, 3, 0)

      //.tickFormat(sfmt);

      .tickFormat(gfmt);

  graph0.append("g")

      .attr("class", "y axis")

      .call(yax);



  var yax_label_baseline = -0.65 * margins[3];



  var yax_label = graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(xmin0) + ", " +

                                        scale_y0(0.5) + ") " +

                         "rotate(-90)")

      .append("text")

      .style("text-anchor", "middle")

      .attr("y", yax_label_baseline);



  // yax_label.append("tspan").text("E(D)/E");

  // yax_label.append("tspan").attr("class", "subscript")

  //                         .attr("dy", 0.5 + "ex")

  //                         .text("0");



  // graph.append("g")

  //     .attr("class", "label")

  //     .attr("transform", "translate(" + scale_x(xmin) + ", " +

  //                                       scale_y(0.5) + ") " +

  //                        "rotate(-90)")

  //     .append("text")

  //     .style("text-anchor", "middle")

  //     .text("E(D)/E0")

  //     .attr("y", yax_label_baseline);



  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(xmin0) + ", " +

                                        scale_y0(2.5) + ") " +

                         "rotate(-90)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Cell count normalized to time t=0")

      .attr("y", yax_label_baseline + 15 );



  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(1.5) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Cell population over time at different concentrations")

      .attr("y", -20);



  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(1.5) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Time (days)")

      .attr("y", height + margins[2]/2);



// add legend

// http://d3-legend.susielu.com

//

var ordinal = d3.scale.ordinal()

  .domain(["untreated control", "c = 0.1", "c = 0.31", "c = 1", "c = 3.16", "c = 10"])

  .range([ "#000000", "#993404", "#c90d0d", "#D4440E", "#D95F0E", "#FE9929"]);



graph0.append("g")

  .attr("class", "legendOrdinal")

  .attr("transform", "translate(20,20)");



var legendOrdinal = d3.legend.color()

  //.shape("path", d3.svg.symbol().type("triangle-up").size(150)())
  .shape("path", d3.svg.symbol().size(100)())

  .shapePadding(10)

  .scale(ordinal);



graph0.select(".legendOrdinal")

  .call(legendOrdinal);



graph0.selectAll(".cell")

.on("click", function(e,i) {

   var oldOpacity=d3.select("#line"+i).style("opacity");

   var newOpacity=1-oldOpacity;



   d3.select(this).style("opacity",newOpacity*0.8+0.2);

   d3.select("#line"+i).transition().duration(100)

                    .style("opacity", newOpacity*0.9+0.1);

});



// draw a random circle

//d3.select("body").append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");

//

/*

  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(1.5) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("untreated control")

      .attr("y", height + margins[2] - 15);



  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(0) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .style("fill", d3.hcl("#993404"))

      .text("c = 0.1")

      .attr("y", height + margins[2]);



  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(0.75) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .style("fill", d3.hcl("#c90d0d"))

      .text("c = 0.31")

      .attr("y", height + margins[2]);



  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(1.5) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .style("fill", d3.hcl("#D4440E"))

      .text("c = 1")

      .attr("y", height + margins[2]);





  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(2.25) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .style("fill", d3.hcl("#D95F0E"))

      .text("c = 3.16")

      .attr("y", height + margins[2]);



  graph0.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x0(3) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .style("fill", d3.hcl("#FE9929"))

      .text("c = 10")

      .attr("y", height + margins[2]);

*/



})();



// Lines for graph0

/*

var npoints = 700;

var xs = d3.range(npoints)

    .map(d3.scale.linear().domain([0, npoints])

                          .range([Math.log(xmin), Math.log(xmax)]))

    .map(Math.exp);

*/

var line0a = d3.svg.line()

    .x(function (d) { return scale_x0(d.x); })

    .y(function (d) { return scale_y0(d.y); });



var auxline0a = d3.svg.line()

    .x(function (d) { return ('absx' in d) ? d.absx : scale_x0(d.x); })

    .y(function (d) { return ('absy' in d) ? d.absy : scale_y0(d.y); });



//var mintested = 1e-9;

//var maxtested = 1e-5;



var area0a = (function () {

    var base0a = scale_y0(0);

    return d3.svg.area()

                 .x(function (d) { return scale_x0(d.x); })

                 .y0(base0a)

                 .y1(function (d) {

                    return (((mintested <= d.x) && (d.x <= maxtested)) ?

                            scale_y0(d.y) : base0a);

                  });

})();



var line0b = d3.svg.line()

    .x(function (d) { return scale_x0(d.x); })

    .y(function (d) { return scale_y0(d.y); });



var auxline0b = d3.svg.line()

    .x(function (d) { return ('absx' in d) ? d.absx : scale_x0(d.x); })

    .y(function (d) { return ('absy' in d) ? d.absy : scale_y0(d.y); });



//var mintested = 1e-9;

//var maxtested = 1e-5;



var area0b = (function () {

    var base0b = scale_y0(0);

    return d3.svg.area()

                 .x(function (d) { return scale_x0(d.x); })

                 .y0(base0b)

                 .y1(function (d) {

                    return (((mintested <= d.x) && (d.x <= maxtested)) ?

                            scale_y0(d.y) : base0b);

                  });

})();



var line0c = d3.svg.line()

    .x(function (d) { return scale_x0(d.x); })

    .y(function (d) { return scale_y0(d.y); });



var auxline0c = d3.svg.line()

    .x(function (d) { return ('absx' in d) ? d.absx : scale_x0(d.x); })

    .y(function (d) { return ('absy' in d) ? d.absy : scale_y0(d.y); });



//var mintested = 1e-9;

//var maxtested = 1e-5;



var area0c = (function () {

    var base0c = scale_y0(0);

    return d3.svg.area()

                 .x(function (d) { return scale_x0(d.x); })

                 .y0(base0c)

                 .y1(function (d) {

                    return (((mintested <= d.x) && (d.x <= maxtested)) ?

                            scale_y0(d.y) : base0c);

                  });

})();



var line0d = d3.svg.line()

    .x(function (d) { return scale_x0(d.x); })

    .y(function (d) { return scale_y0(d.y); });



var auxline0d = d3.svg.line()

    .x(function (d) { return ('absx' in d) ? d.absx : scale_x0(d.x); })

    .y(function (d) { return ('absy' in d) ? d.absy : scale_y0(d.y); });



//var mintested = 1e-9;

//var maxtested = 1e-5;



var area0d = (function () {

    var base0d = scale_y0(0);

    return d3.svg.area()

                 .x(function (d) { return scale_x0(d.x); })

                 .y0(base0d)

                 .y1(function (d) {

                    return (((mintested <= d.x) && (d.x <= maxtested)) ?

                            scale_y0(d.y) : base0d);

                  });

})();



var line0e = d3.svg.line()

    .x(function (d) { return scale_x0(d.x); })

    .y(function (d) { return scale_y0(d.y); });



var auxline0e = d3.svg.line()

    .x(function (d) { return ('absx' in d) ? d.absx : scale_x0(d.x); })

    .y(function (d) { return ('absy' in d) ? d.absy : scale_y0(d.y); });



//var mintested = 1e-9;

//var maxtested = 1e-5;



var area0e = (function () {

    var base0e = scale_y0(0);

    return d3.svg.area()

                 .x(function (d) { return scale_x0(d.x); })

                 .y0(base0e)

                 .y1(function (d) {

                    return (((mintested <= d.x) && (d.x <= maxtested)) ?

                            scale_y0(d.y) : base0e);

                  });

})();



var line0f = d3.svg.line()

    .x(function (d) { return scale_x0(d.x); })

    .y(function (d) { return scale_y0(d.y); });



var auxline0f = d3.svg.line()

    .x(function (d) { return ('absx' in d) ? d.absx : scale_x0(d.x); })

    .y(function (d) { return ('absy' in d) ? d.absy : scale_y0(d.y); });



//var mintested = 1e-9;

//var maxtested = 1e-5;



var area0f = (function () {

    var base0f = scale_y0(0);

    return d3.svg.area()

                 .x(function (d) { return scale_x0(d.x); })

                 .y0(base0f)

                 .y1(function (d) {

                    return (((mintested <= d.x) && (d.x <= maxtested)) ?

                            scale_y0(d.y) : base0f);

                  });

})();





// graph1

(function () {

  var xax = d3.svg.axis()

      .scale(scale_x)

      .tickFormat(function (s) { return "" });



  var sfmt = d3.format('s');



  var ticks = graph.append("g")

        .attr("class", "x axis")

        .attr("transform", "translate(0," + scale_y(0) + ")")

        .call(xax)

        .selectAll("text")

        .datum(function (d, i) {

                  var t = parseFloat(d3.format('.2f')(log10(d)));

                  var u = d3.round(t);

                  //return {keep: ((t - u == 0) && !!(u % 2)),

                  return {keep: ((t - u == 0)),

                          value: d,

                          log10: u}})

        .filter(function (d, i) { return d.keep })

        .text(function (d, i) {

                return d.log10 < -4 ? null : d.value;

              })

        .filter(function (d, i) { return d.log10 < -4 });



  ticks.append("tspan").text("10");

  ticks.append("tspan").attr("class", "superscript")

                       .attr("dy", -1 + "ex")

                       .text(function (d, i) { return d.log10 });



  var xmid = Math.pow(10, 0.5 * (log10(xmin) + log10(xmax)));



  graph.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmid) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Drug concentration (c)")

      .attr("y", height + margins[2]/2);



  graph.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmid) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Cell count normalized to untreated control (IC curve)")

      .attr("y", -20);



  var tblock = graph.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmid) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .attr("y", margins[0]);



  // tblock.append("tspan").text("E");

  // tblock.append("tspan").attr("class", "subscript")

  //                       .attr("dy", 0.5 + "ex")

  //                       .text("max"); -->

  // tblock.append("tspan").attr("dy", -0.5 + "ex").text("=");

  // tblock.append("tspan"); -->

  var gfmt = d3.format('0.1g');

  var yax = d3.svg.axis()

      .scale(scale_y)

      .orient("left")

      .tickValues(d3.range(0, nudge(1, 1), 0.5))

      .tickSubdivide(4)

      .tickSize(6, 3, 0)

      //.tickFormat(sfmt);

      .tickFormat(gfmt);

  graph.append("g")

      .attr("class", "y axis")

      .call(yax);



  var yax_label_baseline = -0.65 * margins[3];



  var yax_label = graph.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmin) + ", " +

                                        scale_y(0.5) + ") " +

                         "rotate(-90)")

      .append("text")

      .style("text-anchor", "middle")

      .attr("y", yax_label_baseline);



  // yax_label.append("tspan").text("E(D)/E");

  // yax_label.append("tspan").attr("class", "subscript")

  //                         .attr("dy", 0.5 + "ex")

  //                         .text("0");



  // graph.append("g")

  //     .attr("class", "label")

  //     .attr("transform", "translate(" + scale_x(xmin) + ", " +

  //                                       scale_y(0.5) + ") " +

  //                        "rotate(-90)")

  //     .append("text")

  //     .style("text-anchor", "middle")

  //     .text("E(D)/E0")

  //     .attr("y", yax_label_baseline);



  graph.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmin) + ", " +

                                        scale_y(0.5) + ") " +

                         "rotate(-90)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Relative cell count")

      .attr("y", yax_label_baseline + 15 );









})();



// graph2

(function () {

  var xax = d3.svg.axis()

      .scale(scale_x)

      .tickFormat(function (s) { return "" });



  var sfmt = d3.format('s');



  var ticks = graph2.append("g")

        .attr("class", "x axis")

        .attr("transform", "translate(0," + scale_y_GR(ymin_GR) + ")")

        .call(xax)

        .selectAll("text")

        .datum(function (d, i) {

                  var t = parseFloat(d3.format('.2f')(log10(d)));

                  var u = d3.round(t);

                  //return {keep: ((t - u == 0) && !!(u % 2)),

                  return {keep: ((t - u == 0)),

                          value: d,

                          log10: u}})

        .filter(function (d, i) { return d.keep })

        .text(function (d, i) {

                return d.log10 < -4 ? null : d.value;

              })

        .filter(function (d, i) { return d.log10 < -4 });



  ticks.append("tspan").text("10");

  ticks.append("tspan").attr("class", "superscript")

                       .attr("dy", -1 + "ex")

                       .text(function (d, i) { return d.log10 });



  var xmid = Math.pow(10, 0.5 * (log10(xmin) + log10(xmax)));



  graph2.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmid) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Drug concentration (c)")

      .attr("y", height + margins[2]/2);



  graph2.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmid) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Normalized growth rate inhibition (GR curve)")

      .attr("y", -20);



  var tblock = graph2.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmid) + ", 0)")

      .append("text")

      .style("text-anchor", "middle")

      .attr("y", margins[0]);



  // tblock.append("tspan").text("E");

  // tblock.append("tspan").attr("class", "subscript")

  //                       .attr("dy", 0.5 + "ex")

  //                       .text("max"); -->

  // tblock.append("tspan").attr("dy", -0.5 + "ex").text("=");

  // tblock.append("tspan"); -->

  var gfmt = d3.format('0.1g');

  var yax = d3.svg.axis()

      .scale(scale_y_GR)

      .orient("left")

      .tickValues(d3.range(-1, nudge(1, 1), 0.5))

      .tickSubdivide(4)

      .tickSize(6, 3, 0)

      .tickFormat(gfmt);



  graph2.append("g")

      .attr("class", "y axis")

      .call(yax);



  var yax_label_baseline = -0.65 * margins[3];



  var yax_label = graph2.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmin) + ", " +

                                        scale_y_GR(0.5) + ") " +

                         "rotate(-90)")

      .append("text")

      .style("text-anchor", "middle")

      .attr("y", yax_label_baseline);



  // yax_label.append("tspan").text("E(D)/E");

  // yax_label.append("tspan").attr("class", "subscript")

  //                          .attr("dy", 0.5 + "ex")

  //                          .text("0");



  // graph.append("g")

  //     .attr("class", "label")

  //     .attr("transform", "translate(" + scale_x(xmin) + ", " +

  //                                       scale_y_GR(0.5) + ") " +

  //                        "rotate(-90)")

  //     .append("text")

  //     .style("text-anchor", "middle")

  //     .text("E(D)/E0")

  //     .attr("y", yax_label_baseline);



  graph2.append("g")

      .attr("class", "label")

      .attr("transform", "translate(" + scale_x(xmin) + ", " +

                                        scale_y_GR(0) + ") " +

                         "rotate(-90)")

      .append("text")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("GR value")

      .attr("y", yax_label_baseline + 15 );









})();



// Lines for graph1

var npoints = 700;

var xs = d3.range(npoints)

    .map(d3.scale.linear().domain([0, npoints])

                          .range([Math.log(xmin), Math.log(xmax)])

     )

    .map(Math.exp);

var xs0 = d3.range(npoints)

    .map(d3.scale.linear().domain([0, npoints])

                          .range([0, 3])


     );



// console.log("xmin="+xmin);

// console.log("xmax="+xmax);

// console.log("xs="+xs);



var line = d3.svg.line()

    .x(function (d) { return scale_x(d.x); })

    .y(function (d) { return scale_y(d.y); });



var auxline = d3.svg.line()

    .x(function (d) { return ('absx' in d) ? d.absx : scale_x(d.x); })

    .y(function (d) { return ('absy' in d) ? d.absy : scale_y(d.y); });



var mintested = 1e-9;

var maxtested = 1e-5;



var area = (function () {

    var base = scale_y(0);

    return d3.svg.area()

                 .x(function (d) { return scale_x(d.x); })

                 .y0(base)

                 .y1(function (d) {

                    return (((mintested <= d.x) && (d.x <= maxtested)) ?

                            scale_y(d.y) : base);

                  });

})();


// Lines for graph2

/*

var npoints = 700;

var xs = d3.range(npoints)

    .map(d3.scale.linear().domain([0, npoints])

                          .range([Math.log(xmin), Math.log(xmax)]))

    .map(Math.exp);

*/

var line2 = d3.svg.line()

    .x(function (d) { return scale_x(d.x); })

    .y(function (d) { return scale_y_GR(d.y); });



var auxline2 = d3.svg.line()

    .x(function (d) { return ('absx' in d) ? d.absx : scale_x(d.x); })

    .y(function (d) { return ('absy' in d) ? d.absy : scale_y_GR(d.y); });



//var mintested = 1e-9;

//var maxtested = 1e-5;



var area2 = (function () {

    var base2 = scale_y_GR(0);

    return d3.svg.area()

                 .x(function (d) { return scale_x(d.x); })

                 .y0(base2)

                 .y1(function (d) {

                    return (((mintested <= d.x) && (d.x <= maxtested)) ?

                            scale_y_GR(d.y) : base2);

                  });

})();





var ic50path = graph.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));

// graph 1 points and lines
var point0 = graph.append("circle")

  .attr("class", "line-point")
	.attr("r", 5)
  //.style("stroke", d3.hcl("#993404"))
  //.style("fill", "none");
  //.style("fill", d3.hcl("#993404"));

var pointA = graph.append("circle")

  .attr("class", "line-point")
	.attr("r", 5)
  .style("stroke", d3.hcl("#993404"))
  //.style("stroke-width", 3)
  //.style("fill", "none");
  .style("fill", d3.hcl("#993404"));

var pointB = graph.append("circle")

  .attr("class", "line-point")
	.attr("r", 5)
  .style("stroke", d3.hcl("#c90d0d"))
  //.style("fill", "none");
  .style("fill", d3.hcl("#c90d0d"));

var pointC = graph.append("circle")

  .attr("class", "line-point")
	.attr("r", 5)
  .style("stroke", d3.hcl("#D4440E"))
  //.style("fill", "none");
  .style("fill", d3.hcl("#D4440E"));

var pointD = graph.append("circle")

  .attr("class", "line-point")
  .attr("r", 5)
  .style("stroke", d3.hcl("#D95F0E"))
  //.style("fill", "none");
  .style("fill", d3.hcl("#D95F0E"));

var pointE = graph.append("circle")

  .attr("class", "line-point")
  .attr("r", 5)
  .style("stroke", d3.hcl("#FE9929"))
  //.style("fill", "none");
  .style("fill", d3.hcl("#FE9929"));

var pointApath = graph.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#993404"))
    .style("stroke", ("2, 2"));

var pointBpath = graph.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#c90d0d"))
    .style("stroke", ("2, 2"));

var pointCpath = graph.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#D4440E"))
    .style("stroke", ("2, 2"));

var pointDpath = graph.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#D95F0E"))
    .style("stroke", ("2, 2"));

var pointEpath = graph.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#FE9929"))
    .style("stroke", ("2, 2"));

// graph2 points and lines

var point02 = graph2.append("circle")

  .attr("class", "line-point")
	.attr("r", 5)
  //.style("stroke", d3.hcl("#993404"))
  //.style("fill", "none");
  //.style("fill", d3.hcl("#993404"));

var pointA2 = graph2.append("circle")

  .attr("class", "line-point")
	.attr("r", 5)
  .style("stroke", d3.hcl("#993404"))
  //.style("stroke-width", 3)
  //.style("fill", "none");
  .style("fill", d3.hcl("#993404"));

var pointB2 = graph2.append("circle")

  .attr("class", "line-point")
	.attr("r", 5)
  .style("stroke", d3.hcl("#c90d0d"))
  //.style("fill", "none");
  .style("fill", d3.hcl("#c90d0d"));

var pointC2 = graph2.append("circle")

  .attr("class", "line-point")
	.attr("r", 5)
  .style("stroke", d3.hcl("#D4440E"))
  //.style("fill", "none");
  .style("fill", d3.hcl("#D4440E"));

var pointD2 = graph2.append("circle")

  .attr("class", "line-point")
  .attr("r", 5)
  .style("stroke", d3.hcl("#D95F0E"))
  //.style("fill", "none");
  .style("fill", d3.hcl("#D95F0E"));

var pointE2 = graph2.append("circle")

  .attr("class", "line-point")
  .attr("r", 5)
  .style("stroke", d3.hcl("#FE9929"))
  //.style("fill", "none");
  .style("fill", d3.hcl("#FE9929"));

var pointApath2 = graph2.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#993404"))
    .style("stroke", ("2, 2"));

var pointBpath2 = graph2.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#c90d0d"))
    .style("stroke", ("2, 2"));

var pointCpath2 = graph2.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#D4440E"))
    .style("stroke", ("2, 2"));

var pointDpath2 = graph2.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#D95F0E"))
    .style("stroke", ("2, 2"));

var pointEpath2 = graph2.append("path")
    .attr("class", "line")
    .attr("stroke", d3.hcl("#FE9929"))
    .style("stroke", ("2, 2"));

/*
var intersectPoint1 = graph2.append("circle")

	.attr("cx", scale_x(1))

	.attr("cy", scale_y_GR(1))

	.attr("r", 25).style("fill", "purple");

*/
var ic50label = graph.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + scale_x(xmin) + ", " +

                                      (height) + ") " + "rotate(-90)")

    .style("font-size", "18px")

    .style("font-weight", "bold")

    .append("text");

ic50label.append("tspan").text("IC");

ic50label.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("50");

ic50label.append("tspan").attr("dy", -0.5 + "ex").text("=");

ic50label.append("tspan").attr("class", "value");





var einfpath = graph.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));



var einflabel = graph.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + (leftedge + 3) + ", " + 0 + ")")

    .style("font-size", "18px")

    .style("font-weight", "bold")

    .append("text");



einflabel.append("tspan").text("E");

einflabel.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("inf");

einflabel.append("tspan").attr("dy", -0.5 + "ex").text("=");

einflabel.append("tspan").attr("class", "value");



var plotit0a = (function () {

  //var ffmt = d3.format('0.2r');

  //var efmt = d3.format('0.1e');



  return function (SC50, Smax, HS, Td) {

    var c = 0

    var x0 = 1

    function xcurve(t) {
      yval = x0 * Math.exp(t*(Math.log(2)/Td)*(1 - (Smax * Math.pow(c, HS))/(Math.pow(SC50, HS) + Math.pow(c, HS))))
      while(yval <= 5) {
        return yval;
      }

    };

    var data = xs0.map(function (x) {

      return {x: x, y: xcurve(x)};

    });

    //data =

    areapath0a.attr("d", area0a(data));

    graphpath0a.attr("d", line0a(data));

/*

    var c = 0.1

    var x0 = 1

    function xcurve2(t) {

      return x0 * Math.exp(t*(Math.log(2)/Td)*(1 - (Smax * Math.pow(c, HS))/(Math.pow(SC50, HS) + Math.pow(c, HS))));

    };

    var data2 = xs.map(function (x) {

      return {x: x, y: xcurve2(x)};

    });

    areapath0.attr("d", area0(data2));

    graphpath0.attr("d", line0(data2));

*/

  }

})();



var plotit0b = (function () {

  //var ffmt = d3.format('0.2r');

  //var efmt = d3.format('0.1e');



  return function (SC50, Smax, HS, Td) {



    var c = 0.1

    var x0 = 1

    function xcurve2(t) {
      yval = x0 * Math.exp(t*(Math.log(2)/Td)*(1 - (Smax * Math.pow(c, HS))/(Math.pow(SC50, HS) + Math.pow(c, HS))))
      while(yval <= 5) {
        return yval;
      }
    };

    var data2 = xs0.map(function (x) {

      return {x: x, y: xcurve2(x)};

    });

    areapath0b.attr("d", area0b(data2));

    graphpath0b.attr("d", line0b(data2));



  }

})();



var plotit0c = (function () {

  //var ffmt = d3.format('0.2r');

  //var efmt = d3.format('0.1e');



  return function (SC50, Smax, HS, Td) {



    var c = 0.31

    var x0 = 1

    function xcurve3(t) {
      yval = x0 * Math.exp(t*(Math.log(2)/Td)*(1 - (Smax * Math.pow(c, HS))/(Math.pow(SC50, HS) + Math.pow(c, HS))))
      while(yval <= 5) {
        return yval;
      }
    };

    var data3 = xs0.map(function (x) {

      return {x: x, y: xcurve3(x)};

    });

    areapath0c.attr("d", area0c(data3));

    graphpath0c.attr("d", line0c(data3));



  }

})();



var plotit0d = (function () {

  //var ffmt = d3.format('0.2r');

  //var efmt = d3.format('0.1e');



  return function (SC50, Smax, HS, Td) {



    var c = 1

    var x0 = 1

    function xcurve4(t) {

      yval = x0 * Math.exp(t*(Math.log(2)/Td)*(1 - (Smax * Math.pow(c, HS))/(Math.pow(SC50, HS) + Math.pow(c, HS))))
      while(yval <= 5) {
        return yval;
      }
    };

    var data4 = xs0.map(function (x) {

      return {x: x, y: xcurve4(x)};

    });

    areapath0d.attr("d", area0d(data4));

    graphpath0d.attr("d", line0d(data4));



  }

})();



var plotit0e = (function () {

  //var ffmt = d3.format('0.2r');

  //var efmt = d3.format('0.1e');



  return function (SC50, Smax, HS, Td) {



    var c = 3.16

    var x0 = 1

    function xcurve5(t) {

      yval = x0 * Math.exp(t*(Math.log(2)/Td)*(1 - (Smax * Math.pow(c, HS))/(Math.pow(SC50, HS) + Math.pow(c, HS))))
      while(yval <= 5) {
        return yval;
      }
    };

    var data5 = xs0.map(function (x) {

      return {x: x, y: xcurve5(x)};

    });

    areapath0e.attr("d", area0e(data5));

    graphpath0e.attr("d", line0e(data5));



  }

})();



var plotit0f = (function () {

  //var ffmt = d3.format('0.2r');

  //var efmt = d3.format('0.1e');



  return function (SC50, Smax, HS, Td) {



    var c = 10

    var x0 = 1

    function xcurve6(t) {

      yval = x0 * Math.exp(t*(Math.log(2)/Td)*(1 - (Smax * Math.pow(c, HS))/(Math.pow(SC50, HS) + Math.pow(c, HS))))
      while(yval <= 5) {
        return yval;
      }
    };

    var data6 = xs0.map(function (x) {

      return {x: x, y: xcurve6(x)};

    });

    areapath0f.attr("d", area0f(data6));

    graphpath0f.attr("d", line0f(data6));



  }

})();





var plotit = (function () {

  var ffmt = d3.format('0.2r');

  var efmt = d3.format('0.1e');



  return function (SC50, Smax, HS, Td) {

    var t = 3

    //var k = 1

    function drcurve(d) {

      //return Math.exp(-t*k*(Smax * Math.pow(d, HS)/(Math.pow(SC50, HS) + Math.pow(d, HS))) - t*(Tmax * Math.pow(d, HS))/(Math.pow(TC50, HS) + Math.pow(d, HS)));

      //return Math.exp(-t*k*(Smax * Math.pow(d, HS)/(Math.pow(SC50, HS) + Math.pow(d, HS))));

      return Math.exp(-t*(Math.log(2)/Td)*(Smax * Math.pow(d, HS)/(Math.pow(SC50, HS) + Math.pow(d, HS))));

    };



    var data = xs.map(function (x) {

      return {x: x, y: drcurve(x)};

    });



    areapath.attr("d", area(data));

    graphpath.attr("d", line(data));

    point0.attr("cx", scale_x(0.01))
          .attr("cy", scale_y(drcurve(0.01)));

    pointA.attr("cx", scale_x(0.1))
          .attr("cy", scale_y(drcurve(0.1)));

    pointB.attr("cx", scale_x(0.31))
          .attr("cy", scale_y(drcurve(0.31)));

    pointC.attr("cx", scale_x(1))
          .attr("cy", scale_y(drcurve(1)));

    pointD.attr("cx", scale_x(3.16))
          .attr("cy", scale_y(drcurve(3.16)));

    pointE.attr("cx", scale_x(10))
          .attr("cy", scale_y(drcurve(10)));

    pointApath.attr("d", line([{x: 0.1, y: 0},
                               {x: 0.1, y: drcurve(0.1)}]));

    pointBpath.attr("d", line([{x: 0.31, y: 0},
                               {x: 0.31, y: drcurve(0.31)}]));

    pointCpath.attr("d", line([{x: 1, y: 0},
                               {x: 1, y: drcurve(1)}]));

    pointDpath.attr("d", line([{x: 3.16, y: 0},
                               {x: 3.16, y: drcurve(3.16)}]));

    pointEpath.attr("d", line([{x: 10, y: 0},
                               {x: 10, y: drcurve(10)}]));


    var b0 = Td/(t * Smax);

    var IC50 = SC50 * Math.pow(b0/(1-b0), 1/HS);



    var Einf = Math.exp(-t*Math.log(2)*Smax/Td);


    einfpath.attr("d", auxline([{absx: leftedge, y: Einf},

                                {x: xmax, y: Einf}]));



    einflabel.attr("y", scale_y(Einf))

             .select(".value")

             .text(ffmt(Einf));



    var IC50text;

    var IC50data;

    var IC50pos;

    if (Einf <= 0.5) {

      IC50text = IC50;

      IC50data = [{absx: leftedge, y: 0.5},

                                  {x: IC50, y: 0.5},

                                  {x: IC50, y: 0}];

      IC50pos = IC50;

    }

    else {

      IC50text = "(NA)";

      IC50data = [{x: xmin, y: 0.5}, {x: IC50, y: 0.5}];

      IC50pos = xmax;

    }



    if (auxline(IC50data).indexOf("NaN")==-1) {

	// FIXME: draw me all at the edge

      ic50path.attr("d", auxline(IC50data));

    }

    ic50label.attr("y", scale_x(IC50pos))

             .select(".value")

             .text(ffmt(IC50text));











/*

    var IC50;

    var IC50text;

    var IC50data;

    var ic50color = "";

    if (Tmax < 0.5) {

      IC50 = TC50 * Math.pow(num/(0.5 - Tmax) - 1, minv);

      IC50text = efmt(IC50);



      if (!((mintested <= IC50) && (IC50 <= maxtested))) {

        IC50color = "outside-tested-range";

      }



      if (IC50 > xmax) {

        IC50 = xmax;

        IC50data = [{x: xmin, y: 0.5}, {x: IC50, y: 0.5}];

      }

      else {

        IC50data = [{x: xmin, y: 0.5}, {x: IC50, y: 0.5}, {x: IC50, y: 0}];

      }

    }

    else {

      IC50 = xmax;

      IC50text = "(NA)";

      IC50data = [{x: xmin, y: 0.5}, {x: IC50, y: 0.5}];

      IC50color = "not-defined";

    }



    ic50path.attr("d", auxline(IC50data));



    var hme = (E0 + Tmax)/2;

    ec50path.attr("d", auxline([{absx: leftedge, y: hme},

                                {x: TC50, y: hme},

                                {x: TC50, y: 0}]));



    var Emax = drcurve(maxtested);

    emaxpath.attr("d", auxline([{absx: leftedge, y: Emax},

                                {x: maxtested, y: Emax}]));



    einfpath.attr("d", auxline([{absx: leftedge, y: Tmax},

                                {x: xmax, y: Tmax}]));



    var f0 = 2/((E0 - Tmax) * m);

    var f1 = E0 + Tmax;



    mpath.attr("d", auxline([{x: Math.exp(f0*(f1 - 2*ymax)) * TC50, y: ymax},

                             {x: Math.exp(f0*f1) * TC50, y: 0}]));





    hmelabel.attr("y", scale_y(hme))

            .select(".value")

            .text(ffmt(hme));



    emaxlabel.attr("y", scale_y(Emax))

             .select(".value")

             .text(ffmt(Emax));



    einflabel.attr("y", scale_y(Tmax))

             .select(".value")

             .text(ffmt(Tmax));



    ec50label.attr("y", scale_x(TC50))

             .select(".value")

             .text(efmt(TC50));



    ic50label.attr("y", scale_x(IC50))

             .select(".value")

             .text(IC50text);

             */



  }

})();



var gr50path = graph2.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));



var gr50label = graph2.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + scale_x(xmin) + ", " +

                                      (height) + ") " + "rotate(-90)")

    .style("font-size", "18px")

    .style("font-weight", "bold")

    .append("text");

gr50label.append("tspan").text("GR");

gr50label.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("50");

gr50label.append("tspan").attr("dy", -0.5 + "ex").text("=");

gr50label.append("tspan").attr("class", "value");





var grinfpath = graph2.append("path")

    .attr("class", "auxline")

    .style("stroke-dasharray", ("2, 2"));



var grinflabel = graph2.append("g")

    .attr("class", "label")

    .attr("transform", "translate(" + (leftedge + 3) + ", " + 0 + ")")

    .style("font-size", "18px")

    .style("font-weight", "bold")

    .append("text");



grinflabel.append("tspan").text("GR");

grinflabel.append("tspan").attr("class", "subscript")

                         .attr("dy", 0.5 + "ex")

                         .text("inf");

grinflabel.append("tspan").attr("dy", -0.5 + "ex").text("=");

grinflabel.append("tspan").attr("class", "value");



var zeropath = graph2.append("path")

    .attr("class", "auxline")

    .style("stroke", ("2, 2"));



var plotit2 = (function () {

  var ffmt = d3.format('0.2r');

  var efmt = d3.format('0.1e');



  return function (SC50, Smax, HS, Td) {

    var t = 3

    //var k = 1

    function drcurve(d) {

      //return Math.pow(2, 1 - (Smax * Math.pow(d, HS)/(Math.pow(SC50, HS) + Math.pow(d, HS))) - (1/k)*(Tmax * Math.pow(d, HS))/(Math.pow(TC50, HS) + Math.pow(d, HS))) - 1;

      // function without "toxic" term

      return Math.pow(2, (1 - (Smax * Math.pow(d, HS))/( Math.pow(SC50, HS) + Math.pow(d, HS) ) ) ) - 1;

    };



    var data = xs.map(function (x) {

      return {x: x, y: drcurve(x)};

    });



    areapath2.attr("d", area2(data));

    graphpath2.attr("d", line2(data));

    point02.attr("cx", scale_x(0.01))
          .attr("cy", scale_y_GR(drcurve(0.01)));

    pointA2.attr("cx", scale_x(0.1))
          .attr("cy", scale_y_GR(drcurve(0.1)));

    pointB2.attr("cx", scale_x(0.31))
          .attr("cy", scale_y_GR(drcurve(0.31)));

    pointC2.attr("cx", scale_x(1))
          .attr("cy", scale_y_GR(drcurve(1)));

    pointD2.attr("cx", scale_x(3.16))
          .attr("cy", scale_y_GR(drcurve(3.16)));

    pointE2.attr("cx", scale_x(10))
          .attr("cy", scale_y_GR(drcurve(10)));

    pointApath2.attr("d", line2([{x: 0.1, y: ymin_GR},
                               {x: 0.1, y: drcurve(0.1)}]));

    pointBpath2.attr("d", line2([{x: 0.31, y: ymin_GR},
                               {x: 0.31, y: drcurve(0.31)}]));

    pointCpath2.attr("d", line2([{x: 1, y: ymin_GR},
                               {x: 1, y: drcurve(1)}]));

    pointDpath2.attr("d", line2([{x: 3.16, y: ymin_GR},
                               {x: 3.16, y: drcurve(3.16)}]));

    pointEpath2.attr("d", line2([{x: 10, y: ymin_GR},
                               {x: 10, y: drcurve(10)}]));


    var a0 = 1 - log2(1.5);

    var g0 = Math.pow(SC50, HS)*(1/Smax)*a0;

    var g1 = 1 - (1/Smax)*a0;

    //var GR50 = Math.pow((Math.pow(SC50, HS)*Smax*a0/(1 - Smax*a0)), 1/HS)

    var GR50 = Math.pow((g0/g1), 1/HS);



    var GRinf = Math.pow(2, (1-Smax)) - 1;

    grinfpath.attr("d", auxline2([{absx: leftedge, y: GRinf},

                                {x: xmax, y: GRinf}]));

    grinflabel.attr("y", scale_y_GR(GRinf))

             .select(".value")
             .style("font-weight", "bold")
             .text(ffmt(GRinf));

    var GR50text;

    var GR50data;

    var GR50pos;

    if (GRinf <= 0.5) {

      GR50text = GR50;

      GR50data = [{absx: leftedge, y: 0.5},

                                  {x: GR50, y: 0.5},

                                  {x: GR50, y: ymin_GR}];

      GR50pos = GR50;

    }

    else {

      GR50text = "(NA)";

      GR50data = [{x: xmin, y: 0.5}, {x: GR50, y: 0.5}];

      GR50pos = xmax;

    }

    if (auxline2(GR50data).indexOf("NaN")==-1) {

        gr50path.attr("d", auxline2(GR50data));

    }

    gr50label.attr("y", scale_x(GR50pos))

             .select(".value")
             .text(ffmt(GR50text));



    zeropath.attr("d", auxline2([{absx: leftedge, y: 0},

                                         {x: xmax, y: 0}]));



  }

})();



// jQuery(document).ready(function ($) {



    function replot() {

      plotit0a(//parseFloat($( "#TC50-slider-value" ).html()),

             parseFloat($( "#SC50-slider-value" ).html()),

             //parseFloat($( "#Tmax-slider-value" ).html()),

             parseFloat($( "#Smax-slider-value" ).html()),

             parseFloat($( "#HS-slider-value"   ).html()),

             parseFloat($( "#Td-slider-value"    ).html()));



      plotit0b(//parseFloat($( "#TC50-slider-value" ).html()),

            parseFloat($( "#SC50-slider-value" ).html()),

            //parseFloat($( "#Tmax-slider-value" ).html()),

            parseFloat($( "#Smax-slider-value" ).html()),

            parseFloat($( "#HS-slider-value"   ).html()),

            parseFloat($( "#Td-slider-value"    ).html()));



      plotit0c(//parseFloat($( "#TC50-slider-value" ).html()),

            parseFloat($( "#SC50-slider-value" ).html()),

            //parseFloat($( "#Tmax-slider-value" ).html()),

            parseFloat($( "#Smax-slider-value" ).html()),

            parseFloat($( "#HS-slider-value"   ).html()),

            parseFloat($( "#Td-slider-value"    ).html()));



      plotit0d(//parseFloat($( "#TC50-slider-value" ).html()),

            parseFloat($( "#SC50-slider-value" ).html()),

            //parseFloat($( "#Tmax-slider-value" ).html()),

            parseFloat($( "#Smax-slider-value" ).html()),

            parseFloat($( "#HS-slider-value"   ).html()),

            parseFloat($( "#Td-slider-value"    ).html()));



      plotit0e(//parseFloat($( "#TC50-slider-value" ).html()),

            parseFloat($( "#SC50-slider-value" ).html()),

            //parseFloat($( "#Tmax-slider-value" ).html()),

            parseFloat($( "#Smax-slider-value" ).html()),

            parseFloat($( "#HS-slider-value"   ).html()),

            parseFloat($( "#Td-slider-value"    ).html()));



      plotit0f(//parseFloat($( "#TC50-slider-value" ).html()),

            parseFloat($( "#SC50-slider-value" ).html()),

            //parseFloat($( "#Tmax-slider-value" ).html()),

            parseFloat($( "#Smax-slider-value" ).html()),

            parseFloat($( "#HS-slider-value"   ).html()),

            parseFloat($( "#Td-slider-value"    ).html()));



      plotit(//parseFloat($( "#TC50-slider-value" ).html()),

             parseFloat($( "#SC50-slider-value" ).html()),

             //parseFloat($( "#Tmax-slider-value" ).html()),

             parseFloat($( "#Smax-slider-value" ).html()),

             parseFloat($( "#HS-slider-value"   ).html()),

             parseFloat($( "#Td-slider-value"    ).html()));



     plotit2(//parseFloat($( "#TC50-slider-value" ).html()),

             parseFloat($( "#SC50-slider-value" ).html()),

             //parseFloat($( "#Tmax-slider-value" ).html()),

             parseFloat($( "#Smax-slider-value" ).html()),

             parseFloat($( "#HS-slider-value"   ).html()),

             parseFloat($( "#Td-slider-value"    ).html()));

           }



    var HSmin = 0.1;

    var a = 1 - HSmin;

    var ainv = 1/a;

    var HSmax = 4;

    var alpha = Math.log((HSmax - HSmin)/a)/Math.log(2);

    var alphainv = 1/alpha;

    var hsscale = function (x) { return a * Math.pow(x, alpha) + HSmin; }

    var hsscaleinv = function (y) { return Math.pow((y - HSmin)*ainv, alphainv); }



    var preset_values = {



        'cytostatic': {//'TC50': 0,

                       'HS': 1.6,

                       //'Tmax': 0,

                       'SC50': 1.5,

                       'Smax': 1,

                       'Td': 2,},

        'partial cytostatic': {//'TC50': 0,

                               'HS': 1.6,

                               //'Tmax': 0,

                               'SC50': 1.2,

                               'Smax': 0.65,

                               'Td': 2,},



        'cytotoxic': {//'TC50': 0,

                              'HS': 1.6,

                              //'Tmax': 0,

                              'SC50': 2,

                              'Smax': 2.6,

                              'Td': 2,},





        '__RESET__': {//'TC50': 1e-7,

                      'HS': 1.6,

                      //'Tmax': 0.15,

                      'SC50': 1.2,

                      'Smax': 0.65,

                      'Td': 0.9,},



    };



    for (var k in preset_values) {

        var v = preset_values[k];

        // v.TC50_scaled = log10(v.TC50);

        // v.HS_scaled = hsscaleinv(v.HS);

        // v.Tmax_scaled = v.Tmax;

        // v.Smax_scaled = v.Smax;

        // v.SC50_scaled = log10(v.SC50);

        //v.TC50_scaled = log10(v.TC50);

        v.HS_scaled = v.HS;

        //v.Tmax_scaled = v.Tmax;

        v.Smax_scaled = v.Smax;

        v.SC50_scaled = log10(v.SC50);

        v.Td_scaled = v.Td;

    }



    var $SC50_slider_value = $( '#SC50-slider-value' );

    //var $TC50_slider_value = $( '#TC50-slider-value' );

    //var $Tmax_slider_value = $( '#Tmax-slider-value' );

    var $HS_slider_value   = $( '#HS-slider-value' );

    var $Smax_slider_value = $( '#Smax-slider-value' );

    var $Td_slider_value    = $( '#Td-slider-value' );



    var $SC50_slider = $( '#SC50-slider' );

    //var $TC50_slider = $( '#TC50-slider' );

    //var $Tmax_slider = $( '#Tmax-slider' );

    var $HS_slider   = $( '#HS-slider' );

    var $Smax_slider = $( '#Smax-slider' );

    var $Td_slider = $( '#Td-slider' );





    var __RESET__ = preset_values.__RESET__;



    var efmt = d3.format("7.1e");

    //var ffmt = d3.format("5.3f");

    var ffmt = d3.format("0.2r");





    function init () {



      $SC50_slider.slider(

          {

            range: "min",

            value: __RESET__.SC50_scaled,

            min: log10(0.31),

            max: log10(10.0),

            step: 0.000001,

/*            slide: function (event, ui) {

               $( "#SC50-slider-value" ).html( efmt(ui.value) );

               replot();

            }

*/

            slide: function (event, ui) {

               //$( "#SC50-slider-value" ).html( efmt(Math.pow(10, ui.value)) );

               // change exponential notation on slider value

               $( "#SC50-slider-value" ).html( ffmt(Math.pow(10, ui.value)) );

               replot();

            }

          });

/*

      $TC50_slider.slider(

          {

            range: "min",

            value: __RESET__.TC50_scaled,

            min: 0,

            max: 6,

            step: 0.01,

            slide: function (event, ui) {

               $( "#TC50-slider-value" ).html( efmt(ui.value) );

               replot();

            }

          });



      $Tmax_slider.slider(

          {

            range: "min",

            value: __RESET__.Tmax_scaled,

            min: 0,

            max: 2,

            step: 0.01,

            slide: function (event, ui) {

               $( "#Tmax-slider-value" ).html( ffmt(ui.value) );

               replot();

            }

          });

*/

          $Td_slider.slider(

              {

                range: "min",

                value: __RESET__.Td_scaled,

                min: 0.5,

                max: 6,

                step: 0.01,

                slide: function (event, ui) {

                   $( "#Td-slider-value" ).html( ffmt(ui.value) );

                   replot();

                }

              });



      // var minvscale = d3.scale.linear().domain([0, 1]).range([5, 1e-5]);

      // var minvscaleinv = d3.scale.linear().domain([5, 1e-5]).range([0, 1]);



      // $( "#HS-slider" ).slider(

      //     {

      //       range: "min",

      //       value: minvscaleinv(parseFloat($( "#HS-slider-value" ).html())),

      //       min: 0,

      //       max: 1,

      //       step: 0.001,

      //       slide: function (event, ui) {

      //          $( "#HS-slider-value" ).html( ffmt(1/minvscale(ui.value)) );

      //          replot();

      //       }

      //     });



      // var hsscale = function (x) { return Math.exp(x) - 1; }

      // var hsscaleinv = function (y) { return Math.log(y + 1); }



      var scalemin = hsscaleinv(HSmin);

      var scalemax = hsscaleinv(HSmax);



      $HS_slider.slider(

          {

            range: "min",

            value: __RESET__.HS_scaled,

            //min: scalemin,

            //max: scalemax,

            //step: (scalemax - scalemin) * 0.001,

            min: 1,

            max: 3,

            step: 0.01,

/*            slide: function (event, ui) {

               $( "#HS-slider-value" ).html( ffmt(hsscale(ui.value)) );

               replot();

            }

*/

              slide: function (event, ui) {

               $( "#HS-slider-value" ).html( ffmt(ui.value) );

               replot();

             }

          });

      $Smax_slider.slider(

          {

            range: "min",

            value: __RESET__.Smax_scaled,

            min: 0,

            max: 3,

            step: 0.01,

/*            slide: function (event, ui) {

               $( "#Smax-slider-value" ).html( ffmt(hsscale(ui.value)) );

               replot();

            }

*/

              slide: function (event, ui) {

               $( "#Smax-slider-value" ).html( ffmt(ui.value) );

               replot();

            }

          });



      replot();

    }



    init();



    function reset(key) {

        var vals = preset_values[key];



        $SC50_slider_value.html( efmt(vals.SC50) )

        $SC50_slider.slider( 'value', vals.SC50_scaled );



        //$TC50_slider_value.html( efmt(vals.TC50) )

        //$TC50_slider.slider( 'value', vals.TC50_scaled );



        //$Tmax_slider_value.html( ffmt(vals.Tmax) );

        //$Tmax_slider.slider( 'value', vals.Tmax_scaled );



        $HS_slider_value.html( ffmt(vals.HS) );

        $HS_slider.slider( 'value', vals.HS_scaled );



        $Smax_slider_value.html( ffmt(vals.Smax) );

        $Smax_slider.slider( 'value', vals.Smax_scaled );



        $Td_slider_value.html( ffmt(vals.Td) );

        $Td_slider.slider( 'value', vals.Td_scaled );



        replot();

    }



    $('.preset').bind({

        mouseup: function (e) {

            reset(this.textContent)

        }

    });



    $('#graph').bind({

        mouseup: function (e) {

	    // FIXME: is this needed? it would reset the graph unexpectedly

            // reset('__RESET__');

        }

    });



}
