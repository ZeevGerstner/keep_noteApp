import keepApp from './pages/keep-app.cmp.js';
import keepList from './cmps/keep-list.cmp.js'
import editImg from './cmps/img-edit.cmp.js';
import editTxt from './cmps/txt-edit.cmp.js';

var routes = [
    {
        path: '/', component: keepApp, children: [
            { path: '', component: keepList },
            { path: '/keep/img/:noteId?', component: editImg },
            { path: '/keep/txt/:noteId?', component: editTxt },
        ]
    },
]

export default routes;
