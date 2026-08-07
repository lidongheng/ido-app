import { computed, onBeforeUnmount, ref, watch } from 'vue';

const ALL_OPTION = '全部';

function getUniqueValues(values) {
  return [...new Set(values)];
}

export function useRegionSelector(props, emit) {
  const keyword = ref('');
  const pendingIds = ref([]);
  const pendingAllMode = ref(true);
  let lockedScrollTop = 0;

  const allRegionIds = computed(() => props.options.map((option) => option.id));
  const scopeOptions = computed(() => {
    const scopes = getUniqueValues(props.options.map((option) => option.scope));
    return [
      { label: ALL_OPTION, value: ALL_OPTION },
      ...scopes.map((scope) => ({ label: scope, value: scope }))
    ];
  });
  const areaOptions = computed(() => {
    const areas = props.options.map((option) => option.area);
    return getUniqueValues(areas);
  });
  const visibleOptions = computed(() => {
    const normalizedKeyword = keyword.value.trim();

    return props.options.filter((option) => {
      return option.name.includes(normalizedKeyword);
    });
  });

  watch(() => props.visible, (value) => {
    if (!value) {
      unlockPageScroll();
      return;
    }

    lockPageScroll();
    pendingIds.value = [...props.selectedIds];
    pendingAllMode.value = props.allMode;
    keyword.value = '';
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

  function getScopeIds(scope) {
    return props.options
      .filter((option) => option.scope === scope)
      .map((option) => option.id);
  }

  function getAreaIds(area) {
    return props.options
      .filter((option) => option.area === area)
      .map((option) => option.id);
  }

  function isBranchSelected(ids) {
    return ids.length > 0 && ids.every((id) => pendingIds.value.includes(id));
  }

  function isBranchIndeterminate(ids) {
    const selectedCount = ids.filter((id) => pendingIds.value.includes(id)).length;
    return selectedCount > 0 && selectedCount < ids.length;
  }

  function toggleBranch(ids) {
    const selectedIdSet = new Set(pendingIds.value);

    if (isBranchSelected(ids)) {
      ids.forEach((id) => selectedIdSet.delete(id));
    } else {
      ids.forEach((id) => selectedIdSet.add(id));
    }

    pendingIds.value = allRegionIds.value.filter((id) => selectedIdSet.has(id));
    pendingAllMode.value = false;
  }

  function isScopeSelected(scope) {
    if (scope === ALL_OPTION) {
      return pendingAllMode.value;
    }

    return isBranchSelected(getScopeIds(scope));
  }

  function isScopeIndeterminate(scope) {
    if (scope === ALL_OPTION) {
      return false;
    }

    return isBranchIndeterminate(getScopeIds(scope));
  }

  function toggleScope(scope) {
    if (scope === ALL_OPTION) {
      if (pendingAllMode.value) {
        pendingIds.value = [];
        pendingAllMode.value = false;
        return;
      }

      pendingIds.value = [...allRegionIds.value];
      pendingAllMode.value = true;
      return;
    }

    toggleBranch(getScopeIds(scope));
  }

  function isAreaSelected(area) {
    return isBranchSelected(getAreaIds(area));
  }

  function isAreaIndeterminate(area) {
    return isBranchIndeterminate(getAreaIds(area));
  }

  function toggleArea(area) {
    toggleBranch(getAreaIds(area));
  }

  function isRegionSelected(option) {
    return pendingIds.value.includes(option.id);
  }

  function toggleRegion(option) {
    if (isRegionSelected(option)) {
      pendingIds.value = pendingIds.value.filter((id) => id !== option.id);
    } else {
      const selectedIdSet = new Set([...pendingIds.value, option.id]);
      pendingIds.value = allRegionIds.value.filter((id) => selectedIdSet.has(id));
    }

    pendingAllMode.value = false;
  }

  function cancel() {
    emit('cancel');
  }

  function confirm() {
    if (pendingIds.value.length === 0) {
      return;
    }

    emit('confirm', {
      allMode: pendingAllMode.value,
      ids: [...pendingIds.value]
    });
  }

  return {
    areaOptions,
    cancel,
    confirm,
    isAreaIndeterminate,
    isAreaSelected,
    isRegionSelected,
    isScopeIndeterminate,
    isScopeSelected,
    keyword,
    pendingIds,
    scopeOptions,
    toggleArea,
    toggleRegion,
    toggleScope,
    visibleOptions
  };
}
