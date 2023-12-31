import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingScreen from './SettingScreen';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = '9c3eca47f7a57d0542f753ffac3cf219';

  const fetchWeatherData = async () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        setWeatherData(response.data);
        setLoading(false);
      },
      (error) => {
        console.log('Error fetching location', error);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {weatherData && (
        <>
          <Text style={styles.text}>{weatherData.name}</Text>
          <Text style={styles.text}>{weatherData.weather[0].main}</Text>
          <Text style={styles.text}>{weatherData.main.temp}°C</Text>
        </>
      )}
    </View>
  );
};

const MyFarm = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="My Farm"
          />
        </MapView>
      )}
    </View>
  );
};

const Actions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Actions</Text>
    </View>
  );
};

const Analytics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analytics</Text>
    </View>
  );
};

const Marketplace = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Marketplace</Text>
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <Icon name="person-outline" size={50} color="black" />
      <Text style={styles.profileText}>Profile Screen</Text>
      <TouchableOpacity onPress={navigateToSettings}>
        <Text>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name=""
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Icon name="person-outline" size={24} color="black" style={styles.headerIcon} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: 'lightgray',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: 'lightgray',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: 'black',
        }}
      />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'gray',
        labelStyle: styles.tabLabel,
        style: styles.tabBar,
        showIcon: true,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'My Farm') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Actions') {
            iconName = focused ? 'ios-play' : 'ios-play-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'ios-cart' : 'ios-cart-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={AppNavigator} />
      <Tab.Screen name="My Farm" component={MyFarm} />
      <Tab.Screen name="Actions" component={Actions} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Marketplace" component={Marketplace} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 17,
  },
  tabBar: {
    backgroundColor: 'lightgray',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcon: {
    marginRight: 10,
  },
});

export default App;

