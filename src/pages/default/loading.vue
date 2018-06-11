<template>
  <div >
    <div class="weui-flex">
      <div class="weui-flex__item">
        loading...
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import MpProgress from 'mp-weui/packages/progress'

  export default {
    components: {
      MpProgress
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
      ])
    },
    mounted () {
      this.init()
    },
    methods: {
      ...mapActions([
        'getInitInfo'
      ]),
      async init () {
        const initResult = await Promise.all([this.getInitInfo()])
        console.log(initResult)
        if (initResult) {
          this.$router.replace('/pages/ranks')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
<style lang="less">
  .weui-flex {
    display: flex;
  }
  .weui-flex__item{
    flex: 1;
  }

  .justify{
    display: flex;
    justify-content: center;
  }
  .align{
    align-items: center;
  }
  .order{
    flex: 1
  }
  .nick{
    flex: 3
  }
  .score{
    flex: 1
  }
</style>
