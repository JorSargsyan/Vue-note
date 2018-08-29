//Version with EventBus AND WITHOUT VUEX


// const EventBus =  new Vue();

// const inputComponent = {
//    template: `<input 
//    class="input is-small" 
//    :placeholder="placeholder" 
//    type="text"
//    v-model="input"
//    @keyup.enter = 'monitorEnterKey' />`,
//    props: ['placeholder'],
//    data(){
//      return {
//        input : ""
//      }
//    },
//    methods: {
//      monitorEnterKey(){
//        EventBus.$emit("add-note",{
//          note: this.input,
//          timestamp : new Date().toLocaleString()
//        });
//        this.input= "";
//      }
//    }
//    }

//    const noteCountComponent = {
//      template : `<div class='note-count'>Note Count : <strong>{{noteCount}}</strong></div>`,
//     data(){
//       return {
//         noteCount : 0
//       }
//     },
//     created(){
//       EventBus.$on('add-note',event=>this.noteCount++);
//     }
//    }


// new Vue(
//   { 
//   el: '#app',
//   data:{
//     notes :[],
//     timestamps: [],
//     placeholder : "Enter a Note"
//   },
//   methods:{
//     addNote(event){
//       this.notes.push(event.note);
//       this.timestamps.push(event.timestamp)
//     }
//   },
//   components: {
//      'input-component': inputComponent,
//      'note-count-component': noteCountComponent
//   },
//   created(){
//     EventBus.$on('add-note',event => this.addNote(event));
//   }

// }
// )



//VERSION WITH VUEX AND STORE


const state = {
  notes: [],
  timestamps :[]
}

const mutations = {
  ADD_NOTE(state,payload){
    let newNote = payload;
    state.notes.push(newNote);
  },
  ADD_TIMESTAMP(state,payload){
    let newTimeStamp = payload;
    state.timestamps.push(newTimeStamp);
  }
}

const actions = {
  addNote(context,payload){
    context.commit("ADD_NOTE",payload);
  },
  addTimeStamp(context,payload){
    context.commit("ADD_TIMESTAMP",payload);
  }
}


const getters = {
  // getNotes(state){
  //   return state.notes;
  // },
  getNotes : state => state.notes,
  getTimeStamps : state => state.timestamps,
  getNoteCount : state => state.notes.length

}


const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})



const inputComponent = {
  template : `<input
   placeholder='Enter a note'
    v-model="input"
     @keyup.enter="monitorEnterKey"
      class="input is-small" type="text" />`,
      data(){
        return{
          input :''
        }
      },
      methods:{
        monitorEnterKey(){
          this.$store.dispatch('addNote',this.input);
          this.$store.dispatch('addTimeStamp',new Date().toLocaleString());
          this.input = '';
        }
      } 
}


const noteCountComponent = {
  template : `<div class="note-count"> Note count: <strong>{{ noteCount }}</strong> </div>`,
  computed :  {
    noteCount(){
      return this.$store.getters.getNoteCount;
    }
  }
}

new Vue({
  el:"#app",
  store,
  components:{
    'input-component':inputComponent,
    'note-count-component':noteCountComponent
  },
  computed: {
    notes(){
      return this.$store.getters.getNotes;
    },
    timestamps(){
      return this.$store.getters.getTimeStamps;
    }
  }
})