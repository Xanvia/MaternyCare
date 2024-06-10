import MOH from '../assets/images/moh.png';
import PHM from '../assets/images/phm.png';

const Notification = () => {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-background relative space-y-4 p-4">
      <div className="w-full max-w-2xl p-4 bg-purple_tertiary rounded-2xl shadow-md text-text_color_2 font-bold flex">
        <div className="inline-flex p-1 bg-purple_secondary rounded-2xl shadow-md items-center">
          <img src={MOH} alt="MOH image" className="w-24 h-auto rounded-l-2xl" />
        </div>
        <div className="w-5/6 p-4 text-justify">
          <h2 className='text-purple_primary text-lg'>MOH</h2>
          {"All eligible citizens to receive their COVID-19 booster shots to enhance immunity against new variants. Vaccination centers are open from 9 AM to 5 PM daily. Please bring your ID and vaccination card."}
        </div>
      </div>

      <div className="w-full max-w-2xl p-4 bg-pink_tertiary rounded-2xl shadow-md text-text_color_2 font-semibold flex ">
      <div className="inline-flex p-1 bg-pink_secondary rounded-2xl shadow-md items-center">
          <img src={PHM} alt="PHM image" className="w-24 h-auto rounded-l-2xl" />
        </div>
        <div className="w-5/6 p-4 text-justify">
        <h2 className='text-pink_primary text-lg'>PHM</h2>
          {"Ensure your children receive all mandatory immunizations on time. Visit your nearest health center to check your child’s vaccination schedule. Immunizations are crucial for preventing childhood diseases."}
        </div>
      </div>

      <div className="w-full max-w-2xl p-4 bg-blue_tertiary rounded-2xl shadow-md text-text_color_2 font-semibold flex">
      <div className="inline-flex p-1 bg-blue_secondary rounded-2xl shadow-md items-center">
          <img src={MOH} alt="MOH image" className="w-24 h-auto rounded-l-2xl" />
        </div>
        <div className="w-5/6 p-4 text-justify">
        <h2 className='text-blue_primary text-lg'>MOH</h2>
          {"Notification 3"}
        </div>
      </div>

      <div className="w-full max-w-2xl p-4 bg-green_tertiary rounded-2xl shadow-md text-text_color_2 font-semibold flex">
      <div className="inline-flex p-1 bg-green_secondary rounded-2xl shadow-md items-center">
          <img src={PHM} alt="PHM image" className="w-24 h-auto rounded-l-2xl" />
        </div>
        <div className="w-5/6 p-4 text-justify">
        <h2 className='text-green_primary text-lg'>PHM</h2>
          {"Notification 4"}
        </div>
      </div>
    </div>
  );
}

export default Notification;