<template>
  <nav>
    <div class="brand">
      <router-link to="/" class="brand-link">
        <img src="../assets/logo.svg" alt="SanaaPesa Logo" />
        <span>SanaaPesa</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
.brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.brand img {
  height: 40px;
  margin-right: 10px;
}

.brand span {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}
</style>