<template>
  <tab>
    <tab-item v-for="(item, index) in columns" :selected="index === value" @on-item-click="onClick">
      {{item}}
    </tab-item>
  </tab>
</template>

<script>
  import { Tab, TabItem } from 'vux'

  export default {
    name: 'MpNavbar',
    components: {
      Tab,
      TabItem
    },
    props: {
      columns: {
        required: true,
        type: Array,
        default: () => []
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      onClick (index) {
        this.$emit('input', Number(index))
      }
    },
    mounted () {
    }
  }
</script>
