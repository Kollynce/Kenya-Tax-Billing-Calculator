<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    :class="props.class"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
</template>

<script>
export default {
  name: 'CheckIcon',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return { props }
  }
}
</script>