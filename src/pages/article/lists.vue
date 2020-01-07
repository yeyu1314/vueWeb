<template>
  <div>列表</div>
</template>

<script>
export default {
  created () {
    var args = JSON.parse(sessionStorage.getItem('signInfo'))
    console.log(args)
    console.log(this.$route)
    // if (args.isPrinting == 0) {
    //   this.ctroPrinting = false;
    // }
    // this.operId = this.$route.params.operId;
    // var row = this.$route.params.row;
  }
}
</script>

<style>
</style>
