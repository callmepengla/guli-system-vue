<template>
  <div class="edu-save">
    <el-form label-width="100px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!-- 
                数据类型一定要和取出的json中的一致，否则没法回值
                因此这里的value使用动态绑定的值，保证其数据类型是number类型
            -->
          <el-option label="高级讲师" :value="1"></el-option>
          <el-option label="首席讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"></el-input>
      </el-form-item>

      <!-- 讲师头像 -->
    </el-form>
    <div class="btn-box">
      <el-button
        type="primary"
        :disabled="saveBtnDisabled"
        @click="saveOrUpdate"
        >保存</el-button
      >
      <router-link :to="'/teacher'">
        <el-button>取消</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import teacher from "@/api/teacher/teacher";
export default {
  data() {
    return {
      teacher: {
        name: "",
        sort: "",
        level: "",
        career: "",
        intro: "",
        avatar: ""
      },
      saveBtnDisabled: false //保存按钮是否禁用，主要是为了防止多次提交，防抖
    };
  },
  created() { //页面渲染之前处理
    //判断路径中是否有值
    if(this.$route.params && this.$route.params.id){
        //从路径中获取值
        const id = this.$route.params.id
        console.log(id)
    }
  },
  methods: {
    saveOrUpdate() {
      //添加
      this.saveTeacher();
    },
    //添加讲师方法
    saveTeacher() {
      console.log(this.teacher);
      teacher.addTeacher(this.teacher).then(response => {
          console.log(response)
        //回到页面
        this.$message({
          type: "success",
          message: "添加成功！"
        });
        this.$router.push({ path: "/teacher" });
      });
    },
    getTeacherInfoById(id){
        teacher.getTeaInfoId(id).then(response => {
            console.log(response)
        })
    }
  }
};
</script>
<style>
.edu-save {
  margin: 10px auto;
  width: 800px;
}
.btn-box {
  text-align: center;
}
</style>