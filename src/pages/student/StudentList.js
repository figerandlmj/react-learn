import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import './StudentList.css'
import { searchStudents } from '../../services/student'
import StudentSearchBar from '../../components/StudentSearchBar'
import StudentTable from '../../components/StudentTable'
import Paper from '../../components/common/Pager'

import useScroll from '../../components/useScroll' //滚动条复位


/**
 * 获取地址栏参数中的查询条件，返回一个对象
 */
function getQuery(search) {
    const queryDefault = {
        page: 1,
        limit: 10,
        key: "",
        sex: -1
    };
    let query = qs.parse(search);
    query = Object.assign({}, queryDefault, query);
    query.page = +query.page;
    query.limit = +query.limit;
    query.sex = +query.sex;
    return query;
}

/**
 * 获取服务器的响应结果，
 * query 查询条件对象 
 */
function useResp(query) {
    const [resp, setResp] = useState({
        cont: 0,
        datas: []
    });
    useEffect(() => {
        searchStudents({
            page: query.page,
            limit: query.limit,
            key: query.key,
            sex: query.sex
        }).then(res => {
            setResp(res);
        })
    }, [query.page, query.limit, query.key, query.sex]);
    return resp;
}

/**
 * 根据查询条件，改变地址
 */
function changeLocation(query, history) {
    const search = qs.stringify(query);
    history.push("?" + search);
}

export default function StudentList(props) {
    const query = getQuery(props.location.search);
    const resp = useResp(query);

    useScroll(props.location.pathname);//滚动条复位

    return (
        <div className="studentList">
            <StudentSearchBar defaultValue={{
                key: query.key,
                sex: query.sex
            }} onSearch={value => {
                const newQuery = {
                    ...query,
                    page: 1,
                    key: value.key,
                    sex: value.sex
                };
                changeLocation(newQuery, props.history);
            }} />
            <StudentTable stus={resp.datas} />
            <Paper current={query.page}
                limit={query.limit}
                total={resp.cont}
                panelNumber={5}
                onPageChange={newPage => {
                    const newQuery = {
                        ...query,
                        page: newPage
                    };
                    changeLocation(newQuery, props.history);
                }} />
        </div>
    )
}
