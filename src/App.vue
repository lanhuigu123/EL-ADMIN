<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <router-view />
</template>
<script lang="ts">
export default {
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const debounce = (callback: (...args: any) => void, delay: number) => {
      let tid: number
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return function (...args: any) {
        const ctx = self
        tid && clearTimeout(tid)
        tid = setTimeout(() => {
          callback.apply(ctx, args)
        }, delay)
      }
    }

    const _ = window.ResizeObserver
    window.ResizeObserver = class ResizeObserver extends _ {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(callback: (...args: any) => void) {
        callback = debounce(callback, 20)
        super(callback)
      }
    }
  }
}
</script>
<style></style>
