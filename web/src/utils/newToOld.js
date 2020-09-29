export default (b) => ({
  column: {
    start: b.column_start,
    end: b.column_end,
    span: b.column_end - b.column_start,
  },
  row: {
    start: b.row_start,
    end: b.row_end,
    span: b.row_end - b.row_start,
  }
})