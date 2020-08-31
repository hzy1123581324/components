<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.outer-container {
  width: 200px;
  height: 200px;
}

.outer-container {
  border: 5px solid purple;
  position: relative;
  overflow: hidden;
}

.inner-container {
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

.inner-container::-webkit-scrollbar {
  display: none;
}
</style>