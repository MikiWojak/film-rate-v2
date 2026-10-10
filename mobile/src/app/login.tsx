import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export default function TabTwoScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title"> Login </ThemedText>
                <ThemedText style={styles.centerText}> Coming soon </ThemedText>
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
    }
});
