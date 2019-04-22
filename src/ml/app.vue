<template>
  <div>
    <div class="header">
      <h1>四川大本科毕业论文（设计）</h1>
      <h2>题目：根据人脸图像进行年龄预测</h2>
      <h5>write by 任茗睿</h5>
      <p>论文地址：</p>
    </div>
    <Tabs>
      <Tab-pane label="主界面">
        <ml v-on:img-predicted='imgPredictedHandle'></ml>
      </Tab-pane>
      <Tab-pane label="历史记录">
        <Histroty :table-data='historyData'></Histroty>
      </Tab-pane>
    </Tabs>
  </div>
</template>

<script>
import Tabs from 'iview/src/components/tabs'
import ml from './ml.vue'
import Histroty from './history.vue'
export default { 
  data() {
    return {
      historyData: []
    }
  },
  components: {
    ml,
    Histroty
  },
  methods: {
    imgPredictedHandle(imgBlob, time, fageAge, myAge) {
      this.historyData.push({
        image: imgBlob,
        time: time.toLocaleString(),
        face: fageAge,
        thesis: myAge
      })
    }
  },
}
</script>