import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Button, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import HomeScreen from '../Component/HomeScree';
// import { CgLogIn } from "react-icons/cg";
// import { IconContext } from 'react-icons/lib';
import { MaterialIcons } from '@expo/vector-icons';
const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerShadowVisible: false,
                    headerTitle: "Movie App",
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: "2vw" }}
                            onPress={() => router.push(`/login`)}>
                            <View>
                                <MaterialIcons name="login" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    )
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
