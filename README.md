# Leaflet.PolygonMinitools
<a href="https://github.com/doudz/Leaflet.PolygonMinitools/blob/master/LICENSE"><img align="right" src="https://img.shields.io/badge/license-MIT-blue.svg"></a><br/>
Leaflet.PolygonMinitools is a [Leaflet](http://leafletjs.com/) extension that provides several polygon functions to help create or edit a valid multipolygon with holes. 

Based on the principle that the best geometry editing libraries for leaflet (geoman, turf, etc.) were too complete for this unique need, the example given here provides light content for editing miltipolygons in valid geometry.

Main functions `containsPoint()`, `intersectPolysimple()`, and `containsPolysimple()` are included as an extension of the Leaflet class `L.Polygon`.

# Install
You need Leaflet >= 1.0.0, and then include src/Poligon.Minitools.js.

You can also directly use the script tag.

Stable (V1.0)
```
<script src="https://cdn.jsdelivr.net/gh/DoudzAdx/Leaflet.Polygon.MiniTools@1.0.0/src/Polygon.Minitools.js"></script>
```
Development (Main branch)
```
<script src="https://cdn.jsdelivr.net/gh/DoudzAdx/Leaflet.Polygon.MiniTools/src/Polygon.Minitools.js"></script>
```
# Demos
Demo on JSFiddle: [Leaflet.PolygonMinitools Demo](https://jsfiddle.net/Doudz/89sjqtzo/show). The same exemple is also included in `examples/exemple.html`.

The `drawformultipolygon` function in the example relies on [Leaflet.draw 1.0.4](https://github.com/Leaflet/Leaflet.draw/tree/v1.0.4)
It allows you to solve a complete use case on the management of multipolygons with this lightweight... and old library.

![Demo screen shot](demo.png)


# API
[See the reference](https://github.com/DoudzAdx/Leaflet.Polygon.Minitools/blob/main/man/Polygon.Minitools.man.md).


# Acknowledgements
Thanks to [Leaflet.PointInPolygon](https://github.com/hayeswise/Leaflet.PointInPolygon) by Brian Hayes, which provided the basis for this work.
