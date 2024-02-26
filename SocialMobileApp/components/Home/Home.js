import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import Style from "./Style";
import React, { useEffect, useState } from "react";
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

const Home = ({route, navigation}) => {
    const [pages, setPages] = React.useState(null);
    const posId = route.params?.posId;

    React.useEffect(() => {
        const loadPages = async () => {
            let url = endpoints['pages'];

            if (posId !== undefined && posId != null)
                url = `${url}?pos_id=${posId}`

            try {
                let res = await API.get(url);
                setPages(res.data.results);
            } catch (ex) {
                setPages([]);
                console.error(ex);
            }
        };

        loadPages();
    }, [cateId]);

    const goToLesson = (pagId) => {
        navigation.navigate("Lesson", {"pagId": pagId})
    }

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>DANH MỤC KHOÁ HỌC</Text>
            <ScrollView>
                {pages === null ? <ActivityIndicator /> : <>
                    {
                        pages.map(c => (
                            <View style={MyStyles.row} key={c.id}>
                                <TouchableOpacity onPress={() => goToLesson(c.id)}>
                                    <Image source={{ uri: c.image }} style={[MyStyles.m_10, { width: 80, height: 80 }]} />
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={() => goToLesson(c.id)}>
                                        <Text style={[MyStyles.m_10, MyStyles.title]}>{c.subject}</Text>
                                    </TouchableOpacity>
                                    <Text style={MyStyles.m_10}>{moment(c.created_date).fromNow()}</Text>
                                </View>
                                
                            </View>
                        ))
                    }
                </>}
            </ScrollView>
        </View>
    );
}

export default Home