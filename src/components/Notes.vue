<template>
  <div id="notes">
    <header>
      <h1>Заметки</h1>
    </header>
    <!-- компонент "список заметок" -->
    <notes-list :notes="notes" @remove-note="removeNote" />
    <!-- компонент "добавить заметку" -->
    <add-note @add-note="addNote" @add-cancel="addCancel" v-show="formActive" />
    <button class="add-note" v-show="buttonAddNote" @click="showAddNote">Добавить заметку</button>
  </div>
</template>

<script>
import NotesList from "@/components/NotesList.vue";
import AddNote from "@/components/AddNote.vue";
import NoteService from "@/noteService.js";

export default {
  name: "Notes",
  components: {
    NotesList,
    AddNote
  },
  data() {
    return {
      //показывает/скрывает поля для добавления заметки
      formActive: false,
      //показывает/скрывает кнопку "добавить заметку"
      buttonAddNote: true,
      //массив заметок
      notes: []
    };
  },
  created() {
    //слушать событие клик на кнопку изменить и вызвать соответствующий метод
    NoteService.$on("toChange", note => {
      this.toChange(note);
    });
    //слушать событие клик на кнопку "удалить" и вызвать соответствующий метод
    NoteService.$on("delete-note", note => {
      this.removeNote(note);
    });
  },
  async mounted() {
    //выводить измененные заметки
    const data = await localStorage.getItem("notes");
    data ? (this.notes = JSON.parse(data)) : null;
    //слушать событие клик на кнопку сохранить на странице редактирования
    NoteService.$on("saveNote", note => {
      this.addNoteEdit(note);
    });
  },
  methods: {
    //удалить заметку при клике на кнопку "удалить" и сохранить изменения в заметках
    removeNote(id) {
      this.notes = this.notes.filter(t => t.id !== id);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    //заменить в массиве отредактированную заметку и сохранить изменения
    addNoteEdit(note) {
      this.notes = this.notes.map(obj => {
        if (obj.id === note.id) {
          return note;
        }
        return obj;
      });
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    //добавить новую заметку и сохранить изменения
    addNote(note) {
      this.notes.push(note);
      this.formActive = false;
      this.buttonAddNote = true;
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    //при клике на кнопку "добавить заметку" открыть поле для добавления и скрыть кнопку
    showAddNote() {
      this.formActive = true;
      this.buttonAddNote = false;
    },
    //закрыть поля для добавления заметки
    addCancel() {
      this.formActive = false;
      this.buttonAddNote = true;
    },
    //при клике на кнопку "изменить" записывать данные текущей заметки и передать на страницу редактирования
    toChange(note) {
      localStorage.setItem("note", JSON.stringify(note));
      this.$router
        .push({
          name: "ChangeNote",
          params: { Nid: note, id: note.id }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
#notes {
  overflow: hidden;
  position: absolute;
  max-width: 700px;
  width: 100%;
}
</style>
