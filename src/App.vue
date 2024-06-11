<template>
  <div>

      <div class="wrapper">
        <nav>
          <router-link to="/">Stages</router-link>
          <router-link to="/sponsors">Sponsors</router-link>
          <router-link to="/speakers">Speakers</router-link>
          <router-link to="/povedaliONas">Povedali o nas</router-link>
          <router-link to="/gallery">Galeria</router-link>
        </nav>
      </div>

    <main>
      <router-view />
    </main>

  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style scoped>


nav {
  width: 100%;
  font-size: 12px;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }



  nav {
    text-align: center;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}


</style>
