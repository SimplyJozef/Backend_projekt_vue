<template>
  <div>
    <h1>Gallery</h1>

    <form @submit.prevent="createGallery">
      <label for="newRocnik">Rocnik:</label>
      <input type="text" id="newRocnik" v-model="newGallery.rocnik" required><br>
      <label for="newImageLink">Image Link:</label>
      <input type="text" id="newImageLink" v-model="newGallery.imageLink" required><br>
      <button type="submit">Create Gallery Entry</button>
    </form>


    <label for="rocnikFilter">Filter by Rocnik:</label>
    <select id="rocnikFilter" v-model="selectedRocnik">
      <option value="">All</option>
      <option v-for="n in 4" :key="n" :value="n">{{ n }}</option>
    </select>

    <ul>
      <li v-for="gallery in filteredGalleries" :key="gallery.id">

        <form @submit.prevent="updateGallery(gallery)">
          <label for="galleryRocnik">Rocnik:</label>
          <input type="text" id="galleryRocnik" v-model="gallery.rocnik" required><br>

          <label for="galleryImageLink">Image Link:</label>
          <input type="text" id="galleryImageLink" v-model="gallery.imageLink" required><br>

          <img :src="gallery.imageLink" alt="Gallery Image" /><br>

          <button type="submit">Update Gallery Entry</button>
        </form>
        <button @click="deleteGallery(gallery.id)">Delete</button>
        <strong>ID:</strong> {{ gallery.id }}<br>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      galleries: [],
      newGallery: {
        rocnik: '',
        imageLink: ''
      },
      selectedRocnik: ''
    };
  },
  mounted() {
    this.fetchGalleries();
  },
  methods: {
    async fetchGalleries() {
      try {
        const response = await axios.get('http://localhost/backend_projekt/public/api/galleries');
        this.galleries = response.data;
        this.galleries.forEach(gallery => console.log(gallery.rocnik));
      } catch (error) {
        console.error('Error fetching galleries:', error);
      }
    },
    async createGallery() {
      try {
        const response = await axios.post('http://localhost/backend_projekt/public/api/galleries', this.newGallery);
        this.galleries.push(response.data.gallery);
        this.clearNewGalleryFields();
        window.location.reload();
      } catch (error) {
        console.error('Error creating gallery entry:', error);
      }
    },
    async updateGallery(gallery) {
      try {
        await axios.put(`http://localhost/backend_projekt/public/api/galleries/${gallery.id}`, gallery);
        window.location.reload();
      } catch (error) {
        console.error('Error updating gallery entry:', error);
      }
    },
    async deleteGallery(id) {
      try {
        await axios.delete(`http://localhost/backend_projekt/public/api/galleries/${id}`);
        this.galleries = this.galleries.filter(gallery => gallery.id !== id);
      } catch (error) {
        console.error('Error deleting gallery entry:', error);
      }
    },
    clearNewGalleryFields() {
      this.newGallery.rocnik = '';
      this.newGallery.imageLink = '';
    }
  },
  computed: {
    filteredGalleries() {
      if (this.selectedRocnik) {
        return this.galleries.filter(gallery => gallery.rocnik == this.selectedRocnik.toString());
      }
      return this.galleries;

    }
  }
};
</script>
