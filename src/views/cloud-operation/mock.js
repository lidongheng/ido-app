const REGION_OPTIONS = [
  { id: 'cn-north-beijing-1', name: '华北-北京一', scope: '国内', area: '华北' },
  { id: 'cn-north-beijing-2', name: '华北-北京二', scope: '国内', area: '华北' },
  { id: 'cn-north-beijing-4', name: '华北-北京四', scope: '国内', area: '华北' },
  { id: 'cn-north-ulanchabu-1', name: '华北-乌兰察布一', scope: '国内', area: '华北' },
  { id: 'cn-north-3', name: '华北三', scope: '国内', area: '华北' },
  { id: 'cn-east-shanghai-1', name: '华东-上海一', scope: '国内', area: '华东' },
  { id: 'cn-east-shanghai-2', name: '华东-上海二', scope: '国内', area: '华东' },
  { id: 'cn-east-2', name: '华东-华东二', scope: '国内', area: '华东' },
  { id: 'cn-east-qingdao-1', name: '华东-青岛', scope: '国内', area: '华东' },
  { id: 'cn-south-shenzhen-1', name: '华南-深圳一', scope: '国内', area: '华南' },
  { id: 'cn-southwest-guiyang-1', name: '西南-贵阳一', scope: '国内', area: '西南' },
  { id: 'cn-northwest-xian-1', name: '西北-西安一', scope: '国内', area: '西北' },
  { id: 'ap-singapore-1', name: '亚太-新加坡一', scope: '海外', area: '亚太' },
  { id: 'me-riyadh-1', name: '中东-利雅得一', scope: '海外', area: '中东' },
  { id: 'af-johannesburg-1', name: '非洲-约翰内斯堡一', scope: '海外', area: '非洲' },
  { id: 'la-santiago-1', name: '拉美-圣地亚哥一', scope: '海外', area: '拉美' },
  { id: 'eu-paris-1', name: '欧洲-巴黎一', scope: '海外', area: '欧洲' },
  { id: 'tr-istanbul-1', name: '土耳其-伊斯坦布尔一', scope: '海外', area: '土耳其' }
]

const DC_FILTER_OPTIONS = [
  {
    id: 'city-wuhu',
    name: '芜湖',
    scope: '国内',
    area: '华东',
    children: [
      { id: 'dc-wuhu-jiangbei', name: '芜湖江北数据中心' },
      { id: 'dc-wuhu-sanshan', name: '芜湖三山数据中心' },
      { id: 'dc-wuhu-vocational', name: '芜湖职教数据中心' }
    ]
  },
  {
    id: 'city-guian',
    name: '贵安新区',
    scope: '国内',
    area: '西部',
    children: [
      { id: 'dc-guian-1', name: '贵安新区一号数据中心' },
      { id: 'dc-guian-2', name: '贵安新区二号数据中心' }
    ]
  },
  {
    id: 'city-ulanchabu',
    name: '乌兰察布市',
    scope: '国内',
    area: '华北',
    children: [
      { id: 'dc-ulanchabu-1', name: '乌兰察布一号数据中心' },
      { id: 'dc-ulanchabu-2', name: '乌兰察布二号数据中心' }
    ]
  },
  {
    id: 'city-horinger',
    name: '和林格尔',
    scope: '国内',
    area: '华北',
    children: [
      { id: 'dc-horinger-1', name: '和林格尔数据中心' }
    ]
  },
  {
    id: 'city-shenzhen',
    name: '深圳',
    scope: '国内',
    area: '华南',
    children: [
      { id: 'dc-shenzhen-1', name: '深圳一号数据中心' }
    ]
  },
  {
    id: 'city-singapore',
    name: '新加坡',
    scope: '海外',
    area: '亚太',
    children: [
      { id: 'dc-singapore-1', name: '新加坡一号数据中心' }
    ]
  },
  {
    id: 'city-dubai',
    name: '迪拜',
    scope: '海外',
    area: '中东中亚',
    children: [
      { id: 'dc-dubai-1', name: '迪拜数据中心' }
    ]
  },
  {
    id: 'city-cairo',
    name: '开罗',
    scope: '海外',
    area: '北部非洲',
    children: [
      { id: 'dc-cairo-1', name: '开罗数据中心' }
    ]
  },
  {
    id: 'city-johannesburg',
    name: '约翰内斯堡',
    scope: '海外',
    area: '南部非洲',
    children: [
      { id: 'dc-johannesburg-1', name: '约翰内斯堡数据中心' }
    ]
  },
  {
    id: 'city-paris',
    name: '巴黎',
    scope: '海外',
    area: '欧洲',
    children: [
      { id: 'dc-paris-1', name: '巴黎数据中心' }
    ]
  },
  {
    id: 'city-saopaulo',
    name: '圣保罗',
    scope: '海外',
    area: '拉美',
    children: [
      { id: 'dc-saopaulo-1', name: '圣保罗数据中心' }
    ]
  }
]

function resolveAfter() {
  // 故障模拟：业务 Mock 统一 reject，鉴权 Mock 不经过这里。
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('模拟业务接口请求失败'));
    }, 280);
  });
}

function getUniqueValues(values) {
  return [...new Set(values)];
}

function buildRegionOptionTree() {
  const insideOutsideNames = getUniqueValues(REGION_OPTIONS.map((region) => region.scope));

  return insideOutsideNames.map((insideOutside) => {
    const scopeRegions = REGION_OPTIONS.filter((region) => region.scope === insideOutside);
    const areaNames = getUniqueValues(scopeRegions.map((region) => region.area));

    return {
      id: null,
      dimensionCode: null,
      dimensionLevelL1: insideOutside,
      dimensionLevelL2: null,
      dimensionLevelL3: null,
      dimensionLevelL4: null,
      delFlag: null,
      list: areaNames.map((areaName) => {
        const areaRegions = scopeRegions.filter((region) => region.area === areaName);

        return {
          id: null,
          dimensionCode: null,
          dimensionLevelL1: null,
          dimensionLevelL2: areaName,
          dimensionLevelL3: null,
          dimensionLevelL4: null,
          delFlag: null,
          list: areaRegions.map((region) => ({
            id: region.id,
            dimensionCode: 'resource',
            dimensionLevelL1: insideOutside,
            dimensionLevelL2: areaName,
            dimensionLevelL3: region.name,
            dimensionLevelL4: null,
            delFlag: false,
            list: null
          }))
        };
      })
    };
  });
}

function buildDcOptionTree() {
  const insideOutsideNames = getUniqueValues(DC_FILTER_OPTIONS.map((city) => city.scope));

  return insideOutsideNames.map((insideOutside) => {
    const scopeCities = DC_FILTER_OPTIONS.filter((city) => city.scope === insideOutside);
    const areaNames = getUniqueValues(scopeCities.map((city) => city.area));

    return {
      insideOutside,
      children: areaNames.map((areaName) => {
        const areaCities = scopeCities.filter((city) => city.area === areaName);

        return {
          insideOutside,
          areaName,
          children: areaCities.map((city) => ({
            insideOutside,
            areaName,
            cityName: city.name,
            children: city.children.map((campus) => ({
              insideOutside,
              areaName,
              cityName: city.name,
              campusName: campus.name,
              children: null
            }))
          }))
        };
      })
    };
  });
}

function getQueryContext({ date, regionIds }) {
  const selectedRegions = REGION_OPTIONS.filter((region) => regionIds.includes(region.id))
  const regionRatio = selectedRegions.length / REGION_OPTIONS.length
  const dateVariation = Number(date.slice(-2)) % 5

  return {
    selectedRegions,
    regionRatio,
    dateVariation
  }
}

function scaleValue(value, regionRatio, dateVariation, precision) {
  let dateAdjustment = dateVariation * 0.01

  if (precision === 0) {
    dateAdjustment = dateVariation
  }

  const result = value * regionRatio + dateAdjustment
  return Number(result.toFixed(precision))
}

function isSelected(regionIds, regionId) {
  return regionIds.includes(regionId)
}

function buildResourceAreaCards(regionIds) {
  const cards = [
    {
      name: '华东',
      regionIds: ['cn-east-shanghai-1', 'cn-east-shanghai-2', 'cn-east-2', 'cn-east-qingdao-1'],
      metrics: [
        { label: '服务器', value: 216.1, unit: '万台', icon: 'desktop-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: '通算服务器', value: 182.19, unit: '万台', icon: 'orders-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: '智算卡', value: 46.34, unit: '万卡', icon: 'points', trend: { label: '环比', direction: 'down', tone: 'success', value: 854, unit: '万卡' } }
      ],
      details: [
        { regionId: 'cn-east-shanghai-1', name: '华东-上海一' },
        { regionId: 'cn-east-shanghai-2', name: '华东-上海二' },
        { regionId: 'cn-east-2', name: '华东-华东二' },
        { regionId: 'cn-east-qingdao-1', name: '华东-青岛' }
      ]
    },
    {
      name: '华南',
      regionIds: ['cn-south-shenzhen-1'],
      metrics: [
        { label: '服务器', value: 216.1, unit: '万台', icon: 'desktop-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: '通算服务器', value: 182.19, unit: '万台', icon: 'orders-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: '智算卡', value: 46.34, unit: '万卡', icon: 'points', trend: { label: '环比', direction: 'down', tone: 'success', value: 854, unit: '万卡' } }
      ],
      details: [
        { regionId: 'cn-south-shenzhen-1', name: '华南-深圳一' }
      ]
    },
    {
      name: '西南',
      regionIds: ['cn-southwest-guiyang-1'],
      metrics: [
        { label: '服务器', value: 216.1, unit: '万台', icon: 'desktop-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: '通算服务器', value: 182.19, unit: '万台', icon: 'orders-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: '智算卡', value: 46.34, unit: '万卡', icon: 'points', trend: { label: '环比', direction: 'down', tone: 'success', value: 854, unit: '万卡' } }
      ],
      details: [
        { regionId: 'cn-southwest-guiyang-1', name: '西南-贵阳一' }
      ]
    },
    {
      name: '华北',
      regionIds: ['cn-north-beijing-1', 'cn-north-beijing-2', 'cn-north-beijing-4', 'cn-north-ulanchabu-1', 'cn-north-3'],
      metrics: [
        { label: '服务器', value: 238.42, unit: '万台', icon: 'desktop-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.18, unit: '%' } },
        { label: '通算服务器', value: 196.34, unit: '万台', icon: 'orders-o', trend: { label: '环比', direction: 'down', tone: 'success', value: 0.16, unit: '%' } },
        { label: '智算卡', value: 52.16, unit: '万卡', icon: 'points', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.12, unit: '%' } }
      ],
      details: [
        { regionId: 'cn-north-beijing-1', name: '华北-北京一' },
        { regionId: 'cn-north-beijing-2', name: '华北-北京二' },
        { regionId: 'cn-north-beijing-4', name: '华北-北京四' },
        { regionId: 'cn-north-ulanchabu-1', name: '华北-乌兰察布一' },
        { regionId: 'cn-north-3', name: '华北三' }
      ]
    },
    {
      name: '海外',
      regionIds: ['ap-singapore-1', 'me-riyadh-1', 'af-johannesburg-1', 'la-santiago-1', 'eu-paris-1', 'tr-istanbul-1'],
      metrics: [
        { label: '服务器', value: 98.64, unit: '万台', icon: 'desktop-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.08, unit: '%' } },
        { label: '通算服务器', value: 76.21, unit: '万台', icon: 'orders-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.06, unit: '%' } },
        { label: '智算卡', value: 22.43, unit: '万卡', icon: 'points', trend: { label: '环比', direction: 'down', tone: 'success', value: 0.09, unit: '%' } }
      ],
      details: [
        { regionId: 'ap-singapore-1', name: '亚太-新加坡一' },
        { regionId: 'me-riyadh-1', name: '中东-利雅得一' },
        { regionId: 'eu-paris-1', name: '欧洲-巴黎一' }
      ]
    }
  ]

  return cards
    .filter((card) => card.regionIds.some((regionId) => isSelected(regionIds, regionId)))
    .map((card) => ({
      ...card,
      details: card.details
        .filter((detail) => isSelected(regionIds, detail.regionId))
        .map((detail) => ({
          ...detail,
          metrics: [
            { label: '服务器', value: 18.12, unit: '万台' },
            { label: '通算服务器', value: 15.19, unit: '万台' },
            { label: '智算卡', value: 5.12, unit: '万卡' }
          ]
        }))
    }))
}

function buildDcCityCards(dcIds) {
  return DC_FILTER_OPTIONS
    .filter((city) => city.id !== 'city-wuhu')
    .map((city) => ({
      ...city,
      children: city.children.filter((dataCenter) => dcIds.includes(dataCenter.id))
    }))
    .filter((city) => city.children.length > 0)
    .map((city) => ({
      name: city.name,
      metrics: [
        { label: '投产机柜', value: 614842, unit: '个', icon: 'records', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: '启用机柜', value: 600410, unit: '个', icon: 'completed', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: '机柜启用率', value: 86.34, unit: '%', icon: 'underway-o', trend: { label: '环比', direction: 'down', tone: 'success', value: 8.54, unit: '%' } }
      ],
      details: city.children.map((dataCenter) => ({
          name: dataCenter.name,
          metrics: [
            { label: '投产机柜', value: 201512, unit: '个' },
            { label: '启用机柜', value: 200100, unit: '个' },
            { label: '机柜启用率', value: 88.19, unit: '%' }
          ]
        }))
    }))
}

export function getRegionOptions() {
  return resolveAfter({
    status: 200,
    data: buildRegionOptionTree()
  });
}

export function getDcFilterOptions() {
  return resolveAfter({
    status: 200,
    data: buildDcOptionTree()
  });
}

function getSelectedRegionIds(filters) {
  return REGION_OPTIONS
    .filter((region) => {
      const matchesInsideOutside = filters.insideOutsideList.length === 0
        || filters.insideOutsideList.includes(region.scope);
      const matchesArea = filters.areaNameList.length === 0
        || filters.areaNameList.includes(region.area);
      const matchesRegion = filters.regionNameList.length === 0
        || filters.regionNameList.includes(region.name);

      return matchesInsideOutside && matchesArea && matchesRegion;
    })
    .map((region) => region.id);
}

function getSelectedDcIds(filters) {
  return DC_FILTER_OPTIONS.flatMap((city) => {
    const matchesInsideOutside = filters.insideOutsideList.length === 0
      || filters.insideOutsideList.includes(city.scope);
    const matchesArea = filters.areaNameList.length === 0
      || filters.areaNameList.includes(city.area);
    const matchesCity = filters.cityNameList.length === 0
      || filters.cityNameList.includes(city.name);

    if (!matchesInsideOutside || !matchesArea || !matchesCity) {
      return [];
    }

    return city.children
      .filter((campus) => {
        return filters.campusNameList.length === 0
          || filters.campusNameList.includes(campus.name);
      })
      .map((campus) => campus.id);
  });
}

export function getResourceOverview(filters) {
  const { date } = filters;
  const regionIds = getSelectedRegionIds(filters);
  const { regionRatio, dateVariation } = getQueryContext({ date, regionIds });
  const ecsChildren = [
    { regionId: 'cn-north-beijing-4', name: '华北-北京四' },
    { regionId: 'cn-north-ulanchabu-1', name: '华北-乌兰察布一' },
    { regionId: 'cn-north-3', name: '华北三' }
  ]
    .filter((item) => isSelected(regionIds, item.regionId))
    .map((item) => ({
      ...item,
      metrics: [
        { label: '服务器', value: 18.12, unit: '万台' },
        { label: '通算服务器', value: 15.19, unit: '万台' },
        { label: '智算卡', value: 5.12, unit: '万卡' }
      ]
    }))

  const data = {
    overview: [
      { label: '服务器', value: scaleValue(102.8, regionRatio, dateVariation, 2), unit: '万台', icon: 'desktop-o', trend: { label: '较上日', direction: 'down', tone: 'danger', value: 1.41, unit: '万台' } },
      { label: '运营总量', value: scaleValue(298.41, regionRatio, dateVariation, 2), unit: '万核', icon: 'balance-list-o', trend: { label: '较上日', direction: 'up', tone: 'success', value: 1.82, unit: '万核' } },
      { label: '资产在线率', value: 92.16, unit: '%', icon: 'shield-o', trend: { label: '较上日', direction: 'down', tone: 'danger', value: 1.41, unit: '%' } }
    ],
    intelligence: {
      summary: [
        { label: '昇腾卡数', value: scaleValue(46.34, regionRatio, dateVariation, 2), unit: '万卡', icon: 'points', trend: { label: '环比', direction: 'down', tone: 'success', value: 854, unit: '万卡' } },
        { label: '卡时使用率', value: 82.19, unit: '%', icon: 'underway-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } },
        { label: 'AI Core利用率', value: 82.19, unit: '%', icon: 'shield-o', trend: { label: '环比', direction: 'up', tone: 'danger', value: 0.24, unit: '%' } }
      ],
      modes: [
        {
          name: 'Token模式',
          metrics: [
            { label: 'Token卡数', value: 18.12, unit: '万卡' },
            { label: '日Token数', value: 25.12, unit: '亿' },
            { label: 'Token利用率', value: 85.12, unit: '%' }
          ]
        },
        {
          name: '算力模式',
          metrics: [
            { label: '算力卡数', value: 532.56, unit: '万卡' },
            { label: '内部客户', value: 6.11, unit: '万卡' },
            { label: '外部客户', value: 12.01, unit: '万卡' }
          ]
        }
      ]
    },
    general: {
      summary: [
        { label: '通算服务器', value: scaleValue(102.12, regionRatio, dateVariation, 2), unit: '万台', icon: 'desktop-o', trend: { label: '环比', direction: 'down', tone: 'success', value: 854, unit: '' } },
        { label: '运营总量', value: scaleValue(212.11, regionRatio, dateVariation, 2), unit: '万核', icon: 'balance-list-o', trend: { label: '较上日', direction: 'up', tone: 'success', value: 1.82, unit: '万核' } },
        { label: 'CPU使用率', value: 89.19, unit: '%', icon: 'underway-o', trend: { label: '环比', direction: 'down', tone: 'success', value: 8.54, unit: '%' } }
      ],
      tree: [
        {
          name: 'ECS',
          metrics: [
            { label: '运营总量', value: 125.12, unit: '万核' },
            { label: '分配率', value: 85.12, unit: '%' }
          ],
          children: ecsChildren
        }
      ],
      areaCards: buildResourceAreaCards(regionIds)
    }
  }

  return resolveAfter({
    status: 200,
    data
  })
}

export function getDcOverview(filters) {
  const { date } = filters;
  const dcIds = getSelectedDcIds(filters);
  const allDcIds = DC_FILTER_OPTIONS.flatMap((city) => {
    return city.children.map((dataCenter) => dataCenter.id);
  });
  const totalDcCount = allDcIds.length
  const dcRatio = dcIds.length / totalDcCount
  const dateVariation = Number(date.slice(-2)) % 5
  const wuhu = DC_FILTER_OPTIONS.find((city) => city.id === 'city-wuhu')
  const selectedWuhuChildren = wuhu.children.filter((dataCenter) => dcIds.includes(dataCenter.id))
  const cityTree = []

  /*
   * 这是 DC 页“服务器 + 客户”模块的特殊产品规则，不属于通用筛选逻辑：
   * 1. 只有完整选中所有数据中心叶子节点时，该模块才允许展示；少选任意叶子节点都必须隐藏。
   * 2. 不能使用顶部的“全部”摘要文案或城市父节点状态判断，因为它们只是展示状态，不是请求条件。
   * 3. 完整集合直接从 DC_FILTER_OPTIONS 的 children 生成，后续新增数据中心时会自动进入全选校验范围。
   * 4. 同时校验数量和 ID，可以避免重复 ID 或非筛选项 ID 被错误识别为全选。
   */
  const selectedDcIdSet = new Set(dcIds);
  const isAllDataCentersSelected = dcIds.length === allDcIds.length
    && allDcIds.every((dcId) => selectedDcIdSet.has(dcId));
  let usageGroups = [];

  if (isAllDataCentersSelected) {
    usageGroups = [
      {
        title: '服务器',
        icon: 'desktop-o',
        items: [
          { label: '通算', value: 480, unit: '台', percent: 86 },
          { label: '智算', value: 480, unit: '卡', percent: 86 }
        ]
      },
      {
        title: '客户',
        icon: 'manager-o',
        items: [
          { label: '已用', value: 408, unit: '台', percent: 74 },
          { label: '已用', value: 408, unit: '卡', percent: 74 }
        ]
      }
    ];
  }

  if (selectedWuhuChildren.length > 0) {
    cityTree.push({
      name: '芜湖',
      metrics: [
        { label: '投产机柜', value: 604536, unit: '个' },
        { label: '启用机柜', value: 589300, unit: '个' },
        { label: '机柜启用率', value: 87.42, unit: '%' }
      ],
      children: selectedWuhuChildren.map((dataCenter) => ({
        name: dataCenter.name.replace('芜湖', ''),
        metrics: [{ label: '投产机柜', value: 201512, unit: '个' }, { label: '启用机柜', value: 200100, unit: '个' }, { label: '机柜启用率', value: 88.19, unit: '%' }]
      }))
    })
  }

  const data = {
    overview: [
      { label: '投产园区', value: scaleValue(87, dcRatio, dateVariation, 0), unit: '个', icon: 'wap-home-o' },
      { label: '投产DC', value: scaleValue(155, dcRatio, dateVariation, 0), unit: '个', icon: 'hotel-o' },
      { label: '已建机电', value: scaleValue(784554, dcRatio, dateVariation, 0), unit: '柜', icon: 'records' }
    ],
    progressGroups: [
      {
        title: '土地',
        subtitle: '提前储备',
        status: '规划',
        icon: 'location-o',
        rows: [
          { label: '土地', value: '1,130', unit: '亩', percent: 100 }
        ]
      },
      {
        title: '楼栋',
        subtitle: '楼宇先行',
        status: '规划',
        icon: 'wap-home-o',
        rows: [
          { label: '已建成', value: 7, unit: '栋', percent: 78 },
          { label: '在建', value: 2, unit: '栋', percent: 22 }
        ]
      },
      {
        title: '机电',
        subtitle: '滚动交付',
        status: '建成',
        icon: 'completed',
        rows: [
          { label: '已建机电', value: '15,800', unit: '机柜', percent: 82 }
        ]
      },
      {
        title: '机柜',
        subtitle: '按需部署',
        status: '建成',
        icon: 'records',
        rows: [
          { label: '已部署服务器', value: '9,800', unit: '机柜', percent: 74 }
        ]
      }
    ],
    /*
     * 非全选时必须返回空数组，让页面彻底移除模块；这里不能返回空分组、占位数据，
     * 也不能根据已选 DC 比例缩放数值。本次需求只处理显隐，资源页数据对齐留待后续需求。
     */
    usageGroups,
    cityTree,
    cityCards: buildDcCityCards(dcIds)
  }

  return resolveAfter({
    status: 200,
    data
  })
}
