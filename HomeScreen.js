import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="person-outline" size={50} color="black" />
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const MyFarm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Farm</Text>
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
