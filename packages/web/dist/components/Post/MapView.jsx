"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_leaflet_1 = require("react-leaflet");
var Post_module_scss_1 = require("./Post.module.scss");
var MapView = function (props) {
    var latitude = props.latitude;
    var longitude = props.longitude;
    var zoom = 13;
    var markerRef = react_1.useRef();
    var mapElement = react_1.useRef();
    var MapComponent = function (props) {
        var map = react_leaflet_1.useMap();
        map.setView([latitude, longitude], zoom);
        return null;
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const width = '720px';
    //         const height = '350px';
    //         const dataURL = await domtoimage.toPng(mapElement, { width, height });
    //         console.log(dataURL)
    //     };
    //     fetchData();
    // }, []);
    return (<div className={Post_module_scss_1["default"].mapViewWrapper}>
            <react_leaflet_1.MapContainer center={[latitude, longitude]} zoom={zoom} ref={mapElement}>
                <react_leaflet_1.TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <MapComponent position={[latitude, longitude]} zoom={zoom}/>
                <react_leaflet_1.Marker draggable={false} position={[latitude, longitude]} ref={markerRef}>
                </react_leaflet_1.Marker>
            </react_leaflet_1.MapContainer>
        </div>);
};
exports["default"] = MapView;
