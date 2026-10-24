import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import config from '@/config';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import FilmTile from '@/components/molecules/films/tile';
import { MaxContentWidth, Spacing } from '@/constants/theme';

import type { IBaseFilm } from '@/types/film';

export default function HomeScreen() {
    const [films, setFilms] = useState<IBaseFilm[]>([]);

    useEffect(() => {
        const getFilms = async () => {
            try {
                const { apiUrl } = config;

                const response = await fetch(`${apiUrl}/v1/films`);

                const data = await response.json();

                setFilms(data);
            } catch (error) {
                console.error(error);
            }
        };

        getFilms();
    }, []);

    return (
        <ThemedView style={styles.container}>
            <View style={styles.titleContainer}>
                <ThemedText type="title">Film Rate</ThemedText>
            </View>

            <View>
                {films.length > 0 ? (
                    <FlatList
                        data={films}
                        numColumns={2}
                        contentContainerStyle={styles.list}
                        columnWrapperStyle={styles.row}
                        renderItem={({ item }) => (
                            <FilmTile key={item.id} film={item} />
                        )}
                    />
                ) : (
                    <ThemedText style={styles.noFilmsText}>
                        No films found
                    </ThemedText>
                )}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: MaxContentWidth,
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.six
    },
    list: {
        padding: Spacing.three
    },
    row: {
        marginBottom: Spacing.three,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    titleContainer: {
        alignItems: 'center'
    },
    noFilmsText: {
        textAlign: 'center'
    }
});
