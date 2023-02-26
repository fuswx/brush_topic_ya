import Home from "@/pages/Home/Home.vue";
import SetTopic from "@/pages/Topic/SetTopic/SetTopic.vue";
import GetTopic from "@/pages/Topic/GetTopic/GetTopic.vue";
import Topic from "@/pages/Topic/Topic.vue";
import ListForm from "@/pages/Topic/ListForm/ListForm.vue";
import Question from "@/pages/Question/Question.vue";
import ListQuestion from "@/pages/Question/ListQuestion/ListQuestion.vue";
import SetQuestion from "@/pages/Question/SetQuestion/SetQuestion.vue";
import GetQuestion from "@/pages/Question/GetQuestion/GetQuestion.vue";

export default [
    {
        path: "/home",
        component: Home,
        meta: {
            show: true
        }
    },
    {
        path: "/topic",
        component: Topic,
        children: [
            {
                path: "listForm",
                component: ListForm
            },
            {
                path: "setTopic",
                component: SetTopic,
            },
            {
                path: "getTopic",
                component: GetTopic,
            },
        ]
    },
    {
        path: "/question",
        component: Question,
        children: [
            {
                path: 'listQuestion',
                component: ListQuestion
            },
            {
                path: 'setQuestion',
                component: SetQuestion
            },
            {
                path: 'getQuestion',
                component: GetQuestion
            }
        ]
    }
];