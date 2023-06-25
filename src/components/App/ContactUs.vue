<template>
  <div class="search-container" style="margin-top: 100px;">
    <form @submit.prevent="submitHandler">
      <input type="text" v-model="query" placeholder="请输入关键字"/>
      <button type="submit">搜2345678索</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      query: '' // 搜索关键字
    }
  },
  methods: {
    submitHandler() {
      // 在这里可以处理你的搜索逻辑
      console.log(`Search for: ${this.query}`);
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"] {
  padding: .5rem;
  border-radius: 2rem;
  border: none;
  margin-right: .5rem;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, .1);
  outline: none;
  width: 15rem;
  transition: all .3s ease-in-out;
}

input[type="text"]:focus {
  width: 20rem;
}

button[type="submit"] {
  padding: .5rem 1rem;
  color: #fff;
  background-color: orange;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all .3s ease-in-out;
}
</style>
