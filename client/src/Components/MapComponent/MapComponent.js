import React, { Component } from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { Tooltip, OverlayTrigger, Button} from 'react-bootstrap'
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import { InfoWindowComponent } from '../MainInfoWindow/MainInfoWindow'

const google = window.google

const voted = {
  backgroundColor: 'orange' 
}



export const GoogleMapExample = withScriptjs(withGoogleMap(props => (
    <GoogleMap
        containerElement={props.containerElement}
        mapElement={props.mapElement}
        googlemapURL={props.googleMapURL}
        loadingElement={props.loadingElement}
        defaultCenter = {props.defaultCenter}
        defaultZoom = {props.defaultZoom}
        onClick={props.onClick}
        markerArray={props.markerArray}
        markerClick={props.markerClick}
        activeWindow={props.activeWindow}
        closeWindow={props.closeWindow}
        onBoundsChanged={props.onBoundsChanged}
        onSearchBoxMounted={props.onSearchBoxMounted}
        onPlacesChanged={props.onPlacesChanged}
        center={props.center}
        userName={props.userName}


    >
      {props.markerArray.map((marker, i) => (
        
      <Marker
        position={{ lat: marker.coordinates.lat, lng: marker.coordinates.lng }}
        key={i}
        labelAnchor={new google.maps.Point(10, 50)}
        labelStyle={{backgroundColor: "rgba(255, 255, 255, 0.8)", fontSize: "16px", padding: "8px", borderRadius: '10px'}}
        onClick={() => props.markerClick(i)}
      >

      <div>
        {props.activeWindow === i && (
          
        <InfoWindowComponent onCloseClick={props.closeWindow}
          score={marker.score}
          category={marker.category}
          description={marker.description}
          upvoters={marker.upvoters}
          downvoters={marker.downvoters}
          markerMaker={marker.username}
          title={marker.title}
          username={props.userName}
          upVote={props.upVote}
          downVote={props.downVote}
          id={marker.id}
          >
        </InfoWindowComponent>
      )}
          
      </div>
     
      </Marker>
      ))}
      
  <SearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    controlPosition={google.maps.ControlPosition.TOP_LEFT}
    onPlacesChanged={props.onPlacesChanged}
 
  >
    <input
      type="text"
      placeholder="Enter an address or try Irvine, CA"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        marginTop: `27px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
        textOverflow: `ellipses`,
      }}
    />
  </SearchBox>
    </GoogleMap>
 )));