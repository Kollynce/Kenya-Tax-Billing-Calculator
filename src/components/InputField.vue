<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-kenya-red">*</span>
    </label>
    <div class="relative">
      <template v-if="type === 'textarea'">
        <textarea
          :id="id"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled"
          :rows="rows"
          class="input-base input-textarea"
          :class="{ 'input-error': error }"
        ></textarea>
      </template>
      <template v-else>
        <input
          :id="id"
          :type="type"
          :value="modelValue"
          @input="handleInput"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled"
          :min="min"
          :max="max"
          :step="step"
          :autocomplete="autocomplete"
          class="input-base input-field"
          :class="{ 'input-error': error }"
        />
      </template>
      <div v-if="helpText" class="mt-1 text-sm text-gray-500">
        {{ helpText }}
      </div>
      <div v-if="error" class="mt-1 text-sm text-kenya-red">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    helpText: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 3
    },
    min: {
      type: [Number, String],
      default: undefined
    },
    max: {
      type: [Number, String],
      default: undefined
    },
    step: {
      type: [Number, String],
      default: undefined
    },
    autocomplete: {
      type: String,
      default: undefined
    }
  },
  methods: {
    handleInput(event) {
      let value = event.target.value;
      if (this.type === 'number' && value !== '') {
        value = Number(value);
      }
      this.$emit('update:modelValue', value);
    }
  }
};
</script>

<style scoped>
.input-base {
  @apply w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-offset-0 transition duration-150 ease-in-out;
}

.input-field {
  @apply focus:ring-kenya-green focus:border-kenya-green;
}

.input-textarea {
  @apply focus:ring-kenya-green focus:border-kenya-green;
}

.input-error {
  @apply border-kenya-red focus:ring-kenya-red focus:border-kenya-red;
}
</style>