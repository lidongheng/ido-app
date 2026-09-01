import { SIMULATE_BUSINESS_API_FAILURE } from './mockConfig.js';

const MOCK_DELAY = 280;

function resolveMockResponse(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_BUSINESS_API_FAILURE) {
        reject(new Error('模拟业务接口请求失败'));
        return;
      }

      resolve({
        status: 200,
        data,
      });
    }, MOCK_DELAY);
  });
}

function resolveAiComputeMockResponse(data) {
  return resolveMockResponse(data).then((response) => {
    return {
      ...response,
      message: 'SUCCESS',
      messageEn: 'SUCCESS',
    };
  });
}

export function getAiComputeOverview(filters) {
  return resolveAiComputeMockResponse({
    xpuOverview: {
      id: null,
      operationsTotal: 10000.000000,
      allocationTotal: 123.000000,
      yearPlan: 1233.000000,
      yearAddTotal: 1234.000000,
      e2eCardHourRate: 0.920000,
      cardHourRate: 0.980000,
      aiCoreRate: 0.990000,
      dataYear: '2026',
      dataMonth: '202603',
      dataDate: '20260313',
      delFlag: null,
    },
    cardModelList: [
      {
        id: null,
        regionId: 'svc',
        regionName: '华西',
        cardModel: 'A2',
        computePower: null,
        maosPoolName: null,
        customerCategoryL1: '外部客户',
        customerCategoryL2: null,
        customerCategoryL3: null,
        operationsTotal: 10000.000000,
        operationsTotalScale: 1.0000000000,
        allocationTotal: 123.000000,
        minXpuQty: 123.000000,
        usedXpuQty: 123.000000,
        operationsXpuQty: 22.000000,
        cardModelName: 'A2',
        cardModelDesc: 'A2卡',
        cardModelType: 'A2',
        cardModelTypeDesc: 'A2卡',
        allocateXpuQty: 33.000000,
        aiCoreRate: 0.9900000,
        yearPlan: 123.000000,
        lastYearTotal: 123.000000,
        yearAddTotal: 123.000000,
        dataYear: '2026',
        dataMonth: '202603',
        dataDate: '20260313',
        delFlag: null,
        cardTimeUseRate: 1.0000000000,
        aiCoreTemporaryValue: 9900.0000000000,
        e2eCardTimeUseRate: 1.5000000000,
        aiCoreUtilization: 0.9900000000,
      },
    ],
    regionList: [
      {
        regionId: 'svc',
        regionName: '华西',
        operationsTotal: 10000.000000,
        operationsTotalScale: 1.0000000000,
      },
    ],
    customerList: [
      {
        customerCategoryL1: '外部客户',
        operationsTotal: 10000.000000,
        operationsTotalScale: 1.0000000000,
      },
    ],
  });
}

export function getAiComputeTokenOverview(filters) {
  return resolveAiComputeMockResponse({
    tokenOverview: {
      id: null,
      model: 'DeepSeek-V3.2',
      poolNameGroup: '',
      cardModel: 'A3',
      customerType: '',
      customerName: '',
      xpuTotal: '0',
      tokenCardTotal: '16084',
      dayTokenTotal: '4962.75425572',
      theoryDayTokenTotal: '15336.07299072',
      peakTpm: '1304433570',
      theoryTpmCapacity: '106500.50688',
      avgTpm: '344635.712203146',
      peakRpm: '405782',
      theoryRpmCapacity: '422029.04415319',
      avgRpm: '175432.321527699',
      dataDate: '20260313',
      tokenUtilization: '0.323600068',
    },
    modelList: [
      {
        id: null,
        model: 'DeepSeek-V3.2',
        poolNameGroup: '',
        cardModel: 'A3',
        customerType: '',
        customerName: '',
        xpuTotal: '0',
        tokenCardTotal: '16084',
        dayTokenTotal: '4962.75425572',
        theoryDayTokenTotal: '15336.07299072',
        peakTpm: '1304433570',
        theoryTpmCapacity: '106500.50688',
        avgTpm: '344635.712203146',
        peakRpm: '405782',
        theoryRpmCapacity: '422029.04415319',
        avgRpm: '175432.321527699',
        dataDate: '20260313',
        tokenUtilization: '0.323600068',
      },
    ],
  });
}

export function getAiComputeDetail(params) {
  return resolveAiComputeMockResponse([
    {
      id: null,
      regionId: 'svc',
      regionName: '华西',
      cardModel: 'A2',
      computePower: null,
      maosPoolName: null,
      customerCategoryL1: '外部客户',
      customerCategoryL2: null,
      customerCategoryL3: null,
      operationsTotal: 10000.000000,
      operationsTotalScale: null,
      allocationTotal: 123.000000,
      minXpuQty: 123.000000,
      usedXpuQty: 123.000000,
      operationsXpuQty: 22.000000,
      allocationXpuQty: 33.000000,
      aiCoreRate: 0.990000,
      yearPlan: 123.000000,
      lastYearTotal: 123.000000,
      yearAddTotal: 123.000000,
      dataYear: '2026',
      dataMonth: '202603',
      dataDate: '20260313',
      delFlag: null,
      cardTimeUseRate: 1.0000000000,
      aiCoreTemporaryValue: 9900.0000000000,
      e2eCardTimeUseRate: 1.5000000000,
      aiCoreUtilization: 0.9900000000,
    },
  ]);
}

export function getDcOverview() {
  return resolveMockResponse({
    inProductCampusNum: 87,
    inProductDcNum: 155,
    totalCompleteRack: 784554,
    totalPlannedLandArea: 1130,
    totalCompleteBuild: 7,
    underConstruction: 2,
    totalDeployRack: 9800,
    inUsePmNum: 480,
    inUseCardNum: 480,
    inUseCustomerPmNum: 408,
    inUseCustomerCardNum: 408,
  });
}

export function getResourceOverview() {
  return resolveMockResponse({
    totalGyyServersCnt: 1028000,
    totalGyyServersCntMom: 14100,
    superNodeCnt: 155,
    superNodeCntMom: 3,
    onlineRate: 0.9216,
    onlineRateMom: 0.0141,
  });
}

export function getResourceXpu() {
  return resolveMockResponse({
    smartCardNum: 463400,
    smartCardNumMon: 85400,
    useRateHour: 0.8219,
    useRateHourMom: 0.0024,
    tokenCardTotal: 181200,
    tokenCardNumD: 25120000000,
    tokenUseRate: 0.8512,
    computerCardNum: 5325600,
    internalCustomer: 61100,
    externalCustomer: 120100,
  });
}

export function getResourceGeneral() {
  return resolveMockResponse({
    totalPmCnt: 1021200,
    totalPmCntMom: 85400,
    operationTotalQty: 2121100,
    operationTotalQtyMom: 18200,
    ecsTotalPmCnt: 181200,
    ecsOperationTotalQty: 1251200,
    evsTotalPmCnt: 151900,
    evsOperationTotalQty: 262144,
    evsUsageRate: 0.8512,
    obsTotalPmCnt: 51200,
    obsOperationTotalQty: 524288,
    obsDistributionRate: 0.8854,
  });
}
