import keepNav from '../cmps/keep-navbar.cmp.js'
import keepList from '../cmps/keep-list.cmp.js';
import eventBus, { SET_FILTER } from '../service/event-bus.js'

export default {

    template: `
    <section>
        <keep-nav @setFilter="setFilter"></keep-nav>
        <router-view></router-view>
    </section>
    `,
    data () {
        return {
            filter: null
        }
    },
    methods: {
        setFilter (filter) {
            this.filter = filter
            eventBus.$emit(SET_FILTER, filter)
        }
    },
    created () {

    },
    components: {
        keepNav,
        keepList
    }
}