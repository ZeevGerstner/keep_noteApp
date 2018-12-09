export default {
  template: `
          <section class="keep-nav flex space-between">
            <router-link tag="h2" to="/" class="keep-nav-logo">Keep List</router-link>
            <div class="filter-container">
            <select v-model="filter.byType" @change="setFilter">
              <option value="all">All</option>
              <option value="imgNote">Images</option>
              <option value="txtNote">Notes</option>
            </select>

            <input type="text" @input="setFilter" v-model="filter.byTxt" placeholder="Search"/>
            </div>
            <div class="add-container">   
            <router-link to="/keep/txt">
                <i class="fas fa-pencil-alt nav-item"></i>
                </router-link>
            
                <router-link to="/keep/img">               
                <i class="far fa-images nav-item"></i>
                </router-link> 
                </div>
          </section>
      `,
  data () {
    return {
      isShow: false,
      filter: {
        byTxt: '',
        byType: 'all'
      }
    }
  },
  methods: {
    setFilter () {
      this.$emit('setFilter', { ...this.filter })
    },
  }
}
