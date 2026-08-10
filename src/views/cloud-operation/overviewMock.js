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
