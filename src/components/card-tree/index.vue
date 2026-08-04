<script setup>
  import { computed, reactive, onMounted, watch, ref } from 'vue';

  /* ── ① props ───────────────────────── */
  const props = defineProps({
    /* 树结构数据 */
    data: { type: Array, required: true, default: () => [] },
  
    /* 字段映射配置 */
    fieldMap: {
      type: Object,
      default: () => ({
        name: 'name',
        children: 'children'
      })
    },
    height: {
      type: Number,
      default: 104,
    },
    /* 默认显示的最大子卡片数量，超出则折叠 */
    maxVisible: {
      type: Number,
      default: 3
    },
    /* 是否启用折叠功能 */
    collapsible: {
      type: Boolean,
      default: true
    }
  });
  
  /* ── 折叠/展开状态 ───────────────────────── */
  const showAll = ref(false);
  
  // 切换展开/折叠状态
  function toggleShowAll() {
    showAll.value = !showAll.value;
  }
  
  /* ── CSS 变量 ───────────────────────── */
  const rowHeight = computed(() => props.height);
  const rowHeightRem = computed(() => props.height / 37.5);
  const subCardHederCenter = computed(() => {
    // 单位 rem .sub-card-heder的高度的一半
    return 0.429;
  });

  const horizontalLineCenter = computed(() => {
    return props.height / 2;
  });

  const horizontalLineRem = computed(() => {
    return props.height / 37.5;
  });
  
  /* ── 辅助函数：根据 fieldMap 获取字段值 ── */
  const getField = (item, fieldName) => {
    const mappedField = props.fieldMap[fieldName];
    return item?.[mappedField];
  };
  
  /* ── ② 展开状态 Map（name → boolean） ── */
  const expanded = reactive(new Map());   // 将在初始化时设置为展开状态
  
  function toggle(name) {
    expanded.set(name, !expanded.get(name));
  }
  
  /* ── ② 初始化所有有子节点的项目为展开状态 ── */
  function initializeExpandedState(data) {
    function setExpanded(items) {
      items.forEach(item => {
        const children = getField(item, 'children');
        const name = getField(item, 'name');
        if (children && children.length > 0) {
          expanded.set(name, true); // 默认展开
          setExpanded(children); // 递归处理子项
        }
      });
    }
    setExpanded(data);
  }
  
  // 组件挂载时初始化展开状态
  onMounted(() => {
    initializeExpandedState(props.data);
  });
  
  // 监听数据变化，重新初始化展开状态
  watch(() => props.data, (newData) => {
    initializeExpandedState(newData);
  }, { deep: true, immediate: true });
  
  
  /* ── ④ 把树结构"按当前展开状态"展开成扁平可渲染数组 ─ */
  function flatten(list, level = 0, parentCollapsed = false) {
    const out = [];
    list.forEach(item => {
      const name = getField(item, 'name');
      const children = getField(item, 'children');
      const hasChildren = !!children?.length;
      const collapsed = parentCollapsed || !expanded.get(name) && hasChildren;
      out.push({
        ...item,
        level,
        hasChildren,
        collapsed: parentCollapsed
      });
      if (children?.length) {
        out.push(...flatten(
          children,
          level + 1,
          parentCollapsed || !expanded.get(name)
        ));
      }
    });
    return out;
  }
  const flatRows = computed(() =>
    flatten(props.data).filter(r => !r.collapsed)
  );
  
  /* ── ⑤ 最终渲染数据（根据折叠状态截取） ─────────────────────── */
  const renderRows = computed(() => {
    const rows = flatRows.value;
    // 如果不启用折叠功能或已展开全部，返回所有数据
    if (!props.collapsible || showAll.value) {
      return rows;
    }
    // 否则只返回前 maxVisible 个
    return rows.slice(0, props.maxVisible);
  });
  
  /* ── 是否需要显示折叠按钮 ─────────────────────── */
  const needCollapse = computed(() => {
    return props.collapsible && flatRows.value.length > props.maxVisible;
  });
  
  /* ── 隐藏的数量 ─────────────────────── */
  const hiddenCount = computed(() => {
    return flatRows.value.length - props.maxVisible;
  });
  
  /* ── ⑥ 计算需要垂直线的项目 ─────────────── */
  const verticalLines = computed(() => {
    const lines = [];
    const visibleRows = renderRows.value;
    
    visibleRows.forEach((item, index) => {
      const name = getField(item, 'name');
      if (item.hasChildren && expanded.get(name)) {
        let lastChildIndex = index;
        for (let i = index + 1; i < visibleRows.length; i++) {
          if (visibleRows[i].level > item.level) {
            lastChildIndex = i;
          } else {
            break;
          }
        }
        
        lines.push({
          level: item.level,
          startIndex: index,
          endIndex: lastChildIndex,
          left: 25 + (item.level + 1) * 18
        });
      }
    });
    
    return lines;
  });
  </script>
  
  <template>
    <div class="team-progress-list">
      <!-- 最外层的垂直线 -->
      <div class="vertical-line main-vertical"></div>
      
      <!-- 为有子节点的项目创建子垂直线 -->
      <div 
        v-for="line in verticalLines"
        :key="`vertical-${line.level}-${line.startIndex}`"
        class="vertical-line sub-vertical"
        :style="{
          '--sub-vertical-left-multiplier': line.level + 1,
          '--sub-vertical-top-index': line.startIndex,
          '--sub-vertical-height-count': line.endIndex - line.startIndex
        }"
      ></div>
      
      <div v-for="(item, index) in renderRows"
        :key="getField(item, 'name') || index"
        class="row"
        :style="{
          '--item-level': item.level,
          '--is-top-level': item.level === 0 ? 1 : 0
        }"
      >
        <!-- 水平连接线 -->
        <div class="horizontal-line"></div>
        
        <!-- 整行内容插槽 -->
        <slot 
          :item="item" 
          :index="index"
          :level="item.level"
          :hasChildren="item.hasChildren"
          :expanded="expanded.get(getField(item, 'name'))"
          :toggle="() => toggle(getField(item, 'name'))"
          :getField="getField"
        >
          <!-- 默认内容示例 -->
          <div :style="{ paddingLeft: (item.level * 18) + 'px' }">
            {{ getField(item, 'name') }}
          </div>
        </slot>
      </div>
      
      <!-- 折叠/展开按钮 -->
      <div v-if="needCollapse" class="collapse-btn" @click="toggleShowAll">
        <span class="collapse-arrows" :class="{ 'is-expanded': showAll }">❯❯</span>
      </div>
    </div>
  </template>
  
  <style lang="less" scoped>
  .team-progress-list{
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    font-size: 14px;
    color: #252b3a;
    padding-left: 6px;
    /* 为垂直线预留底部空间 */
    padding-bottom: 2px;
    
    /* 定义基础尺寸变量，让PostCSS自动转换 */
    --row-gap: 0.16rem;
    --row-total-height: calc(var(--row-height) + var(--row-gap)); /* 84px */
    --container-top-padding: 8px;
    --horizontal-line-center: v-bind(horizontalLineCenter + 'px');
    --horizontal-line-rem: v-bind(horizontalLineRem + 'rem');
    --sub-card-header-center: v-bind(subCardHederCenter + 'rem');
    --first-row-center-offset: calc(var(--container-top-padding) + var(--horizontal-line-center)); /* 38px */
    --level-indent: 18px;
    --base-vertical-left: 6px;
    --level-spacing: 12px;
    
    .vertical-line {
      position: absolute;
      width: 4px;
      background: linear-gradient(180deg, #2f9dff 0%, #5ab4ff 100%);
      border-radius: 2px;
      z-index: 1;
    }
    
    .main-vertical {
      left: var(--base-vertical-left);
      top: -10px;
      height: calc(100% + 0.213rem + var(--row-gap) - var(--horizontal-line-rem) + var(--sub-card-header-center));
    }
    
    .sub-vertical {
      left: calc(var(--base-vertical-left) + var(--sub-vertical-left-multiplier) * var(--level-indent));
      top: calc(var(--sub-vertical-top-index) * var(--row-total-height) + var(--first-row-center-offset));
      height: calc(var(--sub-vertical-height-count) * var(--row-total-height) + 2px);
    }
  }

  .row {
    position: relative;
    height: var(--row-height);
    display: flex;
    align-items: center;
    padding-left: 12px;
  }
    .horizontal-line {
      position: absolute;
      left: calc((1 - var(--is-top-level)) * var(--item-level) * var(--level-spacing));
      top: var(--horizontal-line-center);
      width: var(--level-spacing);
      height: 4px;
      background: linear-gradient(90deg, #2f9dff 0%, #5ab4ff 100%);
      border-radius: 2px;
      z-index: 2;
    }
  
  /* 折叠/展开按钮 */
  .collapse-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.32rem 0;
    margin-top: 0.16rem;
    cursor: pointer;
    user-select: none;
  }
  
  .collapse-btn:active {
    opacity: 0.7;
  }
  
  .collapse-arrows {
    font-size: 0.43rem;
    color: #c8c9cc;
    transform: rotate(90deg); /* 向下 */
    transition: transform 0.3s ease;
    letter-spacing: -0.1rem;
  }
  
  .collapse-arrows.is-expanded {
    transform: rotate(-90deg); /* 向上 */
  }
  </style>
  