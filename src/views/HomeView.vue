<template>
  <div class="div">
    <h1 class="title">Buscador de Películas</h1>
    <div class="search-container">
      <input v-model="searchTerm" placeholder="Buscar película..." @keyup.enter="searchMovies" />
      <button @click="searchMovies">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </span>
      </button>
    </div>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
            <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" :alt="movie.title" />
            <h3>{{ movie.title }}</h3>
            <p class="cali">{{ movie.release_date }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

  
  <script>
  import axios from 'axios'
  
  
  export default {
    name: 'HomeView',
    data() {
      return {
        searchTerm: '',
        movies: [],
        loading: false,
        error: null
      }
    },

  mounted() {
    this.getPopularMovies()
  },
  methods: {
    async searchMovies() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=68471e5d6f4d1887f5d9c70a79d2f81b&query=${this.searchTerm}`)
        this.movies = response.data.results
      } catch (error) {
        this.error = 'Error al cargar los datos'
      } finally {
        this.loading = false
      }
    },
    async getPopularMovies() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=68471e5d6f4d1887f5d9c70a79d2f81b&language=es-ES&page=1`)
        this.movies = response.data.results.slice(0, 12)
      } catch (error) {
        this.error = 'Error al cargar las películas populares'
      }
    }
  }
    
  }
  </script>
<style>
.title {
  text-align: center;
  color: #ffffff; /* Naranja vibrante */
  text-shadow: 6px 6px 10px rgba(128, 5, 128, 5); /* Sombra morada más notable */
}
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px; /* Ajusta según tus necesidades */
}

.search-container input {
  margin: 0; /* Elimina el margen predeterminado */
  padding: 1rem;
  border: none;
  border-radius: 1rem 0 0 1rem; /* Solo redondea las esquinas izquierdas */
  background: #e8e8e8;
  transition: 0.3s;
}

.search-container button {
  border-radius: 0 1rem 1rem 0; /* Solo redondea las esquinas derechas */
  margin: 0; /* Elimina el margen predeterminado */
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  transition: all 0.5s ease;
}

.search-container button:hover {
  background-color: hsl(261deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(93 24 220) 0px 7px 29px 0px;
}

.search-container button:active {
  transform: translateY(10px);
  transition: 100ms;
}

.cali{
  color: black;
}

</style>
