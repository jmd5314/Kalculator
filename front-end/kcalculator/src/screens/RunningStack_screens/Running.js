import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const watchId = useRef(null);
  const startTime = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
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

    startLocationUpdates();

    return () => {
      Location.stopLocationUpdatesAsync('locationUpdates');
    };
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

  const startStopToggle = () => {
    if (isRunning) {
      stopRun();
    } else {
      startRun();
    }
  };

  const startRun = async () => {
    setIsRunning(true);
    startTime.current = new Date().getTime();
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
    setElapsedTime(runTime);
  };

  const handleLocationChange = (location) => {
    const newCoordinate = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setRouteCoordinates(prevRouteCoordinates => [...prevRouteCoordinates, newCoordinate]);
    setLocation(newCoordinate);

    const newDistance = calculateDistance([...routeCoordinates, newCoordinate]);
    setDistance(newDistance);

    const mapRegion = {
      latitude: newCoordinate.latitude,
      longitude: newCoordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setInitialRegion(mapRegion);
    mapRef.current.animateToRegion(mapRegion, 1000);
  };

  const calculateDistance = (coordinates) => {
    let distanceInMeters = 0;
    for (let i = 1; i < coordinates.length; i++) {
      distanceInMeters += Location.distance(
        {
          latitude: coordinates[i - 1].latitude,
          longitude: coordinates[i - 1].longitude,
        },
        {
          latitude: coordinates[i].latitude,
          longitude: coordinates[i].longitude,
        }
      );
    }
    return distanceInMeters / 1000; // Convert to kilometers
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
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSave = () => {
    saveRunData();
    setElapsedTime(0);
    setDistance(0);
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        initialRegion={initialRegion}
      >
        {location && <Marker coordinate={location} />}
        {routeCoordinates.length > 1 && <Polyline coordinates={routeCoordinates} strokeColor="#00F" strokeWidth={3} />}
      </MapView>
      <Text style={styles.timerText}>Time: {formatTime(elapsedTime)}</Text>
      <Text style={styles.distanceText}>Distance: {distance.toFixed(2)} km</Text>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity style={styles.button} onPress={startStopToggle}>
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton}
          onPress={() => navigation.navigate('RunHistory')}>
            <MaterialIcons name="history" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
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
  stepsText: {
    fontSize: 20,
    marginLeft: 10,
  },
  timerText: {
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 10,
  },
  distanceText: {
    fontSize: 18,
    marginBottom: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
    marginRight: 10,
  },
  historyButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
  },
});

export default Running;