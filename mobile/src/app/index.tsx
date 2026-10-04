import { Image } from 'expo-image';
import { StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

// Default project has both light and dark mode
// - depends on device settings
// - good to hear that
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
                        { key: 'Vestibulum ac' }
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
            <SafeAreaView style={styles.safeArea}>
                <ThemedView style={styles.heroSection}>
                    <ThemedText type="title" style={styles.title}>
                        Film Rate
                    </ThemedText>
                </ThemedView>

                <FlatListBasics />
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        alignItems: 'center',
        gap: Spacing.three,
        paddingBottom: BottomTabInset + Spacing.three,
        maxWidth: MaxContentWidth
    },
    heroSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: Spacing.four,
        gap: Spacing.four
    },
    title: {
        textAlign: 'center'
    },
    image: {
        width: 150,
        height: 200
    }
});
