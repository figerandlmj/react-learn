import React from 'react'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Aside from '../../components/Aside'

import Welcome from '../Welcome'
import StudentList from '../student/StudentList'
import StudentAdd from '../student/StudentAdd'
import CourseList from '../course/CourseList'
import CourseAdd from '../course/CourseAdd'

import RouteConfig from '../../RouteConfig'
import TransitionRoute from '../../components/TransitionRoute'
import withScroll from '../../components/withScroll' //滚动条复位

const StudentAddWithScroll = withScroll(StudentAdd);
const CourseAddWithScroll = withScroll(CourseAdd);

export default function Admin() {
    return (
        <Layout header={<Header></Header>}
            aside={<Aside></Aside>}>
            {/* <Route path={RouteConfig.admin.root} exact component={Welcome}></Route>
            <Route path={RouteConfig.admin.students.root} exact component={StudentList}></Route>
            <Route path={RouteConfig.admin.students.add} exact component={StudentAdd}></Route>
            <Route path={RouteConfig.admin.courses.root} exact component={CourseList}></Route>
            <Route path={RouteConfig.admin.courses.add} exact component={CourseAdd}></Route> */}
            <TransitionRoute path={RouteConfig.admin.root} exact component={Welcome}></TransitionRoute>
            <TransitionRoute path={RouteConfig.admin.students.root} exact component={StudentList}></TransitionRoute>
            <TransitionRoute path={RouteConfig.admin.students.add} exact component={StudentAddWithScroll}></TransitionRoute>
            <TransitionRoute path={RouteConfig.admin.courses.root} exact component={CourseList}></TransitionRoute>
            <TransitionRoute path={RouteConfig.admin.courses.add} exact component={CourseAddWithScroll}></TransitionRoute>
        </Layout>
    )
}
