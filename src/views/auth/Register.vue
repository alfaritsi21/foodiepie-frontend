<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Register</h5>
            <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
              <b-form-input
                v-focus
                type="email"
                v-model="form.user_email"
                placeholder="Input Your Email ..."
              />
              <br />
              <b-form-input
                type="password"
                v-model="form.user_password"
                placeholder="Input Your Password ..."
              />
              <br />

              <b-form-input
                type="username"
                v-model="form.user_name"
                placeholder="Input Your Username ..."
              />
              <br />
              <b-button block variant="success" type="submit">
                <b>Submit</b>
              </b-button>
              <b-button block variant="danger" type="reset">
                <b>Reset</b>
              </b-button>
            </b-form>
            <hr />
            <div>
              <p class="register-alert">
                Back to
                <a @click.prevent="onLogin" class="register-here" type="login"
                  >Login</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: '',
        user_name: ''
      }
    }
  },
  computed: {
    // [1]
    // dataName() {
    //   return this.$store.state.name
    // }
    // [2]
    // ...mapState({ dataName: 'name' })
    // [3]
    ...mapState(['name'])
  },
  directives: {
    focus: {
      // definisi direktif
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      this.register(this.form)
        .then((response) => {
          this.$bvToast.toast('Register success', {
            title: 'Success',
            variant: 'success',
            solid: true
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        })
        .catch((error) => {
          console.log(error)
          this.$bvToast.toast(error, {
            title: 'Warning',
            variant: 'danger',
            solid: true
          })
        })
    },
    onLogin() {
      this.$router.push('/login')
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: '',
        user_name: ''
      }
    }
  }
}
</script>

<style scoped>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062e6, #33aeff);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

.register-here {
  cursor: pointer;
}

.register-alert {
  text-align: center;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>
