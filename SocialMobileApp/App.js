import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useEffect, useState } from "react/cjs/react.production.min";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import API, { endpoints } from "./configs/API";
import React, { useReducer } from 'react'
import Lesson from "./components/Lesson/Lesson";
import LessonDetails from "./components/Lesson/LessonDetails";
import MyContext from "./configs/MyContext";
import MyUserReducer from "./reducers/MyUserReducer";
import Logout from "./components/User/Logout";
import Register from "./components/User/Register";

const Drawer = createDrawerNavigator();

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={MyDrawerItem} screenOptions={{headerRight: Logout}}>
          <Drawer.Screen name="Home" component={Home} options={{title: 'Khóa học'}} />
          <Drawer.Screen name="Lesson" component={Lesson} options={{title: "Bài học", drawerItemStyle: {display: "none"}}} />
          <Drawer.Screen name="LessonDetails" component={LessonDetails} options={{title: "Chi tiết bài học", drawerItemStyle: {display: "none"}}} />
          
          {user===null?<>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
          </>:<>
            <Drawer.Screen name={user.username} component={Home} />
          </>}
          
        </Drawer.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  )
}

const MyDrawerItem = (props) => {
  const [posts, setPosts] = React.useState(null);

  React.useEffect(() => {
    const loadPosts = async () => {
      try {
        let res = await API.get(endpoints['posts']);
        setPosts(res.data);
      } catch (ex) {
        setPosts([])
        console.error(ex);
      }
    }

    loadPosts();

  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {posts===null?<ActivityIndicator />:<>
        {posts.map(c => <DrawerItem key={c.id} label={c.name} onPress={() => props.navigation.navigate("Home", {"posId": c.id})} />)}
      </>}
    </DrawerContentScrollView>
  );
}

export default App;