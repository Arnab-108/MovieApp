import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from "axios"
import { useRouter } from 'expo-router';
import { createStackNavigator } from 'expo-router';

// const movieDetailsNavigation = createStackNavigator({
//     MovieDetails: {
//         screen: MovieDetailsScreen,
//     },
// });

const HomeScreen = () => {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const API_KEY = '591b6be7'; // Replace with your actual OMDB API key
    const router = useRouter()
    const fetchMovieData = async (searchQuery) => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
            return response.data.Search;
        } catch (error) {
            alert('Error fetching movie data:', error);
            return [];
        }
    };

    const handleSearch = async () => {
        const Movies = await fetchMovieData(search);
        setMovies(Movies);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Movie Discovery App</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for movies..."
                    value={search}
                    onChangeText={setSearch}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>
            <View style={styles.movieList}>
                {movies && movies.length > 0 ? (
                    movies?.map((item) => (
                        <TouchableOpacity
                            style={styles.movieItem}
                            key={item.imdbID}
                            onPress={() => {
                                router.push(`/movie-details/${item.imdbID}`);
                            }}
                        >
                            <Image style={styles.poster} source={{ uri: item.Poster }} />
                            <View style={styles.movieInfo}>
                                <Text style={styles.title}>{item.Title}</Text>
                                <Text style={styles.year}>{item.Year}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View>
                        <Text style={styles.luck}>Sorry, No Luck!</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    movieList: {
        marginTop: 20,
    },
    movieItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    poster: {
        width: 70,
        height: 105,
        marginRight: 10,
    },
    movieInfo: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    year: {
        color: '#666',
        marginTop: 4,
    },
    luck: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 13,
        textAlign: "center"
    }
});

export default HomeScreen;
