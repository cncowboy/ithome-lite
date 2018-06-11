<template>
  <div>
    <div class="weui-cells__title">创建团体</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-field
        placeholder="请输入团体名称"
        type="text"
        label="名称"
        v-model="name"
      />

      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">加入类型</div>
        </div>
        <div class="weui-cell__bd">
          <mp-picker
            v-model="join_type_name"
            :range="join_types"
            @change="bindChange_join_type"
          />
        </div>
      </div>

      <mp-switch
        title="接收通知消息"
        v-model="join_notify"
        :is-in-cell="true"
        @change = "switchChange_join_notify"
      />

      <mp-field
        placeholder="请输入团队介绍"
        type="textarea"
        v-model="intro"
      />
    </div>

  </div>
</template>

<script>
  import wx from 'wx'
  import { mapState, mapActions } from 'vuex'
  import MpCell from 'weui-cell'
  import MpField from 'weui-field';
  import MpPicker from 'weui-picker';
  import MpSwitch from 'weui-switch';
  import base64Icon from '../../../static/assets/base64Icons'

  export default {
    components: {
      MpCell,
      MpField,
      MpPicker,
      MpSwitch
    },
    data () {
      return {
        icon: base64Icon.icon20,
        name: '',
        intro: '',
        secret_code: '',
        join_type: 1,
        join_type_name: '暗号验证加入',
        join_notify: true,
        join_types: ['允许任何人加入', '暗号验证加入', '不允许任何人加入']
      }
    },
    computed: {
      ...mapState([
        'user',
        'activedEmployee',
        'companies'
      ])
    },
    mounted () {
    },
    onPullDownRefresh () {
    },
    // onReachBottom () {
    //   this.loadmore()
    // },
    methods: {
      ...mapActions([
      ]),
      createCompany () {

      },
      switchChange_join_notify (e) {

      },
      bindChange_join_type (e) {

      }
    }
  }
</script>

<style lang="less" scoped>
</style>
