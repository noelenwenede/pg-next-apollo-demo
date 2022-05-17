const Component = ({ data }: {data: any}) => {

  return (
    <div className="border-gray-200 my-4 aspect-video">
      <p>
        {data?.name}
      </p>
      <p>
        {data?.phone}
      </p>
      <p>
        {data?.email}
      </p>
      <p>
        {data?.address}
      </p>
    </div>
  
)
  }

export default Component;

