import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import StarIcon from '@/components/atoms/icons/star';
import { ThemedText } from '@/components/themed-text';
import getFullImagePath from '@/helpers/get-full-image-path';

import type { IBaseFilm } from '@/types/film';

type Props = {
    film: IBaseFilm;
};

export default function Tile({ film }: Props) {
    const { title, avgRate, posterUrl } = film;

    const fullPosterUrl = getFullImagePath(posterUrl);

    return (
        <View style={styles.tile}>
            <Image style={styles.image} source={{ uri: fullPosterUrl }} />

            <ThemedText style={styles.text}>{title}</ThemedText>

            <View style={styles.rateContainer}>
                <StarIcon
                    width={Spacing.four}
                    height={Spacing.four}
                    color="#EAB308"
                />

                <ThemedText>{avgRate.toFixed(2)}</ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        marginHorizontal: Spacing.two,
        marginVertical: Spacing.two,
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
        marginVertical: Spacing.one
    },
    rateContainer: {
        flex: 1,
        flexDirection: 'row',
        columnGap: Spacing.one,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Spacing.one
    },
    starIcon: {
        width: Spacing.four,
        height: Spacing.four,
        color: '#EAB308'
    }
});
