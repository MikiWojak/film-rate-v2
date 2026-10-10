import { Image } from 'expo-image';
import { StyleSheet, FlatList, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
    const FlatListBasics = () => {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[
                        { key: 'Lorem ipsum dolor' },
                        { key: 'Aliquam ut ante' },
                        { key: 'Nunc at urna' },
                        { key: 'Proin finibus posuere' },
                        { key: 'Aenean et' },
                        { key: 'Vestibulum ac' },
                        { key: 'Hello there' },
                        { key: 'Lorem ipsum' },
                        { key: 'O tempora o mores' }
                    ]}
                    renderItem={({ item }) => (
                        <ThemedView>
                            <Image
                                style={styles.image}
                                source={require('@/assets/images/sample-film.jpg')}
                            />

                            <ThemedText> {item.key} </ThemedText>
                        </ThemedView>
                    )}
                />
            </View>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Film Rate</ThemedText>
                <ThemedView>
                    <FlatListBasics />
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        maxWidth: MaxContentWidth,
        flexGrow: 1
    },
    titleContainer: {
        gap: Spacing.three,
        alignItems: 'center',
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.six
    },
    centerText: {
        textAlign: 'center'
    },
    image: {
        width: 150,
        height: 200
    }
});
