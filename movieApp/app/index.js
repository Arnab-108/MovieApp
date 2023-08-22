import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, FlatList } from 'react-native';
import axios from "axios"
const App = () => {
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const API_KEY = '591b6be7'; // Replace with your actual OMDB API key

    const fetchMovieData = async (searchQuery) => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
            return response.data.Search; // Returning the array of movie results
        } catch (error) {
            alert('Error fetching movie data:', error);
            return []; // Return an empty array in case of an error
        }
    };

    const handleSearch = async () => {
        const Movies = await fetchMovieData(search)
        setMovies(Movies)
    }
    return (
        <View style={styles.container}>
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
                {
                    movies ?
                        <FlatList
                            data={movies}
                            keyExtractor={(item) => item.imdbID}
                            renderItem={({ item }) => (
                                <View style={styles.movieItem}>
                                    <Image style={styles.poster} source={{ uri: item.Poster }} />
                                    <View style={styles.movieInfo}>
                                        <Text style={styles.title}>{item.Title}</Text>
                                        <Text style={styles.year}>{item.Year}</Text>
                                    </View>
                                </View>
                            )}
                        /> :
                        <View>
                            <Text style={styles.luck}>Sorry , No Luck!</Text>
                        </View>
                }
            </View>
        </View>
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

export default App;
