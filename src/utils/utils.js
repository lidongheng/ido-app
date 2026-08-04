/**
 * 通用工具函数
 */

/**
 * 安全调用 Promise，出错时返回默认值
 * @param {Promise} promise - 要执行的 Promise
 * @param {any} defaultValue - 出错时返回的默认值
 * @returns {Promise<any>} - 返回接口数据或默认值
 * 
 * @example
 * const result = await safeCall(axios.get('/api/data'), { list: [] })
 */
export async function safeCall(promise, defaultValue = {}) {
  try {
    return await promise
  } catch (error) {
    console.error('接口请求失败:', error)
    return defaultValue
  }
}

/**
 * 安全调用多个 Promise（并行），出错的接口返回对应默认值
 * @param {Array<{promise: Promise, defaultValue: any}>} tasks - 任务数组
 * @returns {Promise<Array>} - 返回结果数组
 * 
 * @example
 * const [data1, data2] = await safeCallAll([
 *   { promise: axios.get('/api/data1'), defaultValue: {} },
 *   { promise: axios.get('/api/data2'), defaultValue: [] }
 * ])
 */
export async function safeCallAll(tasks) {
  const results = await Promise.allSettled(
    tasks.map(task => safeCall(task.promise, task.defaultValue))
  )
  
  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    }
    console.error(`任务 ${index} 执行失败:`, result.reason)
    return tasks[index].defaultValue
  })
}

// 防抖函数
export const debounce = function(fn, delay = 500) {
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  }
}

