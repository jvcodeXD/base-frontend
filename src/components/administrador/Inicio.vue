<template>
  <div>
    <div>Home administrador {{ time }}</div>
    <div class="clock">
      <div class="hand hour" :style="hourHandStyle"></div>
      <div class="hand minute" :style="minuteHandStyle"></div>
      <div class="hand second" :style="secondHandStyle"></div>
      <div class="center"></div>
    </div>
  </div>
</template>
<style scoped>
.clock {
  position: relative;
  width: 200px;
  height: 200px;
  border: 5px solid black;
  border-radius: 50%;
  margin: 50px auto;
}

.hand {
  position: absolute;
  width: 50%;
  height: 2px;
  background: black;
  top: 50%;
  transform-origin: 100%;
  transform: rotate(90deg);
}

.hour {
  height: 4px;
  background: black;
}

.minute {
  height: 3px;
  background: black;
}

.second {
  height: 2px;
  background: red;
}

.center {
  position: absolute;
  width: 10px;
  height: 10px;
  background: black;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
<script>
export default {
  name: 'Inicio',
  data() {
    return {
      hourHandStyle: {},
      minuteHandStyle: {},
      secondHandStyle: {},
      time: this.getCurrentTime(),
    }
  },
  methods: {
    updateClock() {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      const hoursDeg = (hours % 12) * 30 + (minutes / 60) * 30
      const minutesDeg = minutes * 6 + (seconds / 60) * 6
      const secondsDeg = seconds * 6

      this.hourHandStyle = { transform: `rotate(${hoursDeg}deg)` }
      this.minuteHandStyle = { transform: `rotate(${minutesDeg}deg)` }
      this.secondHandStyle = { transform: `rotate(${secondsDeg}deg)` }
    },
    getCurrentTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      return `${hours}:${minutes}:${seconds}`
    },
  },
  mounted() {
    this.updateClock()
    this.interval = setInterval(() => {
      this.time = this.getCurrentTime()
      this.updateClock()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>
