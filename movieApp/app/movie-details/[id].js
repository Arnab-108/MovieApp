import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ActivityIndicator, RefreshControl, StyleSheet, Image } from 'react-native'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'
const JobDetails = () => {
    const params = useGlobalSearchParams()
    const router = useRouter()
    const [movie, setMovie] = useState({})
    const API_KEY = '591b6be7'
    useEffect(() => {
        fetchMovieData()
    }, [])
    const fetchMovieData = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?i=${params.id}&apikey=${API_KEY}`);
            setMovie(response.data)
            // return response.data.Search;
        } catch (error) {
            alert('Error fetching movie data:', error);
            console.log(error)
            return [];
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerShadowVisible: false,
                    headerTitle: "Movie Details"
                }}
            />

            <View style={styles.container}>
                <Image style={styles.poster} source={{ uri: movie.Poster }} />
                <Text style={styles.title}>{movie.Title}</Text>
                <Text style={styles.year}>{movie.Year}</Text>
                <Text style={styles.plot}>{movie.Plot}</Text>
                <Text style={styles.writer}>{movie.Writer}</Text>
                <Text style={styles.rating}>IMDb Rating: {movie.imdbRating}</Text>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    poster: {
        width: 150,
        height: 225,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    year: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    plot: {
        textAlign: 'center',
        marginBottom: 10,
    },
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    writer:{
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    }
});

export default JobDetails
