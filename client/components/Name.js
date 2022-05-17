import { gql, useQuery } from '@apollo/client';

const query = gql`
  query name {
    name
  }
`

const Component = () => {
  const { loading, error, data } = useQuery(query);

  console.log(loading, error, data);

  return (
  <span>
    {data?.loading? '..' : data?.name}
  </span>
)
  }

export default Component;

