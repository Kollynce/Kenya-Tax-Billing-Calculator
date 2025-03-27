<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <div class="relative">
      <input
        :id="id"
        :type="actualType"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'input-field',
          error ? 'input-error' : '',
          disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : '',
          rounded ? 'rounded-lg' : 'rounded-none'
        ]"
        @input="handleInput"
        @blur="handleBlur"
      />
      <div v-if="error" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

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
    error: {
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
    formatNumber: {
      type: Boolean,
      default: false
    },
    decimalPlaces: {
      type: Number,
      default: 2
    }
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    
    // Format number with commas
    const formatWithCommas = (value) => {
      if (value === '' || value === null || value === undefined) return '';
      
      // Remove existing commas first
      let plainValue = String(value).replace(/,/g, '');
      
      // Handle decimal places
      let parts = plainValue.split('.');
      let wholePart = parts[0];
      let decimalPart = parts.length > 1 ? parts[1] : '';
      
      // Format with commas for thousands
      let formattedWhole = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
      // Add decimal part back if needed
      if (props.decimalPlaces > 0 && parts.length > 1) {
        // Truncate or pad decimal places
        decimalPart = decimalPart.padEnd(props.decimalPlaces, '0').slice(0, props.decimalPlaces);
        return `${formattedWhole}.${decimalPart}`;
      }
      
      return formattedWhole;
    };
    
    // Display formatted value
    const displayValue = computed(() => {
      if (props.formatNumber && inputValue.value !== '') {
        return formatWithCommas(inputValue.value);
      }
      return inputValue.value;
    });

    // For formatted numbers, we'll always use text input
    // This prevents browser validation issues with the comma separators
    const actualType = computed(() => {
      return props.formatNumber ? 'text' : props.type;
    });
    
    // Handle input changes
    const handleInput = (event) => {
      let newValue = event.target.value;
      
      if (props.formatNumber) {
        // Store the raw value (without commas) in the model
        let rawValue = newValue.replace(/,/g, '');
        
        if (props.type === 'number' && rawValue !== '') {
          // Ensure it's a valid number
          if (!/^-?\d*\.?\d*$/.test(rawValue)) {
            return;
          }
        }
        
        // Update the internal value
        inputValue.value = rawValue;
        
        // Emit the raw value
        emit('update:modelValue', rawValue);
        emit('input', rawValue);
      } else {
        // For non-formatted fields, just pass through
        inputValue.value = newValue;
        emit('update:modelValue', newValue);
        emit('input', newValue);
      }
    };

    // Handle blur event - reformat the value on blur
    const handleBlur = () => {
      if (props.formatNumber && inputValue.value !== '') {
        // Emit the same value to trigger the formatter
        emit('update:modelValue', inputValue.value);
      }
    };
    
    // Update local value when prop changes
    watch(() => props.modelValue, (newValue) => {
      inputValue.value = newValue;
    });
    
    return {
      inputValue,
      displayValue,
      actualType,
      handleInput,
      handleBlur
    };
  }
};
</script>

<style scoped>
.input-field {
  @apply w-full rounded-md border-gray-300 shadow-sm transition-colors duration-200;
}

.input-field:focus {
  @apply border-green-600 ring-2 ring-green-600 ring-opacity-50 outline-none;
}

.input-error {
  @apply border-red-300;
}

.input-error:focus {
  @apply border-red-500 ring-red-500;
}
</style>