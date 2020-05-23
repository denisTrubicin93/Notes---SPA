<template>
  <li>
    <div class="row">
      <div class="task-point" v-if="visible">
        <label class="title" :class="{active: point.complited}">
          <input class="checkbox" type="checkbox" disabled :checked="point.complited" />
          {{point.text}}
        </label>
      </div>
      <div class="task-point" v-else>
        <label class="title">
          <input
            class="text-edit"
            type="text"
            :placeholder="point.text"
            @keyup.enter="visible=!visible"
            v-model="point.text"
          />
        </label>
        <button @click="visible=!visible">Ок</button>
      </div>
      <div class="buttons-todo">
        <button
          class="fas fa-check-circle icon"
          @click="toChecked(point.complited, point.id), editing()"
        ></button>
        <button class="fas fa-edit icon" @click="visible=!visible, editing()"></button>
        <button class="fas fa-minus-circle icon" @click="$emit('delete-point', point), editing()"></button>
        <button class="fas fa-plus-circle icon" @click="add=true"></button>
      </div>
    </div>

    <div class="new-task" v-if="add">
      <label class="title">
        <input
          class="text-edit"
          type="text"
          placeholder="Новая задача"
          v-model="addTask"
          @keyup.enter="addPoint(), add=false, editing()"
        />
      </label>
      <button @click="addPoint(), add=false, editing()">Ок</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    point: Object,
    note: Object,
    editNote: Array
  },
  data() {
    return {
      //показать/скрыть поле для редактирования текста задачи
      visible: true,
      //показать/скрыть поле новой задачи
      add: false,
      //записывать текст для новой задачи
      addTask: ""
    };
  },
  methods: {
    //отмечать выполненную задачу
    toChecked(comp) {
      if (this.point) {
        this.point.complited = !comp;
      }
    },
    //добавить новую задачу
    addPoint() {
      //если поле для ввода задачи не пустое, создать новую задачу
      if (this.addTask.trim()) {
        const newTask = {
          text: this.addTask,
          complited: false
        };
        //и записать в массив
        this.note.points.push(newTask);
      }
    },
    //передать событие изменений в заметке
    editing() {
      //если поле новой заметки не пустое, значит фиксировать изменение
      this.$emit("editing");
    }
  }
};
</script>

<style scoped>
.active {
  color: #1842ff;
  text-decoration: line-through;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
}
.task-point {
  flex: 1;
}
.buttons-todo {
  display: flex;
  flex: 1;
}
.buttons-todo .fa-plus-circle {
  display: none;
}
li:last-child .buttons-todo .fa-plus-circle {
  display: block;
}
.new-task {
  display: block;
}

@media (max-width: 700px) {
  li {
    margin: 20px 0;
  }
}
</style>