<template>
  <div>
    <q-input
      @input="val => { files = val }"
      multiple
      filled
      type="file"
      accept="video/*,audio/*"
      hint="Native file (multiple)"
      class="my-input-file"
    />
  </div>
</template>

<script>
export default {
  name: 'FileInput',
  data() {
    return {
      files: null
    }
  },
  watch: {
    files(val, old) {
      if (val && val !== old) {
        this.$emit('input', val)
      }
    }
  },
  created() {

  },
  destroyed() {

  }
}
</script>
<style scoped lang="sass">
  .my-input-file
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    opacity: 0
    filter: alpha(opacity=0)
    cursor: pointer

</style>
