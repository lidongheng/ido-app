import { computed, ref, watch } from 'vue';

const INITIAL_DRAWER_HEIGHT = '60vh';
const MIN_DRAWER_HEIGHT_RATIO = 0.3;
const MAX_DRAWER_HEIGHT_RATIO = 0.9;

const commonDrawerColumns = [
  { prop: 'total', label: '总卡数\n(万卡)', minWidth: 68, align: 'center' },
  { prop: 'assigned', label: '已分配\n卡数(卡)', minWidth: 72, align: 'center' },
  { prop: 'usage', label: '卡时使\n用率', minWidth: 62, align: 'center' },
  { prop: 'coreUsage', label: 'AI Core\n利用率', minWidth: 70, align: 'center' },
];

const drawerColumnMap = {
  common: [
    { prop: 'computeType', label: '算力类型', minWidth: 58, align: 'left' },
    ...commonDrawerColumns,
  ],
  card: [
    { prop: 'computePower', label: '算力类型', minWidth: 58, align: 'left' },
    ...commonDrawerColumns,
  ],
  customer: [
    { prop: 'maosPoolName', label: '业务集群', minWidth: 70, align: 'left' },
    ...commonDrawerColumns,
  ],
  region: [
    { prop: 'clusterId', label: '资源池', minWidth: 70, align: 'left' },
    { prop: 'cardModel', label: '卡类型', minWidth: 58, align: 'left' },
    ...commonDrawerColumns,
  ],
};

const drawerTableConfig = {
  size: 'small',
};

export function useDetailDrawer(visible, detailType) {
  const drawerRef = ref();
  const drawerHeight = ref(INITIAL_DRAWER_HEIGHT);
  let activePointerId = null;
  let dragStartY = 0;
  let dragStartHeight = 0;

  const drawerStyle = computed(() => {
    return {
      height: drawerHeight.value,
    };
  });

  const drawerColumns = computed(() => {
    return drawerColumnMap[detailType()];
  });

  watch(visible, (value) => {
    if (value) {
      drawerHeight.value = INITIAL_DRAWER_HEIGHT;
    }
  });

  function handleDragStart(event) {
    activePointerId = event.pointerId;
    dragStartY = event.clientY;
    dragStartHeight = drawerRef.value.getBoundingClientRect().height;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function handleDragMove(event) {
    if (event.pointerId !== activePointerId) {
      return;
    }

    const minHeight = window.innerHeight * MIN_DRAWER_HEIGHT_RATIO;
    const maxHeight = window.innerHeight * MAX_DRAWER_HEIGHT_RATIO;
    // 指针向上移动时增加抽屉高度，并限制在当前视口的 30% 到 90%。
    const nextHeight = dragStartHeight + dragStartY - event.clientY;
    const limitedHeight = Math.min(Math.max(nextHeight, minHeight), maxHeight);

    drawerHeight.value = `${limitedHeight}px`;
    event.preventDefault();
  }

  function handleDragEnd(event) {
    if (event.pointerId !== activePointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    activePointerId = null;
  }

  return {
    drawerColumns,
    drawerRef,
    drawerStyle,
    drawerTableConfig,
    handleDragEnd,
    handleDragMove,
    handleDragStart,
  };
}
