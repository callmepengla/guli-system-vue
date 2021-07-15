<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模板说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <!-- 将模板绑定到本地，也可以绑定在oss服务器上 -->
          <a :href="'/static/课程分类.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>

      <el-form-item label="选择Excel">
          <el-upload
            ref="upload"
            :auto-upload="false"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :disabled="importBtnDisabled"
            :limit="1"
            :action="BASE_API+'/eduservice/edu-subject/addSubject'"
            name="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            <!-- accept表示只能接受application/vnd.ms-excel这个格式 -->
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button> 
            <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器
            </el-button>
          </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            BASE_API: process.env.BASE_API, // 接口API地址
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false
        }
    },
    created(){

    },
    methods:{
        // 点击按钮上传文件到接口
        submitUpload(){
            this.importBtnDisabled = true
            this.loading = true
            // 相当于js的写法：document.getElementById("upload").submit()
            this.$refs.upload.submit()
        },
        //上传成功
        fileUploadSuccess(response){
            // 提示信息
            this.loading = false
            this.$message({
                type: 'success',
                message: '添加课程分类成功！'    
            });
            // 跳转到课程分类列表
            this.$router.push({ path: "/subject"});
        },
        //上传失败
        fileUploadError(response){
            // 提示信息
            this.$message({
                type: 'error',
                message: '添加课程分类失败！'
            })
        }
    }
}
</script>