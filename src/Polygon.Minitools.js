/******************************************************************************
 * Leaflet Polygon.MiniTools
 * @author Edouard Morin
 * @license MIT License, Copyright (c) 2024 Edouard Morin - DREAL PdL
 *
 * Thanks to:<br>
 * Brian S Hayes (Hayeswise) creator of Leaflet.PointInPolygon
 * https://github.com/hayeswise/Leaflet.PointInPolygon
 */
/**
 * PolygonMiniTools for Leaflet:  A plugin for Leaflet that provides
 * several functions for polygon traitment. This plugin is based on hayeswise/Leaflet.PointInPolygon.
 */
/**
 * Leaflet
 * @external L
 * @see {@link http://leafletjs.com/|Leaflet}
 */
 (function (factory) {
    var L;
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        L = require('leaflet');
        module.exports = factory(L);
    } else {
        // Browser globals
        if (typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
}(function (L) {
"use strict";
/**
 * The Leaflet Polygon class.
 * L.GeodesicPolygon and L.GeodesicCircle extend L.Polygon.
 * @name Polygon
 * @member external:L.Polygon
 * @see {@link http://leafletjs.com/ Leaflet} documentation for further information.
 */
 L.Polygon.include({
 /**
 * Checks if a single point is contained in a Polygon or Multipolygon with holes
 * Writed by Edouard Morin - DREAL PdL - 2024
 * @member external:L.Polygon.containsPoint
 * @param {L.LatLng} p A geographical point with a latitude and longitude.
 * @returns {boolean} True if the point is contained in the Multipolyline or Multipolygon
 */
	containsPoint: function (p) {
		//"use strict";
		var rectangularBounds = this.getBounds();  // It appears that this is O(1): the LatLngBounds is updated as points are added to the polygon when it is created.
		var wn = 0;
		var wh = 0;//for holes
		if (rectangularBounds.contains(p)) {
			var polys = this.getLatLngs();
			var i = 0;
			if(Array.isArray(polys[0][0])){//multipolygon
			polys.forEach((tab) => {
				i = 0;
				if(wn == 0 || wh != 0){
				wn = 0;
				wh = 0;//for holes
				tab.forEach((e) => {
					var thatp = L.polygon(e);
					if(i == 0){wn = thatp._getWindingNumber(p);}else{wh = wh + thatp._getWindingNumber(p);}
					i++;
				});
				}
			});
			}else{//polygon
			polys.forEach((e) => {
				var thatp = L.polygon(e);
				if(i == 0){wn = thatp._getWindingNumber(p);}else{wh = wh + thatp._getWindingNumber(p);}
				i++;
			});
			}
			if(wn != 0 && wh == 0){return true;}else{return false;}
		} else {
			return false;
		}
	},
/**
 * Checks if a simple polygon without hole is intersected with a Polygon or Multipolygon with holes
 * Writed by Edouard Morin - DREAL PdL - 2024
 * @member external:L.Polygon.intersectPolysimple
 * @param {L.Polygon} pol A geographical simple polygon without hole.
 * @returns {boolean} True if the polygon is instersected with the polygon or polyline; Just one point in common is enought.
 */
    intersectPolysimple: function (pol) {
		var rectangularBounds = this.getBounds();
		var polBounds = pol.getBounds();
		var polyref = this.getLatLngs();
		var polys = pol.getLatLngs()[0];
		var test = false;
		var test_hole = false;
		var i =0;
		var prefh = [];
		var ptemp,
			pm1,
			qm1,
			m,
			hc;
		if (rectangularBounds.intersects(polBounds)) {
		//test 1 sommets contenu
		polys.forEach((p) => {
			if(this.containsPoint(p)===true){test = true;}
		});
		if(test === false){
		if(Array.isArray(polyref[0][0])){//multipolygon
		//test contenu dans un hole
		polyref.forEach((tab) => {
		i = 0;
		if(test_hole === false){
		tab.forEach((e) => {
			var thatp = L.polygon(e);
			if(i > 0 && test_hole === false){
				if(thatp.simplecontainsPolysimple(pol)){test_hole = true; hc = thatp;}
			}
			i++;
		});
		}
		});
		//test intersection avec au moins 1 poly
		if(test_hole === false){
		polyref.forEach((tab) => {
			i = 0;
			if(test === false){
			tab.forEach((e) => {
				if(test === false){
				var thatp = L.polygon(e);
				if(thatp.simpleintersectPolysimple(pol)){test = true;}
				}
				i++;
			});
			}
		});
		}else{//test pas d'intersection avec un poly dans un hole
		//on relance la fonction self sur les poly contenu dans le hole
			var j = 0;
			polyref.forEach((tab) => {
				var thatp = L.polygon(tab[0]);
				if(hc.containsPolysimple(thatp)){
					prefh.push(tab);
				}
			j++;
			if(prefh.length > 0 && j == polyref.length){
				var ckilrest = L.polygon(prefh);
				if(this._callselfIntersectPolysimple(ckilrest,pol)){test = true;}//cas self pose probleme donc pas élégant
			}
			});
		}
		}else{//polygon
		//test contenu dans un hole
		polyref.forEach((e) => {
			var thatp = L.polygon(e);
			if(i > 0 && test_hole === false){
				if(thatp.simplecontainsPolysimple(pol)){test_hole = true;}
			}
			i++;
		});
		//test intersection avec au moins 1 poly
		if(test_hole === false){
			i = 0;
			if(test === false){
			polyref.forEach((e) => {
				if(test === false){
				var thatp = L.polygon(e);
				if(thatp.simpleintersectPolysimple(pol)){test = true;}
				}
				i++;
			});
			}
		}
		}
		}
		}
		return test;
	},
	//self call intersectPolysimple
    _callselfIntersectPolysimple: function(ref,pol){
    	return ref.intersectPolysimple(pol);
    },
/**
 * Checks if a simple polygon without hole is contained in a Polygon or Multipolygon with holes
 * Writed by Edouard Morin - DREAL PdL - 2024
 * @member external:L.Polygon.simpleintersectPolysimple
 * @param {L.Polygon} pol A geographical simple polygon without hole.
 * @returns {boolean} True if the polygon is contained in the polygon or polyline.
 */
	containsPolysimple: function (pol) {
		var rectangularBounds = this.getBounds();
		var polBounds = pol.getBounds();
		var polyref = this.getLatLngs();
		var polys = pol.getLatLngs()[0];
		var test = true;
		var i=0;
		if (rectangularBounds.intersects(polBounds)) {
		//test sommets contenus
		polys.forEach((p) => {
			if(this.containsPoint(p)===false){test = false;}
		});
		if(test === true){
		if(Array.isArray(polyref[0][0])){//multipolygon
		test = false;
		polyref.forEach((tab) => {
			if(test == false){
				test = true;
			    i = 0;
			    //déterminer si poly succeptible de contenir pol
			    var maybepoly = false;
			    var thatt = L.polygon(tab[0]);
			    polys.forEach((p) => {
			    	if(maybepoly === false){
			    	if(thatt.containsPoint(p)){maybepoly = true;}
			    	}
			    });
		        if(maybepoly === true){
		  	    tab.forEach((e) => {//test pas d'intersection de ligne
		  	    	if(test === true){
		  	    	var thatp = L.polygon(e);
		  	    	if(i == 0){//test contains sur outer ring
		  	    		if(thatp.simplecontainsPolysimple(pol) === false){test = false;}
		  	    	}else{//test les holes ne sont pas intersectés
		  	    		if(thatp.simpleintersectPolysimple(pol)){test = false;}
		  	    	}
		  	    	}
		  	    	i++;
		  	    });
		        }else{
			    	test = false;
			    }
			}
		});
		}else{//polygon
		polyref.forEach((e) => {
			if(test === true){
				var thatp = L.polygon(e);
				if(i == 0){//test contains sur outer ring
					if(thatp.simplecontainsPolysimple(pol) === false){test = false;}
				}else{//test les holes ne sont pas intersectés
					if(thatp.simpleintersectPolysimple(pol)){test = false;}
				}
			}
			i++;
		});
		}
		}
		}else{
			test = false;
		}
		return test;
	},
/**
 * Checks if a single point is contained in a simple polyline or simple polygon without hole
 * Writed by Brian S Hayes - 2017
 * @member external:L.Polygon.simplecontains
 * @param {L.LatLng} p A geographical point with a latitude and longitude.
 * @returns {boolean} True if the point is contained in the polygon or polyline; otherwise, 
 * @see {@link https://github.com/Fragger/Leaflet.Geodesic Leaflet.Geodesc} for information about Leaflet.Geodesc by Fragger.
 */
	simplecontainsPoint: function (p) {
		//"use strict";
		var rectangularBounds = this.getBounds();  // It appears that this is O(1): the LatLngBounds is updated as points are added to the polygon when it is created.
		var wn;
		if (rectangularBounds.contains(p)) {
			wn = this._getWindingNumber(p);
			return (wn !== 0);
		} else {
			return false;
		}
	},
/**
 * Checks if a simple polygon without hole is intersected with a simple simple polygon without hole
 * Writed by Edouard Morin - DREAL PdL - 2024
 * @member external:L.Polygon.simpleintersectPolysimple
 * @param {L.Polygon} pol A geographical simple polygon without hole.
 * @returns {boolean} True if the polygon is instersected with the polygon or polyline; Just one point in common is enought.
 */
	simpleintersectPolysimple: function (pol) {
		var rectangularBounds = this.getBounds();
		var polBounds = pol.getBounds();
		var polyref = this.getLatLngs()[0];
		var polys = pol.getLatLngs()[0];
		var test = false;
		var ptemp,
			pm1,
			qm1,
			m;
		if (rectangularBounds.intersects(polBounds)) {
		var i=0;
		polys.forEach((p) => {
			if(i>0 && test === false){
			ptemp =  L.polyline([pm1,p]);
			var j = 0;
			var qm1 = {};
			polyref.forEach((q) => {
				 if(j>0 && test === false){
					if(ptemp.isCross(qm1,q)){test = true;}
				 }
			qm1 = q;
			j++;
			//test point contains 
			if(pol.simplecontainsPoint(q)){test = true;}
			});
			}
		pm1 = p;
		i++;
		//test point contains 
		if(this.simplecontainsPoint(p)){test = true;}
		});
		}
		
		return test;
	},
/**
 * Checks if a simple polygon without hole is contained in a a simple polygon without hole
 * Writed by Edouard Morin - DREAL PdL - 2024
 * @member external:L.Polygon.simpleintersectPolysimple
 * @param {L.Polygon} pol A geographical simple polygon without hole.
 * @returns {boolean} True if the polygon is contained in the polygon or polyline.
 */    
	simplecontainsPolysimple: function (pol) {
		var rectangularBounds = this.getBounds();
		var polBounds = pol.getBounds();
		var polyref = this.getLatLngs()[0];
		var polys = pol.getLatLngs()[0];
		var test = true;
		var i=0;
		var ptemp,
			pm1,
			qm1,
			m;
		if (rectangularBounds.intersects(polBounds)) {
		//test sommets contenus
		polys.forEach((p) => {
			if(this.simplecontainsPoint(p)===false){test = false;}
		});
		if(test === true){
		//test pas d'intersection de ligne
		polys.forEach((p) => {
			if(i>0 && test === true){
			ptemp =  L.polyline([pm1,p]);
			var j = 0;
			var qm1 = {};
			polyref.forEach((q) => {
				 if(j>0 && test === true){
					if(ptemp.isCross(qm1,q)){test = false;}
				 }
			qm1 = q;
			j++;
			});
			}
		pm1 = p;
		i++;
		});
		}
		}else{
			test = false;
		}
		return test;
	},  
/**
 * Just a utiltool to create a polygon leaflet from geojson geometry
 * Writed by Edouard Morin - DREAL PdL - 2024
 * @member external:L.Polygon.buildfromgeojsoncoord
 * @param [[lng,lat]] array with coordinates from a multipolygon geojson.
 * @returns {L.Polygon} the polygon in leaflet object.
 */
	buildfromgeojsoncoord: function(coordgeojson) {
		var coords = [];
		if(Array.isArray(coordgeojson[0][0][0])){//multipolygon
		coordgeojson.forEach((poly) => {
			var coordpoly = [];
			poly.forEach((ring) => {
				var coordring = [];
				ring.forEach((e) => {coordring.push({lat:e[1],lng:e[0]})})
				coordpoly.push(coordring);
			});
			coords.push(coordpoly);
		});
		}else{//polygon
		coordgeojson.forEach((ring) => {
			var coordring = [];
			ring.forEach((e) => {coordring.push({lat:e[1],lng:e[0]})})
			coords.push(coordring);
		});
		}
	 this.setLatLngs(coords);
	},
/**
 * Test for a point in a polygon or on the bounding lines of the polygon.  The
 * coordinates (L.LatLngs) for a GeodesicPolygon are set to follow the earth's
 * curvature when the GeodesicPolygon object is created.  Since L.Polygon
 * extends L.Polyline we can use the same method for both.  Although, for
 * L.Polyline, we only get points on the line even if a collection of lines
 * appear to make a polygon.
 * <br><br>
 * This is a JavaScript and Leaflet port of the `wn_PnPoly()` C++ function by Dan Sunday.
 * Unlike the C++ version, this implementation does include points on the line and vertices.
 * Writed by Brian S Hayes - 2017
 *
 * @member internal:L.Polygon._getWindingNumber
 * @param p {L.LatLng} A point.
 * @returns {Number} The winding number (=0 only when the point is outside)
 *
 * @see {@link http://geomalgorithms.com/a03-_inclusion.html Inclusion of a Point in a Polygon} by Dan Sunday.
 * @see {@link https://github.com/Fragger/Leaflet.Geodesic Leaflet.Geodesc} for information about Leaflet.Geodesc by Fragger.
 */
	_getWindingNumber: function (p) { // Note that L.Polygon extends L.Polyline
		var i,
			isLeftTest,
			n,
			vertices,
			wn; // the winding number counter
		function flatten(a) {
			var flat;
			flat = ((Array.isArray ? Array.isArray(a) : L.Util.isArray(a)) ? a.reduce(function (accumulator, v, i, array) {
					return accumulator.concat(Array.isArray(v) ? flatten(v) : v);
				}, [])
				: a);
			return flat;
		}

		vertices = this.getLatLngs();
		vertices = flatten(vertices); // Flatten array of LatLngs since multi-polylines return nested array.
		// Filter out duplicate vertices.  
		vertices = vertices.filter(function (v, i, array) { // remove adjacent duplicates
			if (i > 0 && v.lat === array[i-1].lat && v.lng === array[i-1].lng) {
				return false;
			} else {
				return true;
			}
		});
		n = vertices.length;
		// Note that per the algorithm, the vertices (V) must be "a vertex points of a polygon V[n+1] with V[n]=V[0]"
		if (n > 0 && !(vertices[n-1].lat === vertices[0].lat && vertices[n-1].lng === vertices[0].lng)) {
			vertices.push(vertices[0]);
		}
		n = vertices.length - 1;
		wn = 0;
		for (i=0; i < n; i++) {
			isLeftTest = this._isLeft(vertices[i], vertices[i+1], p);
			if (isLeftTest === 0) { // If the point is on a line, we are done.
				wn = 1;
				break;
			} else {
				if (isLeftTest !== 0) { // If not a vertex or on line (the C++ version does not check for this)
					if (vertices[i].lat <= p.lat) {
						if (vertices[i+1].lat > p.lat) { // An upward crossing
							if (isLeftTest > 0) { // P left of edge
								wn++; // have a valid up intersect
							}
						}
					} else {
						if (vertices[i+1].lat <= p.lat) {// A downward crossing
							if (isLeftTest < 0) { // P right of edge
								wn--; // have a valid down intersect
							}
						}
					}
				} else {
					wn++;
				}
			}
		}
		return wn;
	},
/**
 * Tests if a point is left|on|right of an infinite line.
 * <br><br>
 * This is a JavaScript and Leaflet port of the `isLeft()` C++ function by Dan Sunday.
 * Writed by Brian S Hayes - 2017
 * @member internal:L.Polygon._isLeft
 * @param {LatLng} p0 Point The reference line is defined by p0 LatLng to p1.
 * @param {LatLng} p1 Point The reference line is defined by p0 LatLng to p1.
 * @param {LatLng} p2 The point in question.
 * @returns {Number} >0 for p2 left of the line through this point and p1,
 *          =0 for p2 on the line,
 *          <0 for p2 right of the line through this point an p1.
 * @see {@link http://geomalgorithms.com/a03-_inclusion.html Inclusion of a Point in a Polygon} by Dan Sunday.
 */
    _isLeft: function(p0, p1, p2) {
		return ((p1.lng - p0.lng) * (p2.lat - p0.lat) -
				(p2.lng - p0.lng) * (p1.lat - p0.lat));
    }
});
/**
 * The Leaflet Polyline class.
 * @name Polyline
 * @member external:L.Polyline
 * @see {@link http://leafletjs.com/ Leaflet} documentation for further information.
 */
L.Polyline.include({
/**
 * Tests if a line cross intersect with a other line.
 * <br><br>
 * E. Morin - DREAL PdL - 2024.
 * @member external:L.Polyline.isCross
 * @param {LatLng} p1 Point The first reference line.
 * @param {LatLng} p2 Point The second reference line. The line is compared with `this` Polyline simple (2 points)
 * @returns {boolean} True if the both lines are cross intersected
 */
	isCross: function (p1, p2) {
		var q1 = this.getLatLngs()[0];
		var q2 = this.getLatLngs()[1];
		var lp1 = this._isLeftl(q1, q2, p1);
		var lp2 = this._isLeftl(q1, q2, p2);
		var lq1 = this._isLeftl(p1, p2, q1);
		var lq2 = this._isLeftl(p1, p2, q2);
		if(lp1*lp2 <= 0 && lq1*lq2<=0){return true;}else{return false;}
	},
/**
 * Tests if a point is left|on|right of an infinite line.
 * <br><br>
 * This is a JavaScript and Leaflet port of the `isLeft()` C++ function by Dan Sunday.
 * Writed by Brian S Hayes - 2017
 * @member external:L.LatLng.isLeft
 * @param {LatLng} p0 Point The reference line is defined by p0 LatLng to p1.
 * @param {LatLng} p1 Point The reference line is defined by p0 LatLng to p1.
 * @param {LatLng} p2 The point in question.
 * @returns {Number} >0 for p2 left of the line through this point and p1,
 *          =0 for p2 on the line,
 *          <0 for p2 right of the line through this point an p1.
 * @see {@link http://geomalgorithms.com/a03-_inclusion.html Inclusion of a Point in a Polygon} by Dan Sunday.
 */
    _isLeftl: function(p0, p1, p2) {
		return ((p1.lng - p0.lng) * (p2.lat - p0.lat) -
				(p2.lng - p0.lng) * (p1.lat - p0.lat));
    }
});
}));
