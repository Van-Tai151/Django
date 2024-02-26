import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { View, Text, TextInput, Touchable, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import API, { authApi, endpoints } from "../../configs/API";
import MyContext from "../../configs/MyContext";
import MyStyles from "../../styles/MyStyles";
import Style from "./Style";

const Login = ({navigation}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);

    const login = async () => {
        setLoading(true);

        try {
            let res = await API.post(endpoints['login'], {
                "username": username, 
                "password": password,
                "client_id": "1LW37kWtkHSITSKAdOZXsHYSJsSkQm3QteGMrDOQ",
                "client_secret": "7REPzq34Cs3tx7KdIP9jxc0USNiJWYo6KLWXuDJzBXKhz9wFcptPsZybcm3I2OfGbJcgSqARgnUz7vkef3rJ9qTck0tFpwgbQzE9EuaI3378paDlugBGZqKDMjmcWsBq",
                "grant_type": "password"
            });

            await AsyncStorage.setItem("access-token", res.data.access_token)
            let user = await authApi(res.data.access_token).get(endpoints['current-user']);
            dispatch({
                type: "login",
                payload: user.data
            });
            navigation.navigate("Home");
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG NHẬP</Text>

            <TextInput value={username} onChangeText={t => setUsername(t)} style={Style.input} placeholder="Tên đăng nhập..." />
            <TextInput secureTextEntry={true} value={password} onChangeText={t => setPassword(t)} style={Style.input} placeholder="Mật khẩu..." />

            {loading===true?<ActivityIndicator />:<>
                <TouchableOpacity onPress={login}>
                    <Text style={Style.button}>Đăng nhập</Text>
                </TouchableOpacity>
            </>}
            
        </View>
    );
}

export default Login;