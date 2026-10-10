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
        <ThemedView>
            <Image
                style={styles.image}
                source={require('@/assets/images/sample-film.jpg')}
            />

            <ThemedText> {film.title} </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 200
    }
});
