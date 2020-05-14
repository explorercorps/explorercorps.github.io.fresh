define(['js/lib/d3.min', 'js/btplanets'], function (d3, btplanets) {
    //I really have no idea why this code is set up like this but might as well keep it consistent
    return {
        d3_delaunay: require('d3-delaunay'),
        points: [],
        boundaries:[-550,-550,550,500],
        init: function() {
            return;
        },
        generateDiagram : function(){
            const dalaunay = this.d3_delaunay.Delaunay.from(points);
            const voronoi = dalaunay.voronoi(this.boundaries);
            voronoi.render(d3);
        },
        putPlanet : function(point){
            console.log(point);
            this.points.push(point);
        }
    }
});