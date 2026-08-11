import { computed, nextTick, ref, watch } from 'vue';

const ALL_OPTION = '全部';

function getUniqueValues(values) {
  return [...new Set(values)];
}

export function useRegionSelector(props, emit) {
  const keyword = ref('');
  const pendingIds = ref([]);
  const pendingAllMode = ref(true);
  const regionListRef = ref(null);

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
      return;
    }

    pendingIds.value = [...props.selectedIds];
    pendingAllMode.value = props.allMode;
    keyword.value = '';
    scrollToFirstSelected(pendingIds.value);
  });

  function scrollToFirstSelected(ids) {
    const idSet = new Set(ids);
    const firstSelectedOption = visibleOptions.value.find((option) => {
      return idSet.has(option.id);
    });

    if (!firstSelectedOption) {
      return;
    }

    nextTick(() => {
      const container = regionListRef.value;
      if (!container) {
        return;
      }

      const target = [...container.querySelectorAll('[data-selector-id]')].find((element) => {
        return element.dataset.selectorId === firstSelectedOption.id;
      });
      if (!target) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetVisible = targetRect.top >= containerRect.top - 1
        && targetRect.bottom <= containerRect.bottom + 1;
      if (targetVisible) {
        return;
      }

      container.scrollTop += targetRect.top - containerRect.top;
    });
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
    const selecting = !isBranchSelected(ids);

    if (!selecting) {
      ids.forEach((id) => selectedIdSet.delete(id));
    } else {
      ids.forEach((id) => selectedIdSet.add(id));
    }

    pendingIds.value = allRegionIds.value.filter((id) => selectedIdSet.has(id));
    pendingAllMode.value = false;
    return selecting;
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
      scrollToFirstSelected(allRegionIds.value);
      return;
    }

    const scopeIds = getScopeIds(scope);
    if (toggleBranch(scopeIds)) {
      scrollToFirstSelected(scopeIds);
    }
  }

  function isAreaSelected(area) {
    return isBranchSelected(getAreaIds(area));
  }

  function isAreaIndeterminate(area) {
    return isBranchIndeterminate(getAreaIds(area));
  }

  function toggleArea(area) {
    const areaIds = getAreaIds(area);
    if (toggleBranch(areaIds)) {
      scrollToFirstSelected(areaIds);
    }
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
    regionListRef,
    scopeOptions,
    toggleArea,
    toggleRegion,
    toggleScope,
    visibleOptions
  };
}
