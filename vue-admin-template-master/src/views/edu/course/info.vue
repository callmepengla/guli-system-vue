<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="0"
      finish-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder="示例：机器学习项目课：从基础到达见项目视频课程。专业名称注意大小写"
        ></el-input>
      </el-form-item>

      <el-form-item label="课程类别">
        <!-- 一级分类列表 -->
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged"
          clearable
        >
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"
          ></el-option>
        </el-select>
        <!-- 二级分类列表 -->
        <el-select
          v-model="courseInfo.subjectId"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="subject in subjectList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input
          v-model="courseInfo.description"
          placeholder="示例：机器学习项目课"
        ></el-input>
      </el-form-item>
      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/filsoss'"
          class="avatar-uploader">
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="addOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/teacher/course";
import subject from "@/api/teacher/subject";
export default {
  data() {
    return {
      saveBtnDisabled: false, //保存按钮是否禁用
      courseInfo: {
        title: "",
        subjectParentId: "",
        subjectId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "/static/java.jpeg",
        price: 0
      },
      teacherList: [], //封装所有的讲师
      subjectNestedList: [], //一级分类列表
      subjectList: [], //二级分类列表
      BASE_API: process.env.BASE_API //获取dev.env.js里面的地址
    };
  },
  created() {
    //初始化所有讲师
    this.getAllTeacher();
    //初始化分类列表
    this.initSubjectList();
  },
  methods: {
    //保存
    addOrUpdate() {
      course.addCourseInfo(this.courseInfo).then(response => {
        //提示成功信息
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.$router.push({
          path: "/edu/course/chapter/" + response.data.courseId
        });
      });
    },
    //查询所有的讲师
    getAllTeacher() {
      course.getListTeacher().then(response => {
        this.teacherList = response.data.item;
      });
    },
    //获取课程一级分类的集合
    initSubjectList() {
      subject.getSubjectList().then(response => {
        this.subjectNestedList = response.data.list;
      });
    },
    //获取二级分类集合
    subjectLevelOneChanged(value) {
      this.subjectList = "";
      console.log(value);
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
          this.subjectList = this.subjectNestedList[i].children;
          this.courseInfo.subjectId = "";
        }
      }
    },
    // 上传成功之后调用的方法
    handleAvatarSuccess(res,file){
      // 上传响应
      console.log(res)
      // base64编码
      console.log(URL.createObjectURL(file.raw))
      this.courseInfo.cover = res.data.url
    },
    // 上传之前调用的方法
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if(!isJPG){
        this.$message.error("上传封面图片只能是JPG格式！")
      }
      if(!isLt2M){
        this.$message.error("上传封面不能大于2M！")
      }
      return isJPG && isLt2M
    }
  }
};
</script>