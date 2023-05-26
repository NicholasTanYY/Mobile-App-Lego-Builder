export const handleLogin = async (username, password, navigation) => {
    // Send login request and validate credentials on the server-side
    // Replace this with your own implementation

    if (username === '' && password === '') {
      navigation.navigate("Main");
  }
}

export const handleSignup = async (navigation) => {
  navigation.navigate("Signup");
}