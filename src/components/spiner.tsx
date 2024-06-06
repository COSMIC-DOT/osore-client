import { SyncLoader } from 'react-spinners';

function Spiner() {
  return (
    <div className="absolute left-0 top-0 flex h-[100%] w-[100%] items-center justify-center">
      <SyncLoader />
    </div>
  );
}

export default Spiner;
