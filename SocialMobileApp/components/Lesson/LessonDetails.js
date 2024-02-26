import { View, Text, ActivityIndicator, Image, Dimensions, TextInput, TouchableOpacity,  ScrollView } from "react-native"
import MyStyles from "../../styles/MyStyles"
import React, { useContext } from 'react'
import API, { authApi, endpoints } from "../../configs/API";
import Styles from "./Styles";
import RenderHTML from "react-native-render-html";
import MyContext from "../../configs/MyContext";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {height} = Dimensions.get('window');

const LessonDetails = ({route}) => {
    const [lesson, setLesson] = React.useState(null);
    const [comments, setComments] = React.useState(null);
    const [content, setContent] = React.useState();
    const {lessonId} = route.params;
    const [user, ] = useContext(MyContext);

    React.useEffect(() => {
        const loadLesson = async () => {
            try {
                let res = await API.get(endpoints['lesson-details'](lessonId));
                setLesson(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        const loadComments = async () => {
            try {
                let res = await API.get(endpoints['comments'](lessonId));
                setComments(res.data);
            } catch (ex) {
                console.error(ex);
            }
        }

        loadLesson();
        loadComments();
    }, [lessonId]);


    const addComment = async () => {
        try {
            let token = await AsyncStorage.getItem('access-token');
            let res = await authApi(token).post(endpoints['add-comment'](lessonId), {
                'content': content
            })
            setComments(current => [res.data, ...current]);
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <ScrollView style={MyStyles.container}>
            <Text style={MyStyles.subject}>CHI TIẾT BÀI HỌC</Text>
            {lesson===null?<ActivityIndicator />:<>
                <View style={MyStyles.row}>
                    <Image style={[Styles.img, MyStyles.m_10]} source={{uri: lesson.image}} />
                    <View>
                        <Text style={[MyStyles.title, MyStyles.m_10]}>{lesson.subject}</Text>
                        <View style={MyStyles.row}>
                            {lesson.tags.map(t => <Text style={Styles.tag} key={t.id}>{t.name}</Text>)}
                        </View>
                    </View>
                    
                </View>
                <ScrollView style={{height: height*0.6}}>
                    <RenderHTML source={{html: lesson.content}} />
                </ScrollView>
                <ScrollView>
                    {user===null?"":<>
                    <View style={[MyStyles.row, {alignItems: "center", justifyContent: "center"}]}>
                        <TextInput value={content} onChangeText={t => setContent(t)} style={Styles.comment} placeholder="Nội dung bình luận" />
                        <TouchableOpacity onPress={addComment}>
                            <Text style={Styles.button}>Bình luận</Text>
                        </TouchableOpacity>
                    </View>
                    </>}
                    
                {comments===null?<ActivityIndicator />:<>
                    {comments.map(c => <View style={MyStyles.row} key={c.id}>
                        <Image source={{uri: c.user.image}} style={[MyStyles.m_10, Styles.thumb]} />
                        <View>
                            <Text style={MyStyles.m_10}>{c.content}</Text>
                            <Text style={MyStyles.m_10}>{moment(c.created_date).fromNow()}</Text>
                        </View>
                    </View>)}
                </>}
                </ScrollView>
            </>}
        </ScrollView>
    )
}

export default LessonDetails