<template>
  <div @click="doPicker" >
    <slot></slot>
  </div>
</template>

<script>
  import { picker, datePicker,  } from 'weui.js'
  export default {
    name: 'picker',
    props: {
      model: {
        type: String,
        default: 'selector',
      },
      value: [Number, String, Array],
      'range-key': String,
      range: {
        required: true,
        type: Array,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      bindchange: EventHandle,
      bindcancel: EventHandle,
      bindcolumnchange: EventHandle,
    },
    computed: {
      index() {
        return this.getIndex();
      },
    },
    methods: {
      doPicker () {
        const that = this
        if (this.model === 'selector') {
          picker(this.range, {
            defaultValue: this.value,
            onChange: function (result) {
              that.onChange(result)
            },
            onConfirm: function (result) {
              console.log(result)
            },
            onClose: () => {

            },
          })
        } else if (this.model === 'multiSelector') {
          picker(this.range, {
            defaultValue: this.value,
            onChange: function (result) {
              that.onChange(result)
            },
            onConfirm: function (result) {
              console.log(result)
            },
            onClose: () => {

            },
          })

        } else if (this.model === 'date') {
          const date  = new Date();
          const year  = date.getFullYear();
          const month = date.getMonth() + 1;
          const day   = date.getDate();
          datePicker({
            defaultValue: [year, month, day],
            onConfirm   : function (result) {
              let date = result.join('/');
            },
            id: 'datePicker',
          });
        } else if (this.model === 'time') {
          let timePicker = [];
          for (let hour = 0; hour < 24; hour++) {
            let hourPicker = {
              label: hour,
              value: hour,
              children: [],
            };
            let minutePicker = [];
            for (let minute = 0; minute < 60; minute++) {
              minutePicker.push({label: formatMinute(minute), value: formatMinute(minute)});
            }
            hourPicker.children = minutePicker;
            timePicker.push(hourPicker);
          }
          picker(timePicker, {
            onConfirm: function (result) {
              time = result.join(':');
              $self.val(date);
            },
            id: 'timePicker',
          });
        }

      },
    },
  };
</script>
