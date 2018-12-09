import { keepService } from '../service/keep-service.js';
import editImg from '../cmps/keep/img-edit.cmp.js';

export default {
    template: `
            <section v-if="note">
                <component 
                            :is="note.type" 
                            :note="note">
                </component>
           </section>
        `,
    data () {
        return {
            note: null,
        }
    },
    created () {
        keepService.getNoteById(`${this.$route.params.noteId}`)
            .then(note => {
                this.note = note
            })
    },
    comments: {
        editImg
    },
}