<template>
  <div>
    <input v-model="searchTerm" type="text" class="rounded-lg p-3 border" placeholder="输入歌曲名称进行搜索">
    <button @click="search" class="rounded-lg px-5 py-3 bg-blue-500 text-white ml-3">搜索</button>
    <div v-if="searchResults.length > 0">
      <h2 class="text-2xl font-bold mt-5">搜索结果</h2>
      <ul class="mt-3">
        <li v-for="(result, index) in searchResults" :key="index" class="mb-3 p-3 bg-gray-100 rounded-lg">{{ result }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      searchResults: [],
    };
  },
  methods: {
    search() {
      this.searchResults = [];
      if (this.searchTerm.trim() !== "") {
        fetch(`/api/music/search-all-music?music_name=${this.searchTerm}`)
            .then(response => response.json())
            .then(data => {
              this.searchResults = data;
            })
            .catch(error => console.error("Error searching for music:", error));
      }
    },
  },
};
</script>

<style>
input[type="text"] {
  width: 70%;
  font-size: 1.5em;
}

button {
  font-size: 1.5em;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
}
</style>