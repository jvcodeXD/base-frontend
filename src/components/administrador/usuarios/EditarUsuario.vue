<template>
  <button
    type="button"
    class="btn btn-warning"
    data-bs-toggle="modal"
    :data-bs-target="'#' + nameModal"
  >
    <i class="fa-solid fa-pen"></i> Editar
  </button>
  <div class="modal fade" :id="nameModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Editar usuario</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label :for="'nombre_completo' + id" class="col-form-label">
                Nombre completo
              </label>
              <input
                type="text"
                v-model="usuario.nombre_completo"
                class="form-control"
                :id="'nombre_completo' + id"
                placeholder="Ingrese nombre completo"
                :class="{ 'is-invalid': error.nombre_completo }"
              />
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label :for="'fecha_nacimiento' + id" class="col-form-label">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    v-model="usuario.fecha_nacimiento"
                    class="form-control"
                    :id="'fecha_nacimiento' + id"
                    :class="{ 'is-invalid': error.fecha_nacimiento }"
                  />
                </div>
                <div class="col-6">
                  <label :for="'rol' + id" class="col-form-label"> Rol </label>
                  <select
                    v-model="usuario.rol"
                    class="form-control"
                    :id="'rol' + id"
                    :class="{ 'is-invalid': error.rol }"
                  >
                    <option value="" disabled selected>
                      Selecciona un rol
                    </option>
                    <option v-for="role in roles" :key="role" :value="role">
                      {{ role }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label :for="'user' + id" class="col-form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    v-model="usuario.user"
                    class="form-control"
                    :id="'user' + id"
                    placeholder="Ingrese usuario"
                    :class="{ 'is-invalid': error.user }"
                  />
                </div>
                <div class="col-6">
                  <label :for="'pass' + id" class="col-form-label">
                    Contraseña
                  </label>
                  <div class="input-group">
                    <input
                      :type="mostrarContrasena ? 'text' : 'password'"
                      v-model="usuario.pass"
                      class="form-control"
                      :id="'pass' + id"
                      placeholder="Ingrese contraseña"
                      :class="{ 'is-invalid': error.pass }"
                    />
                    <span class="input-group-text" @click="togglePassword">
                      <i
                        :class="
                          mostrarContrasena
                            ? 'fa-solid fa-eye'
                            : 'fa-solid fa-eye-slash'
                        "
                      >
                      </i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="crearUsuario"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditarUsuario',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      usuario: {
        nombre_completo: null,
        fecha_nacimiento: null,
        rol: '',
        user: null,
        pass: null,
      },
      error: {
        nombre_completo: null,
        fecha_nacimiento: null,
        rol: null,
        user: null,
        pass: null,
      },
      nameModal: `editarUsuario${this.id}`,
      roles: ['Administrador', 'Usuario'],
      mostrarContrasena: false,
    }
  },
  methods: {
    async crearUsuario() {
      await this.$axios
        .put(`usuarios/${this.id}`, this.usuario)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    },
    togglePassword() {
      this.mostrarContrasena = !this.mostrarContrasena
    },
  },
  watch: {
    'usuario.nombre_completo': function (data) {
      this.error.nombre_completo =
        data === '' ? 'El nombre no puede estar vacio' : null
    },
    'usuario.rol': function (data) {
      this.error.rol =
        data === 'Administrador' || data === 'Usuario'
          ? null
          : 'El rol debe ser Administrador o Usuario'
    },
    'usuario.fecha_nacimiento': function (data) {
      this.error.fecha_nacimiento = !data ? 'Debe ingresar una fecha' : null
    },
    'usuario.user': function (data) {
      this.error.user = data === '' ? 'El usuario no debe estar vacio' : null
      this.error.user =
        data.length < 3 ? 'El usuario debe tener al menos 3 letras' : null
    },
    'usuario.pass': function (data) {
      this.error.pass = data === '' ? 'La contraseña no debe estar vacio' : null
      this.error.pass =
        data.length < 3 ? 'La contraseña debe tener al menos 3 letras' : null
    },
  },
  async beforeMount() {
    await this.$axios
      .get(`usuarios/${this.id}`)
      .then((res) => {
        const dato = res.data[0]
        const { nombre_completo, fecha_nacimiento, rol, user } = dato
        this.usuario = {
          nombre_completo,
          fecha_nacimiento: new Date(fecha_nacimiento)
            .toISOString()
            .split('T')[0],
          rol,
          user,
          pass: null,
        }
      })
      .catch((err) => console.log(err))
  },
}
</script>
