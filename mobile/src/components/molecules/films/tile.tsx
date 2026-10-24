import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import getFullImagePath from '@/helpers/get-full-image-path';

import type { IBaseFilm } from '@/types/film';

type Props = {
    film: IBaseFilm;
};

// TODO Show average rate
export default function Tile({ film }: Props) {
    const { title, posterUrl } = film;

    const fullPosterUrl = getFullImagePath(posterUrl);

    return (
        <View style={styles.tile}>
            <Image style={styles.image} source={{ uri: fullPosterUrl }} />

            <ThemedText style={styles.text}>{title}</ThemedText>
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
        objectFit: 'cover',
        borderRadius: Spacing.two
    },
    text: {
        textAlign: 'center',
        paddingVertical: Spacing.two
    }
});
