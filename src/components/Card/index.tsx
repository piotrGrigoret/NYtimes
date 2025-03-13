
export const Card = () => {
    return (
        <div 
          className="w-auto mx-auto max-w-[320px] flex flex-row gap-3 border-b border-b-gray-200
          lg:max-w-[450px] p-4 cursor-pointer hover:lg:transform hover:lg:scale-105 hover:lg:shadow-lg hover:lg:shadow-bgDarker transition-all duration-300 ease-in-out"
        >
          <img   
            className="w-full mt-9 h-20 object-cover rounded-lg shadow-2xl lg:h-28 lg:mt-10"
            src="/assets/jpg/img2.jpg"
            alt="news image" 
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-base text-primary font-latoBold lg:text-xl">CNN</h2>
            <p className="text-base line-clamp-5 overflow-hidden text-ellipsis lg:text-lg">
              Why TikTok is taking months to delete personal US user data from servers outside its Project Texas firewalls, even as its political standing sours
            </p>
            <div className="text-sm lg:text-base opacity-50">Feb 26, 2023, 16.32 PM</div>
          </div>
        </div>
      );
}
