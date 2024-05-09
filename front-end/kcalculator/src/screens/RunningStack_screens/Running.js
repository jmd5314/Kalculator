import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Running = ({ navigation }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.5514,
    longitude: 126.9419,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const watchId = useRef(null);
  const startTime = useRef(null);
  const lastElapsedTime = useRef(0); // Keep track of last elapsed time when pausing

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        let { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus !== 'granted') {
          console.log('Foreground location permission not granted.');
          return;
        }

        let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') {
          console.log('Background location permission not granted.');
          return;
        }

        await startLocationUpdates();
      } catch (error) {
        console.error('Error requesting location permissions:', error);
      }
    };

    const startLocationUpdates = async () => {
      try {
        await Location.startLocationUpdatesAsync('locationUpdates', {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 0,
        });
      } catch (error) {
        console.error('Error starting location updates:', error);
      }
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    const newDistance = calculateDistance(routeCoordinates);
    setDistance(newDistance);
  }, [routeCoordinates]);

  const startStopToggle = () => {
    if (isRunning) {
      stopRun();
    } else {
      startRun();
    }
  };

  const startRun = async () => {
    setIsRunning(true);
    if (!startTime.current) {
      startTime.current = new Date().getTime();
    } else {
      // Subtract last elapsed time when restarting
      startTime.current = new Date().getTime() - lastElapsedTime.current;
    }
    watchId.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (location) => {
        handleLocationChange(location);
      }
    );
  };

  const stopRun = async () => {
    setIsRunning(false);
    if (watchId.current) {
      await watchId.current.remove();
      watchId.current = null;
    }

    const endTime = new Date().getTime();
    const runTime = endTime - startTime.current;
    lastElapsedTime.current = runTime;
    // Do not update total elapsed time here
  };

  const handleLocationChange = (location) => {
    const newCoordinate = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setRouteCoordinates(prevRouteCoordinates => [...prevRouteCoordinates, newCoordinate]);
    setLocation(newCoordinate);

    setMapRegion(prevRegion => ({
      ...prevRegion,
      latitude: newCoordinate.latitude,
      longitude: newCoordinate.longitude
    }));
  };

  const calculateDistance = (coordinates) => {
    let distanceInMeters = 0;
    for (let i = 1; i < coordinates.length; i++) {
      const prevLatLng = coordinates[i - 1];
      const newLatLng = coordinates[i];
      const distance = haversine(prevLatLng, newLatLng);
      distanceInMeters += distance;
    }
    return distanceInMeters;
  };
  
  const haversine = (prevLatLng, newLatLng) => {
    const earthRadius = 6371; // in kilometers
    const { latitude: prevLat, longitude: prevLng } = prevLatLng;
    const { latitude: newLat, longitude: newLng } = newLatLng;
    const latDelta = toRadians(newLat - prevLat);
    const lngDelta = toRadians(newLng - prevLng);
  
    const a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
              Math.cos(toRadians(prevLat)) * Math.cos(toRadians(newLat)) *
              Math.sin(lngDelta / 2) * Math.sin(lngDelta / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  };
  
  const toRadians = (angle) => {
    return angle * (Math.PI / 180);
  };

  const saveRunData = async () => {
    const runData = {
      date: new Date().toLocaleDateString(),
      time: formatTime(elapsedTime),
      distance: distance.toFixed(2),
      coordinates: routeCoordinates,
    };

    try {
      const savedData = await AsyncStorage.getItem('runData');
      const existingData = savedData ? JSON.parse(savedData) : [];
      existingData.push(runData);
      await AsyncStorage.setItem('runData', JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving run data:', error);
    }
  }; 

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 0 ? `${hours}:` : '';
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  const handleSave = () => {
    saveRunData();
    startTime.current = null; // Reset start time when saving
    lastElapsedTime.current = 0; // Reset last elapsed time when saving
    setElapsedTime(0);
    setDistance(0);
    setLocation(null);
    setRouteCoordinates([]);
  };

  return (
      <SafeAreaView style={styles.container}>
        <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={mapRegion}
            onRegionChangeComplete={setMapRegion}
            moveOnMarkerPress={false}
        >
          {location && <Marker coordinate={location} />}
          {routeCoordinates.length > 1 && <Polyline coordinates={routeCoordinates} strokeColor="#00F" strokeWidth={3} />}
        </MapView>
        <View style={styles.infoPanel}>
          <Text style={styles.timerText}>시간: {formatTime(elapsedTime)}</Text>
          <Text style={styles.distanceText}>거리: {distance.toFixed(2)} km</Text>
        </View>
        <View style={styles.floatingMenu}>
          <TouchableOpacity style={styles.fabButton} onPress={startStopToggle}>
            <Text style={styles.fabText}>{isRunning ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpacer}></View>
          <TouchableOpacity style={styles.fabButton} onPress={handleSave}>
            <Text style={styles.fabText}>Save</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpacer}></View>
          <TouchableOpacity style={styles.fabButton} onPress={() => navigation.navigate('RunHistory')}>
            <MaterialIcons name="history" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoPanel: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
  },
  timerText: {
    fontSize: 18,
    color: 'white',
  },
  distanceText: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
  floatingMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
    margin: 20,
  },
  fabButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 30,
  },
  fabText: {
    color: 'white',
    fontSize: 18,
  },
  buttonSpacer: {
    width: 10,
  },
});

export default Running;