import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
function Dashboard() {
  const [auth,setAuth] = useAuth();
  return (
    <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
              <card>
                <h1>Name:{auth.user.name}</h1>
                <h1>Name:{auth.user.email}</h1>
                <h1>Name:{auth.user.password}</h1>
              </card>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard