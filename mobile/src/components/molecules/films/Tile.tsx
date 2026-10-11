import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import type { IFilm } from '@/types/film';

type Props = {
    film: IFilm;
};

export default function Tile({ film }: Props) {
    return (
        <ThemedView style={styles.tile}>
            <Image
                style={styles.image}
                source={require('@/assets/images/sample-film.jpg')}
            />

            <ThemedText style={styles.text}>{film.title}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        marginHorizontal: 6,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        aspectRatio: 3 / 4,
        objectFit: 'cover'
    },
    text: {
        paddingVertical: 12
    }
});
