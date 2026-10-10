import { StyleSheet, FlatList } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import FilmTile from '@/components/molecules/films/Tile';
import { MaxContentWidth, Spacing } from '@/constants/theme';

import type { IFilm } from '@/types/film';

export default function HomeScreen() {
    const FilmsList = () => {
        const data: IFilm[] = [
            {
                id: 'b28177ad-4da6-49f1-8ded-06987b6e57e4',
                title: 'Lorem ipsum dolor'
            },
            {
                id: '96a358ce-ffd7-4149-ace3-acbcbcf10856',
                title: 'Aliquam ut ante'
            },
            {
                id: '66e42efd-45f8-4884-8f18-e3ef794dca4b',
                title: 'Nunc at urna'
            },
            {
                id: '49baed2c-e205-4d07-b607-1aae8f49505b',
                title: 'Proin finibus posuere'
            },
            {
                id: '1f327d72-b0bd-4ee3-baeb-8741ec4a925a',
                title: 'Aenean et'
            },
            {
                id: '7ded089c-e2eb-40a0-b118-c7f8302428e3',
                title: 'Vestibulum ac'
            },
            {
                id: 'f94cee41-3bc4-48e3-883f-6d1f0ac6763a',
                title: 'Hello there'
            },
            {
                id: '2336c5a3-218e-4540-9569-14c841d0c761',
                title: 'Lorem ipsum'
            },
            {
                id: '1212288b-84f0-4202-a6c2-a758a6353d3d',
                title: 'O tempora o mores'
            }
        ];

        return (
            <ThemedView>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <FilmTile key={item.id} film={item} />
                    )}
                />
            </ThemedView>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title"> Film Rate </ThemedText>

                <FilmsList />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: MaxContentWidth,
        flexGrow: 1
    },
    titleContainer: {
        gap: Spacing.three,
        alignItems: 'center',
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.six
    }
});
