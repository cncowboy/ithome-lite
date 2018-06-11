<template>
  <div
    class="weui-cell weui-cell_switch"
    v-if="isInCell"
  >
    <div class="weui-cell__bd">{{title}}</div>
    <div class="weui-cell__ft">
      <input type="checkbox" :disabled="disabled" class="weui-switch" v-model="myValue" :color="disabledColor" />
    </div>
  </div>

  <input type="checkbox" :disabled="disabled" class="weui-switch" v-model="myValue" :color="disabledColor" v-else />

</template>

<script>
  export default {
    name: 'MpSwitch',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Boolean,
        default: false,
      },
      isInCell: {
        type: Boolean,
        default: true,
      },
      title: String,
    },
    data () {
      return {
        myValue: this.value
      }
    },
    watch: {
      myValue (val) {
        this.$emit('input', Boolean(val))
      }
    },
    computed: {
      disabledColor() {
        return this.disabled ? 'rgba(0, 0, 0, 0.1)' : '';
      },
    },
  };
</script>
