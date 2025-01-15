<template>
  <v-container class="text-center">
    <v-row class="mb-5">
      <v-col cols="12">
        <v-btn class="mx-2" color="primary" @click="vote(0)">選択肢 1</v-btn>
        <v-btn class="mx-2" color="success" @click="vote(1)">選択肢 2</v-btn>
        <v-btn class="mx-2" color="warning" @click="vote(2)">選択肢 3</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-divider></v-divider>
        <h2>投票結果</h2>

        <v-row>
          <v-col cols="12" sm="8" offset-sm="2">
            <Bar :data="chartData" :options="chartOptions" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const choices = ref([
  { label: '選択肢 1', votes: 0 },
  { label: '選択肢 2', votes: 0 },
  { label: '選択肢 3', votes: 0 }
])

const vote = (index) => {
  choices.value[index].votes++
}

const chartData = ref({
  labels: choices.value.map(choice => choice.label),
  datasets: [{
    label: '投票数',
    data: choices.value.map(choice => choice.votes),
    backgroundColor: ['#42A5F5', '#66BB6A', '#FFCA28'],
    borderColor: ['#1E88E5', '#43A047', '#FFA000'],
    borderWidth: 1
  }]
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `${tooltipItem.raw}票`
      }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    }
  }
})

watch(choices, () => {
  chartData.value = {
    labels: choices.value.map(choice => choice.label),
    datasets: [{
      label: '投票数',
      data: choices.value.map(choice => choice.votes),
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFCA28'],
      borderColor: ['#1E88E5', '#43A047', '#FFA000'],
      borderWidth: 1
    }]
  }
}, { deep: true })

</script>

<style scoped>
.v-btn {
  font-size: 16px;
}

h2 {
  margin-bottom: 20px;
}

.v-divider {
  margin: 20px 0;
}
</style>
