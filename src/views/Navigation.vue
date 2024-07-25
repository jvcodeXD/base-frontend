<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </li>
        </ul>
        <div v-if="usuario" class="d-flex align-items-center">
          <span class="mx-2">
            <i class="fa-solid fa-user"></i> {{ usuario.rol }}
          </span>
          <button class="btn btn-outline-secondary ms-3" @click="logout">
            Salir
          </button>
        </div>
        <div v-else class="d-flex">
          <button class="btn btn-outline-primary">
            <router-link to="/login" class="nav-link">Ingresar</router-link>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      usuario: null,
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('usuario')
      this.usuario = null
      this.$router.push('/')
    },
  },
  mounted() {
    const usuarioData = localStorage.getItem('usuario')
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData)
    }
  },
}
</script>
