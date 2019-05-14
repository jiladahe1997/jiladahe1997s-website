<template>
  <div>
    <Table :columns='columns' :data='tableData'></Table>
  </div>
</template>

<script>
import Table from 'iview/src/components/table'
import Tooltip from 'iview/src/components/tooltip'
import Vue from 'vue'
Vue.component('Table-img', {
  props: ['imgBase64'],
  render() {
    return (
      <Tooltip placement="top">
        鼠标移到这里查看图片
        <template slot='content'>
          <img src={this.imgBase64} />
        </template>
      </Tooltip> 
    )
  }
})

export default {
  data() {
    return {
      columns: [
        {
          title: '图片',
          key: 'image',
          render(h, params) {
            return h('Table-img', {
              props: {
                imgBase64: params.row.image
              }
            })
          }
        },
        {
          title: '截图时间',
          key: 'time'
        },
        {
          title: '论文结果',
          key: 'thesis'
        },
        {
          title: 'face++结果',
          key: 'face'
        }
      ],
    }
  },
  props: [
    'tableData',
  ],
}
</script>