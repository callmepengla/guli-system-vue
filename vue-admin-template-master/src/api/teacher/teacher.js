import request from '@/utils/request'

export default {
    //1、讲师列表（条件查询分页）
    // current-当前页、limit-每页条数
    getTeacherListPage(params) {
        return request({
            url: '/eduservice/edu-teacher/pageTeacher',
            //url: '/eduservice/edu-teacher/pageTeacher/${current}/${limit}',
            method: 'get',
            //假设有另外的查询条件：teacherQuery条件对象，后端使用requestBody获取数据
            //data就表示把对象转换成JSON进行传递到接口里面去
            //data: teacherQuery
            params: {
                page: params.page,
                limit: params.limit,
                name: params.name,
                level: params.level,
                beginTime: params.beginTime,
                endTime: params.endTime
            }
        })
    },
    removeDataById(id){
        return request({
            url: '/eduservice/edu-teacher/'+id,
            method: 'delete'
        })
    },
    addTeacher(teacher){
        return request({
            url: '/eduservice/edu-teacher/addteacher',
            method: 'post',
            data: teacher
        })
    },
    getTeaInfoId(id){
        return request({
            url: '/eduservice/edu-teacher/info/' + id,
            method: 'get'
        })
    },
    updateTeacher(teacher){
        return request({
            url: '/eduservice/edu-teacher/update',
            method: 'post',
            data: teacher
        })
    }

}