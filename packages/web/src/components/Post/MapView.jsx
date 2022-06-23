
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { MapContainer, Marker, Popup, TileLayer, Circle, useMap } from 'react-leaflet'

import styles from "./Post.module.scss";

const MapView = props => {
    const latitude = props.latitude;
    const longitude = props.longitude;
    const zoom = 13;
    const markerRef = useRef();
    const mapElement = useRef();

    const MapComponent = (props) => {
        const map = useMap();
        map.setView([latitude, longitude], zoom)
        return null
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const width = '720px';
    //         const height = '350px';
    //         const dataURL = await domtoimage.toPng(mapElement, { width, height });
    //         console.log(dataURL)
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className={styles.mapViewWrapper}>
            <MapContainer center={[latitude, longitude]} zoom={zoom} ref={mapElement}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapComponent position={[latitude, longitude]} zoom={zoom}/>
                <Marker
                    draggable={false}
                    position={[latitude, longitude]}
                    ref={markerRef}>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default MapView