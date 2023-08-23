import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import axios from "axios"
import { Stack , useRouter } from 'expo-router';
import HomeScreen from '../Component/HomeScree';

const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{flex:1 , backgroundColor:"#f0f0f0"}}>
            <Stack.Screen 
                options={{
                    headerStyle:{backgroundColor:"#f0f0f0"},
                    headerShadowVisible:false,
                    headerTitle:"Movie App"
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View>
                        <HomeScreen />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default App;
