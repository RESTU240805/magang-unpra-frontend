<template>
  <div v-html="sanitized"></div>
</template>

<script setup>
import { computed } from 'vue'
import DOMPurify from 'dompurify'

const props = defineProps({
  html: { type: String, default: '' },
})

const sanitized = computed(() => DOMPurify.sanitize(props.html, {
  ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'u', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'span', 'div', 'blockquote', 'pre', 'code', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'figure', 'figcaption', 'video', 'source', 'iframe'],
  ALLOWED_ATTR: ['src', 'href', 'alt', 'title', 'class', 'id', 'style', 'target', 'rel', 'width', 'height', 'frameborder', 'allowfullscreen', 'loading', 'data-'],
  ADD_URI_SAFE_WHEN_UNSAFE: true,
  ALLOW_DATA_ATTR: true,
}))
</script>
