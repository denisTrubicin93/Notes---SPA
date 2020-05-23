<template >
  <div class="change">
    <div class="note-title">
      <p>{{note.title}}</p>
      <div class="buttons">
        <button class="fas fa-save icon" @click="saveNote()"></button>
        <button class="fas fa-reply icon" @click="editReply()"></button>
        <button class="fas fa-undo-alt icon" @click="openEditModal()"></button>
        <button class="fas fa-share icon" @click="editUp()"></button>
        <button class="fas fa-trash-alt icon" @click="openDelModal()"></button>
      </div>
    </div>

    <ul class="point">
      <!-- компонент "одна задача" -->
      <note-list-item
        v-for="(point, index) in note.points"
        :key="index"
        :point="point"
        :note="note"
        :editNote="editNote"
        @delete-point="deletePoint(point)"
        @editing="editing()"
      />
      <!-- поле добавить задачу, если список задач пуст -->
      <div class="new-task" v-if="add">
        <label class="title">
          <input
            class="text-edit"
            type="text"
            placeholder="Новая задача"
            v-model="addTask"
            @keyup.enter="addPoint(), add=false"
          />
        </label>
        <button @click="addPoint(), add=false">Ок</button>
      </div>
    </ul>
    <!-- диалоговое окно "Удалить заметку?" -->
    <Modal v-show="modalDelActive" @close="closeModal()" @on-confirm="deleteNote(note.id)">
      <slot>Удалить заметку?</slot>
    </Modal>
    <!-- диалоговое окно "Отменить изменения?" -->
    <Modal v-show="modalEditActive" @close="closeModal()" @on-confirm="updateNote(note.id)">
      <slot>Отменить изменения?</slot>
    </Modal>
  </div>
</template>

<script>
import NoteListItem from "@/components/ChangeNoteItem.vue";
import NoteService from "@/noteService.js";
import Modal from "@/components/Modal.vue";

export default {
  name: "ChangeNote",
  components: {
    NoteListItem,
    Modal
  },
  data() {
    return {
      //переменная которая принимает данные заметки
      note: this.$route.params.Nid,
      //показать/скрыть поле для новой задачи
      add: false,
      //сюда записываем название новой задачи
      addTask: "",
      //массив в который будем сохранять изменения в заметке
      editNote: [],
      //переменная для массива, чтобы доставать нужный объект
      index: "",
      //показать/скрыть диалоговое окно
      modalDelActive: false,
      //показать/скрыть диалоговое окно
      modalEditActive: false
    };
  },
  created() {
    //записывать данные заметки при обновлении страницы
    this.note = JSON.parse(localStorage.note);
    //если список задач пуст, открываем поле для новой задачи
    if (this.note.points.length == 0) this.add = true;
  },
  methods: {
    //открыть диалоговое окно при клике на кнопку "удалить"
    openDelModal() {
      this.modalDelActive = true;
    },
    //открыть диалоговое окно при клике на кнопку "отменить редактирование"
    openEditModal() {
      //если массив с изменениями пустой выходим из метода
      if (this.editNote.length === 0) {
        return;
      }
      //иначе открыть диалоговое окно
      this.modalEditActive = true;
    },
    //закрыть диалоговое окно
    closeModal() {
      this.modalDelActive = false;
      this.modalEditActive = false;
    },
    //сохранить отредактированную заметку, передать данные и перейти на страницу заметок
    saveNote() {
      localStorage.setItem("note", JSON.stringify(this.note));
      this.$router.replace({
        name: "Notes",
        params: this.note
      });
      NoteService.$emit("saveNote", this.$route.params);
    },
    //удалить заметку и перейти на страницу заметок
    deleteNote(id) {
      NoteService.$emit("delete-note", id);
      this.$router.replace({
        name: "Notes",
        params: this.note
      });
    },
    //удалить задачу
    deletePoint(point) {
      this.note.points.splice(this.note.points.indexOf(point), 1);
      //если список задач пуст, открыть поле для новой задачи
      if (this.note.points.length == 0) this.add = true;
    },
    //добавить новую задачу
    addPoint() {
      //если поле для новой задачи не пустое, создаем задачу
      if (this.addTask.trim()) {
        const newTask = {
          text: this.addTask,
          complited: false
        };
        //добавить в массив
        this.note.points.push(newTask);
        //очистить поле новой задачи
        this.addTask = "";
      }
    },
    //сохранить изменения заметки в массив
    editing() {
      //если переменная index пустая, добавить измененную заметку в массив и переменной index присвоить индекс этой заметки
      if (this.index === "") {
        localStorage.setItem("edit", JSON.stringify(this.note));
        this.editNote.push(JSON.parse(localStorage.edit));
        this.index = this.editNote.length - 1;
      } else {
        //если переменная index не равна последнему элементу в массиве, удалить элементы с конца до текущего значения index
        if (-1 < this.index < this.editNote.length - 2) {
          this.editNote.pop();
        } else {
          //иначе добавить измененную заметку в массив и переменной index присвоить индекс этой заметки
          localStorage.setItem("edit", JSON.stringify(this.note));
          this.editNote.push(JSON.parse(localStorage.edit));
          this.index = this.editNote.length - 1;
        }
      }
    },
    //отменить действие
    editReply() {
      //при отмене действий поле новой заметки всегда скрыто
      this.add = false;
      //если список задач пуст, перезаписать данные заметки на предыдущие и переменную index уменьшить на 1
      if (this.note.points.length == 0) {
        this.note = this.editNote[this.index - 1];
        this.index--;
      } else {
        //если переменная index больше индекса первого элемента, перезаписать данные заметки на предыдущие и переменную index уменьшить на 1
        if (this.index > 0) {
          this.note = this.editNote[this.index - 1];
          this.index--;
        } else {
          //если переменная index равна индексу первого элемента, перезаписать данные заметки на начальные и очистить массив и индекс
          if (this.index === 0) {
            this.note = JSON.parse(localStorage.note);
            this.index = "";
            this.editNote = [];
          }
        }
      }
    },
    //вернуть действие
    editUp() {
      //если переменная index меньше индекса последнего элемента, перезаписать изменения вперед и index увеличить на 1
      if (this.index < this.editNote.length - 1) {
        this.note = this.editNote[this.index + 1];
        this.index++;
        //если список задач пуст, показать поле новой задачи
        if (this.note.points.length == 0) this.add = true;
      }
    },
    //отменить редактирование
    updateNote() {
      //скрыть поле новой задачи
      this.add = false;
      //перезаписать начальные данные в заметку
      this.note = JSON.parse(localStorage.note);
      //очистить index и массив с изменениями
      this.index = "";
      this.editNote = [];
    }
  }
};
</script>

<style scoped>
.change {
  position: absolute;
  max-width: 700px;
  width: 100%;
  overflow: hidden;
}
.note-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgb(51, 51, 51);
}
.buttons {
  display: flex;
}
p {
  padding-left: 20px;
  font-size: 20px;
  font-weight: 900;
  color: #1842ff;
}
.point {
  padding: 20px;
}

@media (max-width: 700px) {
  .note-title {
    flex-direction: column;
  }
  p {
    align-self: flex-start;
  }
  .buttons {
    align-self: flex-end;
  }
}
</style>