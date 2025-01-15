<template>
  <div>
    <h1>リアルタイム投票</h1>

    <div>
      <h2>投票結果</h2>
      <BarChart :data="chartData" :options="chartOptions" />
    </div>

    <div>
      <button @click="vote('option1')">オプション 1</button>
      <button @click="vote('option2')">オプション 2</button>
      <button @click="vote('option3')">オプション 3</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "~/plugins/firebase";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = ref({
  labels: ['オプション 1', 'オプション 2', 'オプション 3'],
  datasets: [
    {
      label: '投票数',
      data: [0, 0, 0],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
});

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '投票結果'
    }
  }
};

const vote = (option) => {
  const voteRef = db.collection('votes').doc(option);
  voteRef.update({
    count: firebase.firestore.FieldValue.increment(1)
  });
};

const fetchVotes = () => {
  db.collection('votes').onSnapshot((snapshot) => {
    let data = [0, 0, 0];
    snapshot.forEach(doc => {
      const { count } = doc.data();
      if (doc.id === 'option1') data[0] = count;
      if (doc.id === 'option2') data[1] = count;
      if (doc.id === 'option3') data[2] = count;
    });
    chartData.value.datasets[0].data = data;
  });
};

onMounted(() => {
  fetchVotes();
});
</script>
