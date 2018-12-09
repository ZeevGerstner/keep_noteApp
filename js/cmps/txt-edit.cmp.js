import { keepService } from '../service/keep-service.js';

export default {
  template: `
    <section v-if="note" class="edit-txt-container flex " :style="getColors">
          <label>
            <input class="edit-title" type="text" v-model="note.data.title">
          </label>
          <label>
            <textarea cols="30" rows="10" v-model="note.data.txt" ></textarea>
          </label>
          <div class="btn-colors">
              <label class="btn-colors-bgc">
              <i class="fas fa-fill-drip"></i>
                  <input type="color" v-model="note.data.backgroundColor" >
                </label>
                <label >
                <i class="fas fa-brush"></i>
                  <input type="color" v-model="note.data.color">
                </label>
          </div> 
        <div class="edit-btn-container">
          <button @click="saveNote">Save</button>
          <button @click="backToList">Cancel</button>
        </div>
    </section>
    `,
  data () {
    return {
      note: {
        type: 'txtNote',
        data: {
          id: '',
          time: moment().format('MMMM Do YYYY, h:mm:ss a'),
          txt: 'Enter text',
          title: 'Enter title',
          isPinned: false,
          color: '',
          backgroundColor: ''
        }
      }
    }
  },
  created () {
    const noteId = this.$route.params.noteId
    if (noteId) {
      keepService.getNoteById(noteId).then(note => {
        this.note = note
      })
    }
  },
  methods: {
    saveNote () {
      keepService.saveNote(this.note)
      this.backToList()
    },
    backToList () {
      this.$router.push('/')
    }
  },
  computed: {
    getColors () {
      return {
        color: this.note.data.color,
        backgroundColor: this.note.data.backgroundColor
      }
    }
  }
}
