<template>
  <transition
    name="page"
    mode="out-in"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'PageTransition',
  methods: {
    beforeEnter(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
    },
    enter(el, done) {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        done();
      }, 50);
    },
    afterEnter(el) {
      el.style.transition = '';
    },
    enterCancelled(el) {
      el.style.transition = '';
    },
    beforeLeave(el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    },
    leave(el, done) {
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-25px)';
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        done();
      }, 50);
    },
    afterLeave(el) {
      el.style.transition = '';
    },
    leaveCancelled(el) {
      el.style.transition = '';
    }
  }
};
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  will-change: opacity, transform;
  transition: opacity 0.4s, transform 0.4s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(25px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}
</style>