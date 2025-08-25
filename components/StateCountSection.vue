<template>
  <section  class="stats-hero" :style="{ '--bg-url': `url(${backgroundUrl})` }" aria-label="Key stats over hero image">
    <div class="stats-layer">
      <div v-for="(s, i) in stats" :key="i" class="stat" :style="posStyle(s)">
        <div class="ring outer"></div>
        <div class="ring inner"></div>
        <div class="circle">
          <div class="value">{{ s.value }}</div>
          <div class="label">
            <div v-for="(line, j) in splitLabel(s.label)" :key="j">{{ line }}</div>
          </div>
        </div>
        <i class="accent-dot" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  backgroundUrl: { type: String, default: '/images/state.png' },
  size: { type: Number, default: 220 },
  stats: {
    type: Array as () => Array<{
      value: string
      label: string
      x: number
      y: number
    }>,
    default: () => ([
      { value: '80+',     label: 'Active Estates',           x: 35, y: 25 },
      { value: '$500M+',  label: 'Export Value',             x: 65, y: 25 },
      { value: '1500+',   label: 'Registered\nFarmers',      x: 20, y: 63 },
      { value: '20+',     label: 'Agricultural\nCrops Grown',x: 50, y: 63 },
      { value: '30+',     label: 'Export Countries',         x: 80, y: 63 },
    ]),
  },
})
function posStyle(s: { x: number; y: number }) {
  return {
    left: `${s.x}%`,
    top: `${s.y}%`,
    '--size': `${props.size}px`,
  }
}
function splitLabel(label: string) {
  return label.split('\n')
}
</script>
<style scoped>
.stats-hero{
  position: relative;
  width: 100%;
  min-height: 680px;
  background-image: var(--bg-url);
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
  overflow: hidden;
  margin-top: 50px;
  margin-bottom: 50px;
}
.stats-layer{
  position: relative;
  width: 100%;
  height: 100%;
}
.stat{
  position: absolute;
  transform: translate(-50%, -50%);
  width: var(--size);
  height: var(--size);
}
.circle{
  position: absolute;
  inset: 12px;
  border-radius: 9999px;
  background: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-on-secondary));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 18px;
  box-shadow: 0 10px 28px var(--v-theme-card-shadow, rgba(0,0,0,.15));
}
.value{
  font-weight: 700;
  letter-spacing: .2px;
  font-size: clamp(24px, 3.4vw, 40px);
  line-height: 1.1;
  margin-bottom: 6px;
}
.label{
  font-size: clamp(14px, 1.4vw, 20px);
  opacity: .9;
}
.ring{
  position: absolute;
  border-radius: 9999px;
  border: 3px solid transparent;
}
.ring.outer{ inset: -10px; border-color: rgba(var(--v-theme-circle-ring), .48); }
.ring.inner{ inset: -20px; border-color: rgba(var(--v-theme-circle-ring), .32); }
.accent-dot{
  position: absolute;
  right: -10px;
  bottom: 22%;
  width: 10px; height: 10px; border-radius: 9999px;
  background: rgb(var(--v-theme-dot-active, var(--v-theme-success)));
  box-shadow: 0 0 0 6px rgba(var(--v-theme-dot-active, var(--v-theme-success)), .15);
}
@media (max-width: 1280px){ .stat{ --size: 200px; } }
@media (max-width: 960px) { .stat{ --size: 180px; } }
@media (max-width: 680px) { .stat{ --size: 150px; } .value{ font-size: 28px; } }
</style>
