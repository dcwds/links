import { useIdentityContext } from "react-netlify-identity"

const Dashboard = () => {
  const { authedFetch } = useIdentityContext()

  const createUser = () => authedFetch.get(`/api/create-user`)
  const createList = () =>
    authedFetch.get(`/api/create-list?name=Unlisted&isPrivate=true`)
  const getLists = () => authedFetch.get(`/api/get-lists`)

  return (
    <div>
      <button onClick={createUser}>Trigger Create User</button>
      <button onClick={createList}>Trigger Create List</button>
      <button onClick={getLists}>Trigger Get Lists</button>
    </div>
  )
}

export default Dashboard
