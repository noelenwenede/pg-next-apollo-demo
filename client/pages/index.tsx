import Link from 'next/link'
import WithApollo from '../lib/with-apollo'
import Name from '../components/Name'
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

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
  const { loading, error, data, fetchMore } = useQuery(query, { variables: {skip} });
  const { people } = data ?? {people: []};

  useEffect(() => {
    if(people?.length) {
      setUsers([...users, ...people])
    }
  }, [people])

  async function getNext() {
    fetchMore({variables: {skip: skip + 20}, query}).then(console.log).catch(console.log)
    setSkip(skip + 20)
  }

  return <div>
    Welcome To Publicis Test
    <br /><br />
    <Link href="/about"><a>About</a></Link>
    {
      users.map((person: any) => <Name key={person.name} data={person} />)
    }

    <button disabled={loading} onClick={getNext}>{loading? 'loading': 'fetch more'}</button>

  </div>
}

export default WithApollo({ ssr: false })(Page)
