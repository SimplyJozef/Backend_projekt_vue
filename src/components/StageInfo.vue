

<template>
  <div>
    <h1>Stage Information</h1>

    <!-- Form for creating new StageInfo -->
    <form @submit.prevent="createStageInfo">
      <input type="hidden" v-model="newStageInfo.stage_id" value="">
      <label for="casOd">Cas Od:</label>
      <input type="text" id="casOd" v-model="newStageInfo.cas_od" required><br>
      <label for="casDo">Cas Do:</label>
      <input type="text" id="casDo" v-model="newStageInfo.cas_do" required><br>
      <label for="nazov">Nazov:</label>
      <input type="text" id="nazov" v-model="newStageInfo.nazov" required><br>
      <label for="popis">Popis:</label>
      <input type="text" id="popis" v-model="newStageInfo.popis" required><br>
      <label for="speaker">Speaker:</label>
      <input type="text" id="speaker" v-model="newStageInfo.speaker" required><br>
      <label for="firma">Firma:</label>
      <input type="text" id="firma" v-model="newStageInfo.firma" required><br>
      <label for="maxCapacity">Max Capacity:</label>
      <input type="number" id="maxCapacity" v-model="newStageInfo.max_capacity" required><br>
      <button type="submit">Create StageInfo</button>
    </form>

    <!-- List of StageInfo -->
    <ul>
      <li v-for="stageInfo in filteredStageInfo" :key="stageInfo.id">
        <!-- Form for updating StageInfo -->
        <form @submit.prevent="updateStageInfo(stageInfo)">
          <input type="hidden" v-model="newStageInfo.stage_id" >
          <label for="casOd">Cas Od:</label>
          <input type="text" id="casOd" v-model="stageInfo.cas_od" required><br>
          <label for="casDo">Cas Do:</label>
          <input type="text" id="casDo" v-model="stageInfo.cas_do" required><br>
          <label for="nazov">Nazov:</label>
          <input type="text" id="nazov" v-model="stageInfo.nazov" required><br>
          <label for="popis">Popis:</label>
          <input type="text" id="popis" v-model="stageInfo.popis" required><br>
          <label for="speaker">Speaker:</label>
          <input type="text" id="speaker" v-model="stageInfo.speaker" required><br>
          <label for="firma">Firma:</label>
          <input type="text" id="firma" v-model="stageInfo.firma" required><br>
          <label for="maxCapacity">Max Capacity:</label>
          <input type="number" id="maxCapacity" v-model="stageInfo.max_capacity" required><br>
          <button type="submit">Update StageInfo</button>
        </form>
        <button @click="deleteStageInfo(stageInfo.id)">Delete</button>
        <strong>ID:</strong> {{ stageInfo.id }}<br>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    stageId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      filteredStageInfo: [],
      newStageInfo: {
        stage_id: this.stageId, // Initialize stage_id with stageId prop
        cas_od: '',
        cas_do: '',
        nazov: '',
        popis: '',
        speaker: '',
        firma: '',
        max_capacity: ''
      }
    };
  },
  mounted() {
    this.fetchStageInfo();
  },
  watch: {
    // Watch for changes in stageId prop and update newStageInfo.stage_id accordingly
    stageId(newVal) {
      this.newStageInfo.stage_id = newVal;
    }
  },
  methods: {
    async fetchStageInfo() {
      try {
        const response = await axios.get(`http://localhost/backend_projekt/public/api/stage-info/${this.stageId}`);
        this.filteredStageInfo = response.data.stage_info;
      } catch (error) {
        console.error('Error fetching Stage Information:', error);
      }
    },
    async createStageInfo() {
      try {
        const response = await axios.post('http://localhost/backend_projekt/public/api/stage-info', this.newStageInfo);
        this.filteredStageInfo.push(response.data.stage_info);
        this.clearNewStageInfoFields();
      } catch (error) {
        console.error('Error creating Stage Info:', error);
      }
    },
    async updateStageInfo(stageInfo) {
      try {
        await axios.put(`http://localhost/backend_projekt/public/api/stage-info/${stageInfo.id}`, stageInfo);
      } catch (error) {
        console.error('Error updating Stage Info:', error);
      }
    },
    async deleteStageInfo(id) {
      try {
        await axios.delete(`http://localhost/backend_projekt/public/api/stage-info/${id}`);
        this.filteredStageInfo = this.filteredStageInfo.filter(stageInfo => stageInfo.id !== id);
      } catch (error) {
        console.error('Error deleting Stage Info:', error);
      }
    },
    clearNewStageInfoFields() {
      this.newStageInfo.stage_id = this.stageId; // Reset stage_id to stageId prop value
      this.newStageInfo.cas_od = '';
      this.newStageInfo.cas_do = '';
      this.newStageInfo.nazov = '';
      this.newStageInfo.popis = '';
      this.newStageInfo.speaker = '';
      this.newStageInfo.firma = '';
      this.newStageInfo.max_capacity = '';
    }
  }
};
</script>
