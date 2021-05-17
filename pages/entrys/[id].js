import Layout from '../../components/layout';

const postEntry = () => {
  return (
    <div className="absolute border-2 border-red-500 rounded-md p-8  bg-gray-50 shadow-2xl flex-col flex space-y-5 bg-gray-50">
      <div className="flex flex-row relative space-x-36 p-6 font-semibold">
        <div className="flex-grow">schnebu</div>
        <div className="flex felx-row space-x-1 relative">
          <select>
            <option>gigu 0</option>
            <option>gigu 1</option>
            <option>gigu 3</option>
          </select>
        </div>
      </div>
      <div className="w-auto border-b-2 border-red-500" />
      <div className="bottom-0 flex flex-row justify-center space-x-10">
        <button className="font-bold text-red-700 bg-red-100 rounded-md h-10 w-20 hover:bg-red-300 flex-grow">
          cancle
        </button>
        <button
          className="font-bold text-green-700 bg-green-100 rounded-md h-10 w-20 hover:bg-green-300 flex-grow"
          type="submit"
        >
          submit
        </button>
      </div>
    </div>
  );
};

function Entry({ data }) {
  console.log(data);
  return (
    <Layout>
      <div className="relative w-screen h-screen flex justify-center">
        <div className="flex w-screen mt-24 justify-center">{postEntry()}</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  // fetch data from external API
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_APIHOST}/id/${params.id}`
  );
  const data = await res.json();

  // pass data to the page via props
  return { props: { data } };
}

export default Entry;
