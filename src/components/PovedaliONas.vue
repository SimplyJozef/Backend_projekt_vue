<template>
  <div>
    <h1>Povedali O Nas</h1>

    <form @submit.prevent="createPovedaliONas">
      <label for="newName">Name:</label>
      <input type="text" id="newName" v-model="newPovedaliONas.name" required><br>
      <label for="newQuote">Quote:</label>
      <input type="text" id="newQuote" v-model="newPovedaliONas.quote" required><br>
      <label for="newPozicia">Pozicia:</label>
      <input type="text" id="newPozicia" v-model="newPovedaliONas.pozicia" required><br>
      <label for="newImageLink">Image Link:</label>
      <input type="text" id="newImageLink" v-model="newPovedaliONas.imageLink" required><br>
      <button type="submit">Create Povedali O Nas</button>
    </form>

    <ul>
      <li v-for="povedaliONas in povedaliONasList" :key="povedaliONas.id">

        <form @submit.prevent="updatePovedaliONas(povedaliONas)">
          <label for="povedaliONasName">Name:</label>
          <input type="text" id="povedaliONasName" v-model="povedaliONas.name" required><br>
          <label for="povedaliONasQuote">Quote:</label>
          <input type="text" id="povedaliONasQuote" v-model="povedaliONas.quote" required><br>
          <label for="povedaliONasPozicia">Pozicia:</label>
          <input type="text" id="povedaliONasPozicia" v-model="povedaliONas.pozicia" required><br>
          <label for="povedaliONasImageLink">Image Link:</label>
          <input type="text" id="povedaliONasImageLink" v-model="povedaliONas.imageLink" required><br>

          <img :src="povedaliONas.image" alt="Speaker Image" /><br>

          <button type="submit">Update Povedali O Nas</button>
        </form>
        <button @click="deletePovedaliONas(povedaliONas.id)">Delete</button>
        <strong>ID:</strong> {{ povedaliONas.id }}<br>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      povedaliONasList: [],
      newPovedaliONas: {
        name: '',
        quote: '',
        pozicia: '',
        imageLink: ''
      }
    };
  },
  mounted() {
    this.fetchPovedaliONas();
  },
  methods: {
    async fetchPovedaliONas() {
      try {
        const response = await axios.get('http://localhost/backend_projekt/public/api/povedalionas');
        this.povedaliONasList = response.data;
      } catch (error) {
        console.error('Error fetching Povedali O Nas:', error);
      }
    },
    async createPovedaliONas() {
      try {
        const response = await axios.post('http://localhost/backend_projekt/public/api/povedalionas', this.newPovedaliONas);
        this.povedaliONasList.push(response.data.povedaliONas);
        this.newPovedaliONas.name = '';
        this.newPovedaliONas.quote = '';
        this.newPovedaliONas.pozicia = '';
        this.newPovedaliONas.imageLink = '';
        this.clearNewPovedaliONasFields();
        window.location.reload();
      } catch (error) {
        console.error('Error creating Povedali O Nas:', error);
      }
    },
    async updatePovedaliONas(povedaliONas) {
      try {
        await axios.put(`http://localhost/backend_projekt/public/api/povedalionas/${povedaliONas.id}`, povedaliONas);
        window.location.reload();
      } catch (error) {
        console.error('Error updating Povedali O Nas:', error);
      }
    },
    async deletePovedaliONas(id) {
      try {
        await axios.delete(`http://localhost/backend_projekt/public/api/povedalionas/${id}`);
        this.povedaliONasList = this.povedaliONasList.filter(povedaliONas => povedaliONas.id !== id);
      } catch (error) {
        console.error('Error deleting Povedali O Nas:', error);
      }
    },
    clearNewPovedaliONasFields() {
      this.newPovedaliONas.name = '';
      this.newPovedaliONas.quote = '';
      this.newPovedaliONas.pozicia = '';
      this.newPovedaliONas.imageLink = '';
    }
  }
};
</script>
