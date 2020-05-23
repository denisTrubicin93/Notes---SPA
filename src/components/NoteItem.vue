<template>
  <li class="note-item">
    <p>{{note.title}}</p>
    <div class="point" v-for="(point, index) in note.points" :key="index">
      <label class="title" :class="{active: point.complited}">
        <input class="checkbox" type="checkbox" disabled :checked="point.complited" />
        {{point.text}}
      </label>
    </div>
    <div class="buttons">
      <button class="edit" @click="goToChange(note)">Изменить</button>
      <button class="delete" @click="openModal()">Удалить</button>
      <!-- диалоговое окно  "Удалить заметку?"-->
      <Modal v-show="modalActive" @close="closeModal()" @on-confirm="onConfirm(note.id)">
        <slot>Удалить заметку?</slot>
      </Modal>
    </div>
  </li>
</template>



<script>
import Modal from "@/components/Modal.vue";
import NoteService from "@/noteService.js";

export default {
  components: {
    Modal
  },
  //принимаем заметки из массива
  props: {
    note: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      modalActive: false
    };
  },
  methods: {
    //открыть диалоговое окно
    openModal() {
      this.modalActive = true;
    },
    //закрыть диалоговое окно
    closeModal() {
      this.modalActive = false;
    },
    //передать событие клик на кнопке "изменить"
    goToChange(id) {
      NoteService.$emit("toChange", id);
    },
    //подтвердить клик на кнопку "удалить"
    onConfirm(id) {
      this.$emit("remove-note", id);
    }
  }
};
</script>

<style  scoped>
p {
  align-self: flex-start;
  font-size: 18px;
  font-weight: 700;
}
.note-item .point {
  align-self: flex-start;
}
.buttons {
  align-self: flex-end;
}
.active {
  color: #1842ff;
  text-decoration: line-through;
}
</style>