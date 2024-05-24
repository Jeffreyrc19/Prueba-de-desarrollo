<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <div class="movie-details-container">
      <h1>{{ movie.title }}</h1>
      <img :src="'https://image.tmdb.org/t/p/w400' + movie.poster_path" :alt="movie.title" />
      <p class="overview">{{ movie.overview }}</p>
      <p><strong>Fecha de lanzamiento:</strong> {{ movie.release_date }}</p>
      <p><strong>Calificación:</strong> {{ movie.vote_average }}</p>
      <button class="back-button" @click="$router.go(-1)">Regresar</button>
    </div>
  </div>
</template>

  <script>
  import axios from 'axios'
  
  export default {
    name: 'MovieDetails',
    data() {
      return {
        movie: {},
        loading: false,
        error: null
      }
    },
    async created() {
      this.loading = true
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=68471e5d6f4d1887f5d9c70a79d2f81b`)
        this.movie = response.data
      } catch (error) {
        this.error = 'Error al cargar los datos'
      } finally {
        this.loading = false
      }
    }
    
  }
  </script>

<style>
.movie-details-container {
  background-color: #1e1e1e; /* Fondo oscuro */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(128, 0, 128, 0.8); /* Sombra morada */
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
  color: #ffffff; /* Texto en blanco */
}

.movie-details-container img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 20px;
}

.overview {
  text-align: justify;
  margin-bottom: 20px;
  line-height: 1.6;
}

.back-button {
  padding: 10px 30px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: rgb(0, 0, 0);
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;
  margin-top: 20px;
}

.back-button:hover {
  letter-spacing: 3px;
  background-color: hsl(261deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(93 24 220) 0px 7px 29px 0px;
}

.back-button:active {
  letter-spacing: 3px;
  background-color: hsl(261deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
  transform: translateY(10px);
  transition: 100ms;
}


</style>