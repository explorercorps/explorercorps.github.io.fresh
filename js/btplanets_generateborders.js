define(['js/lib/d3.min', 'js/btplanets','node_modules/d3-delaunay/dist/d3-delaunay.min'], function (d3, btplanets, d3_delaunay) {
    //I really have no idea why this code is set up like this but might as well keep it consistent
    return {
        points: [],
        boundaries:[-600,-600,600,600],
        init: function() {
        },
        generateDiagram : function(){
            const dalaunay = d3_delaunay.Delaunay.from(this.points);
            const voronoi = dalaunay.voronoi(this.boundaries);
            
            var lineFunction = d3.svg.line()
                .x(function(d){return d[0]})
                .y(function(d){return -d[1]})
                .interpolate("linear");

            polygons = []
            for(var i = 0; i < this.points.length; i++)
            {   
                polygon = voronoi.cellPolygon(i);
                if(polygon)
                {
                    polygons.push({points: polygon});
                }
            }

            rects = d3.select('svg.map').selectAll('g.voronoi-border').data(polygons)
                .enter().append("path")
                    .attr("d", function(d){return lineFunction(d.points)})
                    .attr("stroke", "white")
                    .attr("stroke-width", 1)
                    .attr("fill", "none")
                    .classed('voronoi-border',true); 
        },
        putPlanet : function(point){
            this.points.push(point);
        }
    }
});