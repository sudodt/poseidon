
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { useFormContext, Controller } from 'react-hook-form';
import { MapContainer, Marker, Popup, TileLayer, Circle, useMap } from 'react-leaflet'

import styles from "./MapView.module.scss";
import {addressToGeoJSON} from "@/utils/location"

const MapView = props => {
    const { control, formState: { errors }, handleSubmit, reset, setValue, watch } = useFormContext();
    const [latitude, setLatitude] = useState(10.762622);
    const [longitude, setLongitude] = useState(106.660172);
    const [draggable, setDraggable] = useState(true);
    const [zoom, setZoom] = useState(10);
    const city = watch('city_id')
    const district = watch('district_id')
    const ward = watch('ward_id')
    const markerRef = useRef();

    const MapComponent = (props) => {
        const map = useMap();
        map.setView(props.position, props.zoom)
        return null
    }

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const position = marker.getLatLng();
                    setLatitude(position.lat)
                    setLongitude(position.lng)
                }
            },
        }),
        [],
    )

    useEffect(() => {
        const fetchData = async () => {
            const geoLocation = await addressToGeoJSON(city, district, ward);
            if (geoLocation) {
                setLatitude(geoLocation.lat);
                setLongitude(geoLocation.lon);
            }
        };
        if (city || district || ward) {
            fetchData();
        }
        if (!district) {
            setZoom(10)
        }
        else setZoom(14)
    }, [city, district, ward]);

    useEffect(() => {
        setValue('latitude', latitude)
        setValue('longitude', longitude)
    }, [latitude, longitude, setValue])
    
    return (
        <div className={styles.wrapper}>
            <MapContainer center={[latitude, longitude]} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapComponent position={[latitude, longitude]} zoom={zoom}/>
                <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={[latitude, longitude]}
                    ref={markerRef}>
                    <Popup minWidth={90}>
                        <span onClick={toggleDraggable}>
                            {draggable ? 'Kéo thả để chọn vị trí' : 'Kéo thả để chọn vị trí'}
                        </span>
                    </Popup>
                </Marker>
            </MapContainer>
            <small>* Kéo thả để chọn vị trí chính xác</small>
        </div>
    );
}

export default MapView