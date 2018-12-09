import { keepService } from '../service/keep-service.js';

export default {
  props: ['data'],
  template: `
            <section class="txt-note" :style="getColors">
              <router-link  :to="'/keep/txt/'+data.id">
                    <div>
                    <p class="note-title">{{data.title}}</p>
                    <p  class="note-txt-txt" v-html="data.txt" :style="getColors">{{data.txt}}</p>
                    </div>
                </router-link>
                    <div class="txt-note-btn-container">
                        <i class="fas fa-thumbtack" @click.stop="saveNote" :class="isPinnedValid"></i>                              
                        <i class="fa fa-trash" aria-hidden="true" @click.stop="deleteNote(data.id)"></i>
                    </div>
            </section>

`,
  methods: {
    deleteNote (noteId) {
      this.$emit('deleteNote', noteId)
    },
    saveNote () {
      this.data.isPinned = !this.data.isPinned;
      keepService.saveNote({ data: this.data, type: 'txtNote' })
    }
  },
  computed: {
    isPinnedValid () {
      if (this.data.isPinned) return 'pinned'
    },
    getColors () {
      return {
        color: this.data.color,
        backgroundColor: this.data.backgroundColor
      }
    }
  }
}
