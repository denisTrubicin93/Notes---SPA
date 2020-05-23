<template id="dialog">
  <transition name="fade">
    <div>
      <div class="dialog">
        <div class="dialog-overlay" @click="close()"></div>
        <div class="dialog-content">
          <div class="dialog-body">
            <slot></slot>
          </div>
          <div class="dialog-footer">
            <button class="btn" @click="onCancel()">Нет</button>
            <button class="btn btn-ok" @click="onConfirm()">Да</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    //закрыть диалоговое окно
    close() {
      this.$emit("close");
    },
    //отмена действия и закрытие диалогового окна
    onCancel() {
      this.close();
    },
    //подтверждение действия и закрытие диалогового окна
    onConfirm() {
      this.close();
      this.$emit("on-confirm");
    }
  }
};
</script>


<style scoped>
.dialog-overlay {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}

.dialog-content {
  position: fixed;
  z-index: 13;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  text-align: center;
  border-radius: 2px;
  width: 70%;
  max-width: 250px;
}

.dialog-body {
  padding: 20px;
  font-size: 20px;
  background: #748dff;
  color: #0f1102;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
}

.dialog-footer {
  position: relative;
  line-height: 42px;
  font-size: 15px;
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
  width: 100%;
  height: 40px;
}

.dialog-footer:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #d5d5d6;
  color: #d5d5d6;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}

.btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex: 1;
  border-left: 1px solid #d5d5d6;
  font-size: 1rem;
  line-height: 30px;
  display: inline-block;
  height: 32px;
  padding: 0 15px;
  text-align: center;
  text-decoration: none;
  background-color: transparent;
  color: #1842ff;
  border-radius: 3px;
  outline: 0;
  transition: box-shadow 0.1s ease-out, background-color 0.1s ease-out,
    border-color 0.1s ease-out, color 0.1s ease-out;
  border: none;
  cursor: pointer;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.btn-ok {
  font-weight: 700;
}

.btn:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.btn:first-child {
  border-bottom-left-radius: 2px;
  border-left: none;
}
</style>