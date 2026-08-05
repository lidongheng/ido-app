import { computed, onBeforeUnmount, ref, watch } from 'vue';

const SCOPE_OPTIONS = [
  { label: '全部', value: '全部' },
  { label: '国内', value: '国内' },
  { label: '海外', value: '海外' }
];

const AREA_OPTIONS = [
  '全部',
  '华北',
  '华东',
  '华南',
  '西部',
  '亚太',
  '中东中亚',
  '北部非洲',
  '南部非洲',
  '欧洲',
  '拉美'
];

export function useDcSelector(props, emit) {
  const keyword = ref('');
  const activeScope = ref('全部');
  const activeArea = ref('全部');
  const pendingIds = ref([]);
  const expandedCityIds = ref(new Set(props.options.map((city) => city.id)));
  let lockedScrollTop = 0;

  const allDcIds = computed(() => {
    return props.options.flatMap((city) => {
      return city.children.map((dataCenter) => dataCenter.id);
    });
  });
  const allSelected = computed(() => pendingIds.value.length === allDcIds.value.length);
  const allIndeterminate = computed(() => {
    return pendingIds.value.length > 0 && !allSelected.value;
  });
  const visibleTree = computed(() => {
    const normalizedKeyword = keyword.value.trim();

    return props.options
      .filter((city) => {
        const matchesScope = activeScope.value === '全部' || city.scope === activeScope.value;
        const matchesArea = activeArea.value === '全部' || city.area === activeArea.value;
        return matchesScope && matchesArea;
      })
      .map((city) => {
        if (!normalizedKeyword || city.name.includes(normalizedKeyword)) {
          return city;
        }

        return {
          ...city,
          children: city.children.filter((dataCenter) => {
            return dataCenter.name.includes(normalizedKeyword);
          })
        };
      })
      .filter((city) => city.children.length > 0);
  });

  watch(() => props.visible, (value) => {
    if (!value) {
      unlockPageScroll();
      return;
    }

    lockPageScroll();
    pendingIds.value = [...props.selectedIds];
    keyword.value = '';
    activeScope.value = '全部';
    activeArea.value = '全部';
  });

  onBeforeUnmount(() => {
    if (props.visible) {
      unlockPageScroll();
    }
  });

  function lockPageScroll() {
    lockedScrollTop = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollTop}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  function unlockPageScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, lockedScrollTop);
  }

  function isCitySelected(city) {
    return city.children.every((dataCenter) => pendingIds.value.includes(dataCenter.id));
  }

  function isCityIndeterminate(city) {
    const selectedCount = city.children.filter((dataCenter) => {
      return pendingIds.value.includes(dataCenter.id);
    }).length;

    return selectedCount > 0 && selectedCount < city.children.length;
  }

  function isDataCenterSelected(dataCenter) {
    return pendingIds.value.includes(dataCenter.id);
  }

  function toggleAll() {
    if (allSelected.value) {
      pendingIds.value = [];
      return;
    }

    pendingIds.value = [...allDcIds.value];
  }

  function toggleCity(city) {
    const cityIds = city.children.map((dataCenter) => dataCenter.id);

    if (isCitySelected(city)) {
      pendingIds.value = pendingIds.value.filter((id) => !cityIds.includes(id));
      return;
    }

    pendingIds.value = [...new Set([...pendingIds.value, ...cityIds])];
  }

  function toggleDataCenter(dataCenter) {
    if (isDataCenterSelected(dataCenter)) {
      pendingIds.value = pendingIds.value.filter((id) => id !== dataCenter.id);
      return;
    }

    pendingIds.value = [...pendingIds.value, dataCenter.id];
  }

  function toggleItem(item, hasChildren) {
    if (hasChildren) {
      toggleCity(item);
      return;
    }

    toggleDataCenter(item);
  }

  function isCityExpanded(city) {
    if (keyword.value.trim()) {
      return true;
    }

    return expandedCityIds.value.has(city.id);
  }

  function toggleCityExpanded(city) {
    const nextIds = new Set(expandedCityIds.value);

    if (nextIds.has(city.id)) {
      nextIds.delete(city.id);
    } else {
      nextIds.add(city.id);
    }

    expandedCityIds.value = nextIds;
  }

  function cancel() {
    emit('cancel');
  }

  function confirm() {
    if (pendingIds.value.length === 0) {
      return;
    }

    // 保持 Mock 数据顺序，顶部摘要和请求参数不会随点击顺序变化。
    const selectedSet = new Set(pendingIds.value);
    const orderedIds = allDcIds.value.filter((id) => selectedSet.has(id));
    emit('confirm', orderedIds);
  }

  return {
    activeArea,
    activeScope,
    allIndeterminate,
    allSelected,
    areaOptions: AREA_OPTIONS,
    cancel,
    confirm,
    isCityExpanded,
    isCityIndeterminate,
    isCitySelected,
    isDataCenterSelected,
    keyword,
    pendingIds,
    scopeOptions: SCOPE_OPTIONS,
    toggleAll,
    toggleCityExpanded,
    toggleItem,
    visibleTree
  };
}
