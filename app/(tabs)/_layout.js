import { NativeTabs, Icon } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Icon sf={{ default: 'list.bullet', selected: 'list.bullet.indent' }} md="list" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="exploration">
                <Icon sf={{ default: 'compass', selected: 'compass.fill' }} md="explore" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="life">
                <Icon sf={{ default: 'heart', selected: 'heart.fill' }} md="favorite" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="notes">
                <Icon sf={{ default: 'doc.text', selected: 'doc.text.fill' }} md="description" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
