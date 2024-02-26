import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"
import MyStyles from "../../styles/MyStyles"
import React from 'react'
import API, { endpoints } from "../../configs/API";

const Lesson = ({route, navigation}) => {
    const [lessons, setLessons] = React.useState(null);
    const {pagId} = route.params;

    React.useEffect(() => {
        const loadLessons = async () => {
            try {
                let res = await API.get(endpoints['lessons'](pagId));
                setLessons(res.data);
            } catch (ex) {
                console.error(ex);
            }
        }

        loadLessons();
    }, [pagId]);

    const goToDetails = (lessonId) => {
        navigation.navigate("LessonDetails", {"lessonId": lessonId})
    }

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>DANH SÁCH BÀI HỌC</Text>
            <ScrollView>
                {lessons === null ? <ActivityIndicator /> : <>
                    {
                        lessons.map(c => (
                            <View style={MyStyles.row} key={c.id}>
                                <TouchableOpacity onPress={() => goToDetails(c.id)}>
                                    <Image source={{ uri: c.image }} style={[MyStyles.m_10, { width: 80, height: 80 }]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => goToDetails(c.id)}>
                                    <Text style={[MyStyles.m_10, MyStyles.title]}>{c.subject}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </>}
            </ScrollView>
        </View>
    )
}

export default Lesson;