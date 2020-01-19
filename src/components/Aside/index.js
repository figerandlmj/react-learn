import React from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
import RouteConfig from '../../RouteConfig'

export default function Aside() {
    return (
        <ul className="menu">
            <li><NavLink to={RouteConfig.admin.students.root} exact>学生列表</NavLink></li>
            <li><NavLink to={RouteConfig.admin.students.add} exact>添加学生</NavLink></li>
            <li><NavLink to={RouteConfig.admin.courses.root} exact>课程列表</NavLink></li>
            <li><NavLink to={RouteConfig.admin.courses.add} exact>添加课程</NavLink></li>
        </ul>
    )
}