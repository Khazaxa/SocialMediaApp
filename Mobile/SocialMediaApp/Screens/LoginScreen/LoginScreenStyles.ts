import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    height: 50,
    width: 300,
    padding: 10,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 100,
    textAlign: "center",
  },
  image: {
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  loginBtn: {
    height: 50,
    width: 300,
    backgroundColor: "#007BFF",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  registerBtn: {
    height: 50,
    width: 300,
    backgroundColor: "#28A745",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default styles;
