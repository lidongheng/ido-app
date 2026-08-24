import { computed, nextTick, ref, watch } from 'vue';

const ALL_OPTION = '全部';

function getUniqueValues(values) {
  return [...new Set(values)];
}

export function useDcSelector(props, emit) {
  const keyword = ref('');
  const pendingIds = ref([]);
  const pendingAllMode = ref(true);
  const expandedCityIds = ref(new Set(props.options.map((city) => city.id)));
  const cityListRef = ref(null);

  const allDcIds = computed(() => {
    return props.options.flatMap((city) => {
      return city.children.map((campus) => campus.id);
    });
  });
  const scopeOptions = computed(() => {
    const scopes = getUniqueValues(props.options.map((city) => city.scope));
    return [
      { label: ALL_OPTION, value: ALL_OPTION },
      ...scopes.map((scope) => ({ label: scope, value: scope }))
    ];
  });
  const areaOptions = computed(() => {
    const areas = props.options.map((city) => city.area);
    return [ALL_OPTION, ...getUniqueValues(areas)];
  });
  const visibleTree = computed(() => {
    const normalizedKeyword = keyword.value.trim();

    return props.options
      .map((city) => {
        let visibleChildren = city.children;

        if (normalizedKeyword && !city.name.includes(normalizedKeyword)) {
          visibleChildren = city.children.filter((campus) => {
            return campus.name.includes(normalizedKeyword);
          });
        }

        return {
          ...city,
          visibleChildren
        };
      })
      .filter((city) => city.visibleChildren.length > 0);
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
    let targetCity = null;
    let targetDataCenter = null;

    visibleTree.value.some((city) => {
      const dataCenter = city.visibleChildren.find((child) => idSet.has(child.id));
      if (!dataCenter) {
        return false;
      }

      targetCity = city;
      targetDataCenter = dataCenter;
      return true;
    });

    if (!targetDataCenter) {
      return;
    }

    if (!expandedCityIds.value.has(targetCity.id)) {
      expandedCityIds.value = new Set([...expandedCityIds.value, targetCity.id]);
    }

    nextTick(() => {
      const container = cityListRef.value;
      if (!container) {
        return;
      }

      const target = [...container.querySelectorAll('[data-selector-id]')].find((element) => {
        return element.dataset.selectorId === targetDataCenter.id;
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
      .filter((city) => city.scope === scope)
      .flatMap((city) => city.children.map((campus) => campus.id));
  }

  function getAreaIds(area) {
    return props.options
      .filter((city) => city.area === area)
      .flatMap((city) => city.children.map((campus) => campus.id));
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

    pendingIds.value = allDcIds.value.filter((id) => selectedIdSet.has(id));
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
      toggleAll();
      return;
    }

    const scopeIds = getScopeIds(scope);
    if (toggleBranch(scopeIds)) {
      scrollToFirstSelected(scopeIds);
    }
  }

  function isAreaSelected(area) {
    if (area === ALL_OPTION) {
      return pendingAllMode.value;
    }

    return isBranchSelected(getAreaIds(area));
  }

  function isAreaIndeterminate(area) {
    if (area === ALL_OPTION) {
      return false;
    }

    return isBranchIndeterminate(getAreaIds(area));
  }

  function toggleArea(area) {
    if (area === ALL_OPTION) {
      toggleAll();
      return;
    }

    const areaIds = getAreaIds(area);
    if (toggleBranch(areaIds)) {
      scrollToFirstSelected(areaIds);
    }
  }

  function isAllSelected() {
    return pendingAllMode.value;
  }

  function toggleAll() {
    if (pendingAllMode.value) {
      pendingIds.value = [];
      pendingAllMode.value = false;
      return;
    }

    pendingIds.value = [...allDcIds.value];
    pendingAllMode.value = true;
    scrollToFirstSelected(allDcIds.value);
  }

  function isCitySelected(city) {
    return isBranchSelected(city.children.map((campus) => campus.id));
  }

  function isCityIndeterminate(city) {
    return isBranchIndeterminate(city.children.map((campus) => campus.id));
  }

  function isDataCenterSelected(dataCenter) {
    return pendingIds.value.includes(dataCenter.id);
  }

  function toggleCity(city) {
    toggleBranch(city.children.map((campus) => campus.id));
  }

  function toggleDataCenter(dataCenter) {
    if (isDataCenterSelected(dataCenter)) {
      pendingIds.value = pendingIds.value.filter((id) => id !== dataCenter.id);
    } else {
      const selectedIdSet = new Set([...pendingIds.value, dataCenter.id]);
      pendingIds.value = allDcIds.value.filter((id) => selectedIdSet.has(id));
    }

    pendingAllMode.value = false;
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

    emit('confirm', {
      allMode: pendingAllMode.value,
      ids: [...pendingIds.value]
    });
  }

  return {
    areaOptions,
    cancel,
    cityListRef,
    confirm,
    isAllSelected,
    isAreaIndeterminate,
    isAreaSelected,
    isCityExpanded,
    isCityIndeterminate,
    isCitySelected,
    isDataCenterSelected,
    isScopeIndeterminate,
    isScopeSelected,
    keyword,
    pendingIds,
    scopeOptions,
    toggleArea,
    toggleAll,
    toggleCityExpanded,
    toggleItem,
    toggleScope,
    visibleTree
  };
}
