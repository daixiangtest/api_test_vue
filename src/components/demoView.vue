<template>
    <el-form ref="formRef" :model="formData">
      <el-row v-for="(item, index) in formData.items" :key="item.id">
        <el-col :span="22">
          <el-form-item :label="`Item ${index + 1} Name`" :prop="`items.${index}.name`">
            <el-input v-model="item.name" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <span @mousedown.prevent="startDrag(index)" class="drag-handle">≡</span>
        </el-col>
      </el-row>
    </el-form>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ElForm } from 'element-plus';
  
  const formRef = ref(null);
  const formData = ref({
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
  });
  
  let startIndex = 0;
  
  const startDrag = (index) => {
    startIndex = index;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
  };
  
  const handleDrag = (e) => {
    e.preventDefault();
    const currentIndex = getCurrentIndex(e.clientY);
    if (currentIndex!== startIndex) {
      const itemToMove = formData.value.items[startIndex];
      formData.value.items.splice(startIndex, 1);
      formData.value.items.splice(currentIndex, 0, itemToMove);
      startIndex = currentIndex;
    }
  };
  
  const stopDrag = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
  };
  
  const getCurrentIndex = (y) => {
    const formEl = formRef.value.$el;
    const rows = formEl.querySelectorAll('.el-row');
    let currentIndex = 0;
    let minDistance = Infinity;
    rows.forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      const distance = Math.abs(rect.top - y);
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = index;
      }
    });
    return currentIndex;
  };
  
  onMounted(() => {
    // 可以在这里进行一些初始化操作，比如设置表单验证规则等
  });
  </script>
  
  <style scoped>
  .drag-handle {
    cursor: pointer;
    user-select: none;
  }
  </style>