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
      el.style.opacity = 0;
      el.style.transform = 'translateY(10px)';
    },
    enter(el, done) {
      setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.3s ease-in-out';
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
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    },
    leave(el, done) {
      setTimeout(() => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(-10px)';
        el.style.transition = 'all 0.2s ease-in-out';
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
  transition: opacity 0.3s, transform 0.3s;
}
</style>