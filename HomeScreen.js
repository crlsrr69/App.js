import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
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

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="user" size={50} color="black" />
      <Text style={styles.profileText}>Profile Screen</Text>
    </View>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon={() => <Icon name="user" size={24} color="black" />}
              onPress={() => navigation.navigate('Profile')} // Navigate to the 'Profile' screen
              style={styles.headerIcon}
            />
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
      }}
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
