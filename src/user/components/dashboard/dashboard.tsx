import { useIdentityContext } from "react-netlify-identity"

const Dashboard = () => {
  const { authedFetch } = useIdentityContext()

  const createUser = () => authedFetch.get(`/api/create-user`)
  const createList = () =>
    authedFetch.get(`/api/create-list?name=Unlisted&isPrivate=true`)

  return (
    <div>
      <button onClick={createUser}>Trigger Create User</button>
      <button onClick={createList}>Trigger Create List</button>
    </div>
  )
}

export default Dashboard
