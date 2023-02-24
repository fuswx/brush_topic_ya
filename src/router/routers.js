import Home from "@/pages/Home/Home.vue";
import SetTopic from "@/pages/Topic/SetTopic/SetTopic.vue";
import GetTopic from "@/pages/Topic/GetTopic/GetTopic.vue";
import Topic from "@/pages/Topic/Topic.vue";
import ListForm from "@/pages/Topic/ListForm/ListForm.vue";

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
            }
        ]
    },
    {
        path: "/topic/setTopic",
        component: SetTopic,
    },
    {
        path: "/topic/getTopic",
        component: GetTopic,
    },
];