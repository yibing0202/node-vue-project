<template>
  <div class="catelist">
    <h2 class="header">分类列表</h2>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="_id" label="id" width="300"> </el-table-column>
        <el-table-column prop="parent.name" label="上级分类"> </el-table-column>
        <el-table-column prop="name" label="分类"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small"
              @click="$router.push(`/category/new/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small"
              @click="remove(scope.row)">移除</el-button>
          </template>
            
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/rest/category");
      this.tableData = res.data;
    },
    async remove(row) {
      this.$confirm(`确定要删除分类 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
      const res =  await this.$http.delete(`/rest/category/${row._id}`)
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData()
        })
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style>
.catelist .header {
  width: 100%;
  text-align: center;
}
</style>