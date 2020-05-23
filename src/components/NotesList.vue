<template>
  <div>
    <ul id="note-list">
      <!-- компонент заметки -->
      <note-item v-for="(note, i) in notes" :key="i" :note="note" @remove-note="removeNote" />
    </ul>
  </div>
</template>

<script>
import NoteItem from "@/components/NoteItem.vue";

export default {
  components: {
    NoteItem
  },
  //принимаем данные с массивом заметок
  props: ["notes"],

  methods: {
    //передать родительскому компоненту событие клика на кнопку "удалить"
    removeNote(id) {
      this.$emit("remove-note", id);
    }
  }
};
</script>

