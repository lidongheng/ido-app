import { reactive, watch } from 'vue';

export const useForceCastTablePagination = (props) => {
  const pages = reactive({
    total: 0,
    pageNo: 1,
    pageSize: props.pageSize,
    layout: 'sizes, total, prev, pager, next',
  });

  const pageCurrentChange = (value) => {
    pages.pageNo = value;
  };

  const pageSizeChange = (value) => {
    pages.pageNo = 1;
    pages.pageSize = value;
  };

  watch(
    () => props.tableData,
    () => pageCurrentChange(1)
  );

  return { pages, pageCurrentChange, pageSizeChange };
};