<template>
  <button
    type="button"
    class="btn btn-success"
    data-bs-toggle="modal"
    data-bs-target="#crearUsuario"
  >
    Agregar usuario
  </button>
  <div class="modal fade" id="crearUsuario" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Crear usuario</h1>
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
              <label for="nombre_completo" class="col-form-label">
                Nombre completo
              </label>
              <input
                type="text"
                v-model="usuario.nombre_completo"
                class="form-control"
                id="nombre_completo"
                placeholder="Ingrese nombre completo"
                :class="{ 'is-invalid': error.nombre_completo }"
              />
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="fecha_nacimiento" class="col-form-label">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    v-model="usuario.fecha_nacimiento"
                    class="form-control"
                    id="fecha_nacimiento"
                    :class="{ 'is-invalid': error.fecha_nacimiento }"
                  />
                </div>
                <div class="col-6">
                  <label for="rol" class="col-form-label"> Rol </label>
                  <select
                    v-model="usuario.rol"
                    class="form-control"
                    id="rol"
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
                  <label for="user" class="col-form-label"> Usuario </label>
                  <input
                    type="text"
                    v-model="usuario.user"
                    class="form-control"
                    id="user"
                    placeholder="Ingrese usuario"
                    :class="{ 'is-invalid': error.user }"
                  />
                </div>
                <div class="col-6">
                  <label for="pass" class="col-form-label"> Contraseña </label>
                  <div class="input-group">
                    <input
                      :type="mostrarContrasena ? 'text' : 'password'"
                      v-model="usuario.pass"
                      class="form-control"
                      id="pass"
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
            <div class="mb-3">
              <label for="file" class="col-form-label"> Archivo </label>
              <input
                type="file"
                class="form-control"
                id="file"
                ref="fileInput"
              />
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
import { toast } from 'vue3-toastify'
export default {
  name: 'CrearUsuario',
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
      roles: ['Administrador', 'Usuario'],
      mostrarContrasena: false,
    }
  },
  methods: {
    async crearUsuario() {
      const formData = new FormData()
      Object.keys(this.usuario).forEach((key) => {
        if (this.usuario[key] !== null && this.usuario[key] !== undefined) {
          formData.append(key, this.usuario[key])
        }
      })
      const fileInput = this.$refs.fileInput
      if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0])
      }
      await this.$axios
        .post('usuarios', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          window.location.reload()
        })
        .catch((err) =>
          toast.error(err.response.data.message, {
            autoClose: 1500,
          })
        )
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
}
</script>
