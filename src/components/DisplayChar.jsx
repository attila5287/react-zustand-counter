import { useCounter } from "../store/useCounter";

export default function DisplayChar() {
  const apiData = useCounter((state) => state.apiData);

  console.log(apiData);

  if (apiData) {
    return (
      <>
        <div className="card border-light my-2">
          <div className="card-body">
            <h5 className="card-title text-center">
              {apiData.name}
            </h5>
            <img
              src={apiData.image}
              alt="Character"
              className="img-thumbnail w-50 d-block mx-auto"
            />
            <ul className="list-group list-group-sm text-sm">
              <li className="list-group-item py-0">Status: {apiData.status}</li>
              <li className="list-group-item py-0">
                Species: {apiData.species}
              </li>
              <li className="list-group-item py-0">Gender: {apiData.gender}</li>
              <li className="list-group-item py-0">
                Origin: {apiData.origin.name}
              </li>
              <li className="list-group-item py-0">
                Location: {apiData.location.name}
              </li>
            </ul>
          </div>
        </div>
        <pre className="mb-0 text-wrap">{JSON.stringify(apiData, null, 2)}</pre>
      </>
    );
  } else {
    return (
      <div className="mt-4">
        <h5 className="text-center mb-3">Character Details</h5>
        <div className="bg-light p-3 rounded">
          <p className="mb-0">No data loaded yet</p>
        </div>
      </div>
    );
  }
}
