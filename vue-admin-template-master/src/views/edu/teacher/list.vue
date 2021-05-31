<template>
  <div class="edu-list" style="margin-top:20px;">
    <!-- 表单提交 -->
    <el-form
      :inline="true"
      :model="params"
      class="demo-form-inline"
      align="center"
    >
      <el-form-item label="讲师名">
        <el-input v-model="params.name" placeholder="讲师名"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="params.level" placeholder="讲师头衔" clearable >
          <el-option label="高级讲师" :value="1"></el-option>
          <el-option label="首席讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="params.beginTime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="params.endTime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" highlight-current-row border align="center">
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ (params.page - 1) * params.limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" align="center">
      </el-table-column>
      <el-table-column label="头衔" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="career"
        label="讲师资历"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
      :current-page="this.params.page"
      :page-size="this.params.limit"
      :total="total"
      style="padding: 30px 0; text-align:center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>
<script>
//引入调用teacher.js文件
import teacher from "@/api/teacher/teacher";

export default {
  //写核心业务代码位置
  data() {
    //定义变量和初始值
    return {
      params: {
        page: 1, //当前页
        limit: 5 //每页记录数
      },
      tableData: null, //查询之后返回的集合
      total: null //总条数
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    //调用
    this.getList();
  },
  methods: {
    //创建具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page = 1) {
      this.params.page = page;
      teacher
        .getTeacherListPage(this.params)
        .then(response => {
          //response接口返回的数据
          console.log(response);
          this.tableData = response.data.map.pageDate.records;
          this.total = response.data.map.pageDate.total;
          console.log(this.list);
          console.log(this.total);
        })
        .catch(error => {
          console.log(error);
        }); //请求失败
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(id)
        //点击确定，执行then方法
        //调用删除的方法
        teacher.removeDataById(id).then(response => {
          console.log("删除成功！");
          //回到列表页面
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //回调方法
          this.getList();
        });
      });
    }
  }
};
</script>