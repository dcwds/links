import { useIdentityContext } from "react-netlify-identity"

const Dashboard = () => {
  const { authedFetch } = useIdentityContext()

  const createUser = () => authedFetch.get(`/api/create-user`)

  return <button onClick={createUser}>Trigger Create User</button>
}

export default Dashboard
