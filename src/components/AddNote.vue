<template>
  <div>
    <div id="note-form">
      <div class="form-inner">
        <span>Название</span>
        <input id="add-input" type="text" v-model="title" @keyup.enter="onSubmit" />
        <span>Задачи:</span>
        <ul>
          <li v-for="(point, index) in points" :key="index" :point="point">
            {{"- " + point.text}}
            <button class="remove-point" @click="removePoint(point)">&#8722;</button>
          </li>
          <input type="text" v-model="punct" @keyup.enter="addPoint" />
          <button class="add-point" type="button" @click="addPoint">&#43;</button>
        </ul>
      </div>
      <div>
        <button id="add-button" type="button" @click="createNote">Добавить</button>
        <button id="add-button" type="button" @click="addCancel">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //элемент для записи названия заметки
      title: "",
      //элемент для записи задачи
      punct: "",
      //массив для списка задач
      points: []
    };
  },
  methods: {
    //если поле с названием заметки не пустое, создать новую заметку
    createNote() {
      if (this.title.trim()) {
        const newNote = {
          id: Date.now(),
          title: this.title,
          points: this.points
        };
        //передать событие добавления заметки
        this.$emit("add-note", newNote);
        //очистить поля для записи
        this.title = "";
        this.punct = "";
        this.points = [];
      }
    },
    //если поле для записи задачи не пустое, создать новую задачу
    addPoint() {
      if (this.punct.trim()) {
        const newPoint = {
          text: this.punct,
          complited: false
        };
        //добавить в массив
        this.points.push(newPoint);
        //очистить поле
        this.punct = "";
      }
    },
    //удалить текущую задачу в форме для создания заметки
    removePoint(point) {
      this.points.splice(this.points.indexOf(point), 1);
    },
    //передать событие клик на кнопку "отмена"
    addCancel() {
      this.$emit("add-cancel");
      this.title = "";
      this.punct = "";
    }
  }
};
</script>

<style scoped>
#note-form {
  display: flex;
  background-color: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.form-inner {
  display: flex;
  flex-direction: column;
  flex: 2;
  align-self: center;
}

#note-form input {
  flex: 1;
  outline: none;
  transition: all 0.2s;
}

#note-form input:focus {
  border: 1px solid #1842ff;
}

#note-form button {
  margin-left: 10px;
}
#add-button {
  position: relative;
  top: 19px;
}

ul {
  position: relative;
}
.add-point {
  position: absolute;
  left: 200px;
  bottom: 0;
  font-size: 20px;
}
.remove-point {
  font-size: 20px;
}
ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
}

@media (max-width: 600px) {
  #note-form {
    flex-direction: column;
    align-items: center;
  }
}
</style>

