<template>
  <div>
    <h1>Sponsors</h1>

    <form @submit.prevent="createSponsor">
      <label for="newImageLink">Image Link:</label>
      <input type="text" id="newImageLink" v-model="newSponsor.imageLink" required><br>
      <label for="newLink">Link:</label>
      <input type="text" id="newLink" v-model="newSponsor.link" required><br>
      <button type="submit">Create Sponsor</button>
    </form>

    <ul>
      <li v-for="sponsor in sponsors" :key="sponsor.id">

        <form @submit.prevent="updateSponsor(sponsor)">
          <label for="sponsorImageLink">Image Link:</label>
          <input type="text" id="sponsorImageLink" v-model="sponsor.imageLink" required><br>
          <label for="sponsorLink">Link:</label>
          <input type="text" id="sponsorLink" v-model="sponsor.link" required><br>

          <img :src="sponsor.image" alt="Speaker Image" /><br>

          <button type="submit">Update Sponsor</button>
        </form>
        <button @click="deleteSponsor(sponsor.id)">Delete</button>
        <strong>ID:</strong> {{ sponsor.id }}<br>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sponsors: [],
      newSponsor: {
        imageLink: '',
        link: ''
      }
    };
  },
  mounted() {
    this.fetchSponsors();
  },
  methods: {
    async fetchSponsors() {
      try {
        const response = await axios.get('http://localhost/backend_projekt/public/api/sponsors');
        this.sponsors = response.data;
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
    },
    async createSponsor() {
      try {
        const response = await axios.post('http://localhost/backend_projekt/public/api/sponsors', this.newSponsor);
        console.log(response.data);
        this.sponsors.push(response.data.sponsor);
        this.newSponsor.imageLink = '';
        this.newSponsor.link = '';
        this.clearNewSponsorFields();
        window.location.reload();
      } catch (error) {
        console.error('Error creating sponsor:', error);
      }
    },

    clearNewSponsorFields() {
      this.newSponsor.imageLink = '';
      this.newSponsor.link = '';
    },

    async updateSponsor(sponsor) {
      try {
        await axios.put(`http://localhost/backend_projekt/public/api/sponsors/${sponsor.id}`, sponsor);
        window.location.reload();
      } catch (error) {
        console.error('Error updating sponsor:', error);
      }
    },
    async deleteSponsor(id) {
      try {
        await axios.delete(`http://localhost/backend_projekt/public/api/sponsors/${id}`);
        this.sponsors = this.sponsors.filter(sponsor => sponsor.id !== id);
      } catch (error) {
        console.error('Error deleting sponsor:', error);
      }
    }
  }
};
</script>
