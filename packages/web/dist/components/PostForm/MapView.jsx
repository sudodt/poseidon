"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var react_leaflet_1 = require("react-leaflet");
var MapView_module_scss_1 = require("./MapView.module.scss");
var location_1 = require("@/utils/location");
var MapView = function (props) {
    var _a = react_hook_form_1.useFormContext(), control = _a.control, errors = _a.formState.errors, handleSubmit = _a.handleSubmit, reset = _a.reset, setValue = _a.setValue, watch = _a.watch;
    var _b = react_1.useState(10.762622), latitude = _b[0], setLatitude = _b[1];
    var _c = react_1.useState(106.660172), longitude = _c[0], setLongitude = _c[1];
    var _d = react_1.useState(true), draggable = _d[0], setDraggable = _d[1];
    var _e = react_1.useState(10), zoom = _e[0], setZoom = _e[1];
    var city = watch('city_id');
    var district = watch('district_id');
    var ward = watch('ward_id');
    var markerRef = react_1.useRef();
    var MapComponent = function (props) {
        var map = react_leaflet_1.useMap();
        map.setView(props.position, props.zoom);
        return null;
    };
    var toggleDraggable = react_1.useCallback(function () {
        setDraggable(function (d) { return !d; });
    }, []);
    var eventHandlers = react_1.useMemo(function () { return ({
        dragend: function () {
            var marker = markerRef.current;
            if (marker != null) {
                var position = marker.getLatLng();
                setLatitude(position.lat);
                setLongitude(position.lng);
            }
        }
    }); }, []);
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var geoLocation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, location_1.addressToGeoJSON(city, district, ward)];
                    case 1:
                        geoLocation = _a.sent();
                        if (geoLocation) {
                            setLatitude(geoLocation.lat);
                            setLongitude(geoLocation.lon);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        if (city || district || ward) {
            fetchData();
        }
        if (!district) {
            setZoom(10);
        }
        else
            setZoom(14);
    }, [city, district, ward]);
    react_1.useEffect(function () {
        setValue('latitude', latitude);
        setValue('longitude', longitude);
    }, [latitude, longitude, setValue]);
    return (<div className={MapView_module_scss_1["default"].wrapper}>
            <react_leaflet_1.MapContainer center={[latitude, longitude]} zoom={zoom}>
                <react_leaflet_1.TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <MapComponent position={[latitude, longitude]} zoom={zoom}/>
                <react_leaflet_1.Marker draggable={draggable} eventHandlers={eventHandlers} position={[latitude, longitude]} ref={markerRef}>
                    <react_leaflet_1.Popup minWidth={90}>
                        <span onClick={toggleDraggable}>
                            {draggable ? 'Kéo thả để chọn vị trí' : 'Kéo thả để chọn vị trí'}
                        </span>
                    </react_leaflet_1.Popup>
                </react_leaflet_1.Marker>
            </react_leaflet_1.MapContainer>
            <small>* Kéo thả để chọn vị trí chính xác</small>
        </div>);
};
exports["default"] = MapView;
