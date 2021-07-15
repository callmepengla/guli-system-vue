import request from '@/utils/request'

export default{
    //1、添加课程基本信息的方法
    getSubjectList(courseInfoVO) {
        return request({
            url: '/eduservice/edu-course/addCourseInfo',
            method: 'post',
            data: courseInfoVO
        })
    }
}