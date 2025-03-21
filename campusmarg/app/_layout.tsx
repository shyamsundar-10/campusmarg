import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => (
	<Stack screenOptions={{
		headerShown: false}}>
		<Stack.Screen name="index"  />
	</Stack>
);

export default Layout;
