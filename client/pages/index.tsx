import Link from 'next/link'
import WithApollo from '../lib/with-apollo'
import Name from '../components/Name'
import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const query = gql`
  query getPeople($skip: Int!) {
    people(skip: $skip) {
      name
      address
      email
      phone_number
    }
  }
`

const Page = () => {

  const [skip, setSkip] = useState<number>(0)
  const [users, setUsers] = useState<any[]>([])
  const { loading, error, data, fetchMore } = useQuery(query, { variables: { skip } });
  const { people } = data ?? { people: [] };

  useEffect(() => {
    if (people?.length) {
      setUsers([...users, ...people])
    }
  }, [people])

  async function getNext() {
    fetchMore({ variables: { skip: skip + 20 }, query }).then(console.log).catch(console.log)
    setSkip(skip + 20)
  }

  return (<div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">
        Welcome To Publicis Test
      </h1>
      <br /><br />

      <div className='md:columns-3 lg:columns-3 xl:columns-3 sm:columns-1'>
        {
          users.map((person: any) => <Name key={person.name} data={person} />)
        }
      </div>

      <button className='px-4 py-2 font-semibold text-sm bg-gray-800 text-white rounded-full shadow-sm w-full' disabled={loading} onClick={getNext}>{loading ? 'loading' : 'fetch more'}</button>

  </div>)
}

export default WithApollo({ ssr: false })(Page)
