# Leaflet.PolygonMinitools API reference

Leaflet.PolygonMinitools is a Leaflet extension that provides several polygon functions to help create or edit a valid multipolygon with holes. 

### L.Polygon
The Leaflet Polygon class. You will access these methods through the L.Polygon object, example : mypolygon.containsPoint(p)

***Methods*** (Public methods)
- [.containsPoint](#containsPoint) ⇒ <code>boolean</code>
- [.intersectPolysimple](#intersectPolysimple) ⇒ <code>boolean</code>
- [.containsPolysimple](#containsPolysimple) ⇒ <code>boolean</code>
- [.simplecontainsPoint](#simplecontainsPoint) ⇒ <code>boolean</code>
- [.simpleintersectPolysimple](#intersectPolysimple) ⇒ <code>boolean</code>
- [.simplecontainsPolysimple](#containsPolysimple) ⇒ <code>boolean</code>
- [.buildfromgeojsoncoord](#intersectPolysimple) ⇒ <code>L.Polygon</code>

----

<a name="containsPoint"></a>

**Polygon.containsPoint** (<code>&lt;L.LatLng&gt;latlng</code>) ⇒ <code>boolean</code>

Checks if a single point is contained in a Polygon or Multipolygon with holes (L.Polygon).

*Returns*: <code>boolean</code> - True if the point is contained in the polygon

| Param | Type | Description |
| --- | --- | --- |
| p | <code>L.LatLng</code> | A geographical point with a latitude and longitude. |

----

<a name="intersectPolysimple"></a>

**Polygon.intersectPolysimple** (<code>&lt;L.Polygon&gt;object</code>) ⇒ <code>boolean</code>

Checks if a simple polygon without hole is intersected with a Polygon or Multipolygon with holes (L.Polygon).

*Returns*: <code>boolean</code> - True if the simple polygon is intersected with the polygon. Just one point in common is enought.

| Param | Type | Description |
| --- | --- | --- |
| pol | <code>L.Polygon</code> | A simple polygon instantiated by L.Polygon.

----

<a name="containsPolysimple"></a>

**Polygon.containsPolysimple** (<code>&lt;L.Polygon&gt;object</code>) ⇒ <code>boolean</code>

Checks if a simple polygon without hole is contained in a Polygon or Multipolygon with holes (L.Polygon).

*Returns*: <code>boolean</code> - True if the simple polygon is contained in the polygon

| Param | Type | Description |
| --- | --- | --- |
| pol | <code>L.Polygon</code> | A simple polygon instantiated by L.Polygon. 
  
----
  
<a name="simplecontainsPoint"></a>

**Polygon.simplecontainsPoint** (<code>&lt;L.LatLng&gt;latlng</code>) ⇒ <code>boolean</code>

Checks if a single point is contained in a simple polygon without hole (L.Polygon). Writed by Brian S Hayes. Cf. "contains" [Leaflet.PointInPolygon](https://github.com/hayeswise/Leaflet.PointInPolygon)

*Returns*: <code>boolean</code> - True if the point is contained in the polygon. No point in common.

| Param | Type | Description |
| --- | --- | --- |
| p | <code>L.LatLng</code> | A geographical point with a latitude and longitude. |
    
----

<a name="simpleintersectPolysimple"></a>

**Polygon.simpleintersectPolysimple** (<code>&lt;L.Polygon&gt;object</code>) ⇒ <code>boolean</code>

Checks if a simple polygon without hole is intersected with a simple Polygon (L.Polygon).

*Returns*: <code>boolean</code> - True if the simple polygon is intersected with the simple polygon in ref

| Param | Type | Description |
| --- | --- | --- |
| pol | <code>L.Polygon</code> | A simple polygon instantiated by L.Polygon.
    
----

<a name="simplecontainsPolysimple"></a>

**Polygon.simplecontainsPolysimple** (<code>&lt;L.Polygon&gt;object</code>) ⇒ <code>boolean</code>

Checks if a simple polygon without hole is contained in a a simple polygon without hole (L.Polygon).

*Returns*: <code>boolean</code> - True if the simple polygon is contained in the simple polygon in ref

| Param | Type | Description |
| --- | --- | --- |
| pol | <code>L.Polygon</code> | A simple polygon instantiated by L.Polygon.
    
----


    
<a name="buildfromgeojsoncoord"></a>

**Polygon.buildfromgeojsoncoord** (<code>[[lng,lat]] array</code>) ⇒ <code>L.Polygon</code>

Build a polygon leaflet (L.Polygon) from geojson geometry.

*Returns*: <code>L.Polygon</code> - The redraw polygon 

| Param | Type | Description |
| --- | --- | --- |
| coord | <code>array</code> | A geographical array with a latitude and longitude like attribute coordinates from geojson.


### L.Polyline
The Leaflet Polyline class.

***Methods*** : 

----

<a name="isCross"></a>

**Polyline.isCross** (<code>&lt;L.LatLng&gt;latlng, &lt;L.LatLng&gt;latlng</code>) ⇒ <code>boolean</code>

Tests if a line cross intersect with a other line (L.Polyline).

*Returns*: <code>boolean</code> - True if the both lines are cross intersected

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>L.LatLng</code> | A geographical point with a latitude and longitude.  
| p2 | <code>L.LatLng</code> | A geographical point with a latitude and longitude.  
