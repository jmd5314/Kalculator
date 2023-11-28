//stack 네비게이션 생성
// 화면을 구성하는 screen component와 screen component
//를 관리하는 navigator 컴포넌트가 있다.
 //navigator컴포넌트 안에 screen 컴포넌트를 자식 컴포넌트로 작성한다.
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {MenuSelection, ProfileProduction, TargetCalorie, 
  Profile, GroupList, PostList, UserDelete} from '../screens';
const Stack = createStackNavigator();

const ProfileProductionStack = () => {
  return (
    <Stack.Navigator
     screenOptions={{ cardStyle: {backgroundColor: '#ffffff' },
     headerTitleAlign: 'center',
     headerStyle:{
     height: 90,
     backgroundColor: '#95a5a6',
     borderBottomWidth: 5,
     borderBottomColor:'#34495e',
     }
     }}
    >
      <Stack.Screen name="ProfileProduction"
      component={ProfileProduction}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name="MenuSelection"
      component={MenuSelection}
      />

      <Stack.Screen name="TargetCalorie" component={TargetCalorie} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PostList" component={PostList} />
      <Stack.Screen name="GroupList" component={GroupList} />
      <Stack.Screen name="UserDelete" component={UserDelete} />
    </Stack.Navigator>
  );
};

export default ProfileProductionStack;