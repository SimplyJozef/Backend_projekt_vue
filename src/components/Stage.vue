<template>
  <div>

    <form @submit.prevent="createStage">
      <label for="newName">Name:</label>
      <input type="text" id="newName" v-model="newStage.name" required><br>
      <label for="newDate">Date:</label>
      <input type="date" id="newDate" v-model="newStage.date" required><br>
      <button type="submit">Create Stage</button>
    </form>

    <ul>

        <li v-for="stage in stages" :key="stage.id" class="program">

            <form @submit.prevent="updateStage(stage)" class="stage">

              <input type="text" id="stageName" v-model="stage.name" required><br>

              <input type="date" id="stageDate" v-model="stage.date" required><br>
              <button type="submit">Update Stage</button>
            </form>

          <button @click="deleteStage(stage.id)">Delete</button>
          <strong>ID:</strong> {{ stage.id }}<br>
          <StageInfo :stageId="stage.id" />
        </li>

    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import StageInfo from './StageInfo.vue';

export default {
  components: {
    StageInfo
  },
  data() {
    return {
      stages: [],
      newStage: {
        name: '',
        date: ''
      }
    };
  },
  mounted() {
    this.fetchStages();
  },
  methods: {
    async fetchStages() {
      try {
        const response = await axios.get('http://localhost/backend_projekt/public/api/stages');
        this.stages = response.data;
      } catch (error) {
        console.error('Error fetching stages:', error);
      }
    },
    async createStage() {
      try {
        const response = await axios.post('http://localhost/backend_projekt/public/api/stages', this.newStage);
        this.stages.push(response.data.stage);
        this.newStage.name = '';
        this.newStage.date = '';
      } catch (error) {
        console.error('Error creating stage:', error);
      }
    },
    async updateStage(stage) {
      try {
        await axios.put(`http://localhost/backend_projekt/public/api/stages/${stage.id}`, stage);

      } catch (error) {
        console.error('Error updating stage:', error);
      }
    },
    async deleteStage(id) {
      try {
        await axios.delete(`http://localhost/backend_projekt/public/api/stages/${id}`);
        this.stages = this.stages.filter(stage => stage.id !== id);
      } catch (error) {
        console.error('Error deleting stage:', error);
      }
    }
  }
};
</script>
<style scoped>


  .stage {
    display: flex;

  }

  .program {
    background: #004953;
    list-style-type: none;

  }
</style>