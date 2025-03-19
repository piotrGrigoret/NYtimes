import { Article } from "../../redux/slices/articleSlice";
import moment from "moment";

interface ItemCardProps {
  item: Article;
}


export const Card = ({item}: ItemCardProps ) => {
  const formatDate = (dateStr: string) => {
    return moment(dateStr).format("MMM DD, YYYY, HH:mm A");
  };
   
  return (
      <a  href={item.web_url} target="_blank">
        <div 
          className="w-auto h-f mx-auto max-w-[320px] h-[210px] flex flex-row gap-3 border-b border-b-gray-200
          lg:max-w-[450px] p-4 cursor-pointer hover:lg:transform hover:lg:scale-105 hover:lg:shadow-lg hover:lg:shadow-bgDarker transition-all duration-200 ease-in-out"
        >
          <img   
            className="w-[100px] h-[75px] object-cover rounded-lg shadow-2xl mt-9 flex-shrink-0 lg:w-[160px] lg:h-[120px] lg:mt-11"
            src={`${item.multimedia?.url ? `https://static01.nyt.com/${item.multimedia?.url}` : "/assets/png/ny.png"}`}
            alt="news image" 
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-base line-clamp-1 overflow-hidden text-ellipsis text-primary font-latoBold lg:text-xl">{item.headline.main}</h2>
            <p className="text-base line-clamp-4 overflow-hidden text-ellipsis lg:text-lg">
              {item.abstract}
            </p>
            <div className="text-sm lg:text-base opacity-50">
              {formatDate(item.pub_date)}              
            </div>
          </div>
        </div>
      </a>
    );
}
