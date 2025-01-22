<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="이메일" required />
      <input v-model="username" type="text" placeholder="아이디" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">회원가입</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div class="login-container">
      <p>이미 계정이 있으신가요?</p>
      <a @click.prevent="goToLogin" class="login-link">로그인</a>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        // Optionally, you can save the username to your database here
        alert("회원가입 성공!"); // Notify user of success
        this.$router.push('/'); // Redirect to the main page or login page
      } catch (error) {
        this.errorMessage = error.message; // Display error message
        console.error("회원가입 오류:", error);
      }
    },
    goToLogin() {
      this.$router.push('/'); // Navigate to the login page
    }
  }
};
</script>

<style scoped>
@import '../css/User.css'; /* Import the User.css file */
</style>
