import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

import type { IFilm } from '@/types/film';

type Props = {
    film: IFilm;
};

export default function Tile({ film }: Props) {
    return (
        <View style={styles.tile}>
            <Image
                style={styles.image}
                source={require('@/assets/images/sample-film.jpg')}
            />

            <ThemedText style={styles.text}>{film.title}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        marginHorizontal: Spacing.two,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        aspectRatio: 3 / 4,
        objectFit: 'cover'
    },
    text: {
        paddingVertical: Spacing.two
    }
});
