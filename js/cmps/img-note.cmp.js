import { keepService } from '../service/keep-service.js';

export default {
  props: ['data'],
  template: `
            <section class="img-note" :style="getColors">
                <router-link tag="section"  :to="'/keep/img/'+data.id">
                    <img class="img-note-img" :src="data.url" :title="data.title" />
                    <div class="img-txt">
                            <p class="note-title">{{data.title}}</p>
                            <p class="img-txt-txt">{{data.txt}}</p>
                        </div>
                    </router-link>
                    <div class="img-note-btn-container">
                        <i class="fas fa-thumbtack" @click.stop="saveNote" :class="isPinnedValid"></i>
                        <i class="fa fa-trash" aria-hidden="true" @click.stop="deleteNote(data.id)"></i>
                    </div>
            </section>
`,
  methods: {
    deleteNote (noteId) {
      this.$emit('deleteNote', noteId);
    },
    saveNote () {
      this.data.isPinned = !this.data.isPinned;
      keepService.saveNote({ data: this.data, type: 'imgNote' })
    }
  },
  computed: {
    isPinnedValid () {
      if (this.data.isPinned) return 'pinned';
    },
    getColors () {
      return {
        color: this.data.color,
        backgroundColor: this.data.backgroundColor
      }
    }
  }
};
