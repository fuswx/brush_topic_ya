import Home from "@/pages/Home/Home.vue";
import Topic from "@/pages/Topic/Topic.vue";
import SetTopic from "@/pages/Topic/SetTopic/SetTopic.vue";

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
        children:[
            {
                path: 'setTopic',
                component: SetTopic
            }
        ]
    }
];