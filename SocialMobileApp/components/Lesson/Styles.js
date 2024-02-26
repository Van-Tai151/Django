import { StyleSheet } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";

export default StyleSheet.create({
    img: {
        width: 100,
        height: 100
    },
    tag: {
        width: 80,
        height: 30,
        backgroundColor: "blue",
        color: "white",
        padding: 5,
        margin: 5,
        borderRadius: 10
    },
    thumb: {
        width: 40,
        height: 40,
        borderRadius: 10
    },
    comment: {
        width: 300,
        backgroundColor: "lightgray",
        padding: 5
    }, button: {
        textAlign: "center",
        backgroundColor: "darkblue",
        color: "white",
        padding: 10
    }
})