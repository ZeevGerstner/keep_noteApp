import eventBus, { SET_FILTER } from '../service/event-bus.js';
import { keepService } from '../service/keep-service.js';
import imgNote from './img-note.cmp.js';
import txtNote from './txt-note.cmp.js';

export default {
  template: `
    <section>
        <section class="note-container">
            <transition-group name="fade">
              <component class="note-item flex" v-for="(note, idx) in pinnedNotes" 
                      :is="note.type" 
                      :data="note.data"
                      @deleteNote="deleteNote"
                      :key="note.data.id">    
              </component>
          </transition-group> 
        </section>
        <section class="note-container">
        <transition-group name="fade">
            <component class="note-item flex" v-for="(note, idx) in unPinnedNotes" 
            :is="note.type" 
            :data="note.data"
            @deleteNote="deleteNote"
            :key="note.data.id">    
          </component>
        </transition-group>         
    </section>
</section>
`,
  data () {
    return {
      notes: null
    }
  },
  methods: {
    deleteNote (noteId) {
      var confirm = window.confirm('Are you sure?');
      if (!confirm) return
      keepService.deleteNote(noteId).then(notes => {
        this.notes = notes
      })
    }
  },
  created () {
    keepService.quary().then(notes => {
      this.notes = notes;
    })
    eventBus.$on(SET_FILTER, filter => {
      keepService.quary(filter).then(notes => {
        this.notes = notes;
      })
    })
  },
  computed: {
    unPinnedNotes () {
      if (!this.notes) return null;
      return this.notes.filter(note => !note.data.isPinned)
    },
    pinnedNotes () {
      if (!this.notes) return null
      return this.notes.filter(note => note.data.isPinned)
    }
  },
  components: {
    imgNote,
    txtNote
  }
}
