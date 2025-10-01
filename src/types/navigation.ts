// navigation.ts
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { userId: string }; // Example with params
};
