import React from "react";
import { APILoader } from '@uiw/react-baidu-map';
import { Map, useMap, Provider, useMapContext } from '@uiw/react-baidu-map';
import { MapTypeControl, useMapTypeControl } from '@uiw/react-baidu-map';

export default class SubwayMap extends React.Component{
    render()
    {
        return(
            <div style={{ width: '40%', height: '700px' }}>
                <APILoader akay="eYpCTECSntZmw0WyoQ7zFpCRR9cpgHFG">
                    <Map />
                </APILoader>
            </div>
        )
    }
}