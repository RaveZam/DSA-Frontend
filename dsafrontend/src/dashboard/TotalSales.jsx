import MostPopularItem from "./MostPopularItem";
import { MdMoreHoriz } from "react-icons/md";
import { IoIosCalendar } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import IncreaseComponent from "../components/IncreaseComponent";
import DecreaseComponent from "../components/DecreaseComponent";
import SmallLoading from "../preloaders/SmallLoading";
import { useState, useEffect } from "react";

export default function TotalSales({
  grosssales,
  itemsSold,
  lastMonthGross,
  lastMonthTotalSales,
}) {
  const formattedGrossSale = grosssales.toLocaleString();
  const [TotalGrossDifference, setTotalGrossDifference] = useState(0);
  const [TotalSalesDifference, setTotalSalesDifference] = useState(0);
  useEffect(() => {
    setTotalGrossDifference(
      ((grosssales - lastMonthGross) / lastMonthGross) * 100,
    );
    setTotalSalesDifference(
      ((itemsSold - lastMonthTotalSales) / lastMonthTotalSales) * 100,
    );
  }, [lastMonthGross]);

  return (
    <div>
      <div className="flex">
        <div>
          <h1 className="text-[2.2vw] font-semibold">Dashboard</h1>
          <span className="text-gray-600">Last 28 Days</span>
        </div>
        <div className="ml-auto flex items-center">
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-4">
            <h1 className="flex text-[0.8vw]">
              <IoIosCalendar className="mr-4 mt-1 scale-150" />
              September 3 - October 1
              <RiArrowDropDownLine className="ml-2 mt-1 scale-150" />
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        {/* // */}
        <div className="bg-gray-0 flex w-1/2 flex-col rounded-2xl border-2 border-gray-200 bg-white px-2 py-2 transition-all">
          <div className="flex-col rounded-2xl border-2 border-gray-200 bg-white p-4 drop-shadow-sm">
            <h1 className="mb-1 flex font-semibold">
              Total Gross Sales <MdMoreHoriz className="ml-auto scale-150" />
            </h1>

            <div className="flex">
              {isNaN(grosssales) || grosssales === 0 ? (
                <div className="mt-2">
                  <SmallLoading />
                </div>
              ) : TotalGrossDifference > 0 ? (
                <h2 className="text-prof-blue flex text-2xl font-semibold">
                  <span className="animate-appearFromTop">
                    ${grosssales.toLocaleString()}
                  </span>
                  <IncreaseComponent value={TotalGrossDifference.toFixed(2)} />
                </h2>
              ) : (
                <h2 className="text-prof-blue flex text-2xl font-semibold">
                  <span className="animate-appearFromTop">
                    ${grosssales.toLocaleString()}
                  </span>
                  <DecreaseComponent value={TotalGrossDifference.toFixed(2)} />
                </h2>
              )}
            </div>
          </div>
          <div className="mt-[2px] flex">
            <span className="py-1 pl-2 pr-1 text-[0.9vw] font-semibold">
              {isNaN(lastMonthGross) ? (
                <div className="mr-2 mt-1 scale-90">
                  <SmallLoading />
                </div>
              ) : grosssales - lastMonthGross < 0 ? (
                <span className="animate-appearFromTop">
                  -₱{Math.abs(grosssales - lastMonthGross)}
                </span>
              ) : (
                <span className="animate-appearFromTop">
                  +₱{Math.abs(grosssales - lastMonthGross)}
                </span>
              )}
            </span>
            <span className="mt-[5px] text-[0.8vw] font-medium text-gray-500">
              from last Month
            </span>
          </div>
        </div>
        {/* // */}
        <div className="bg-gray-0 flex w-1/2 flex-col rounded-2xl border-2 border-gray-200 bg-white px-2 py-2 transition-all duration-200">
          <div className="flex-col rounded-2xl border-2 border-gray-200 bg-white p-4 drop-shadow-sm">
            <h1 className="mb-1 flex font-semibold">
              Total Items Sold <MdMoreHoriz className="ml-auto scale-150" />
            </h1>
            <div className="flex">
              {isNaN(TotalSalesDifference) ? (
                <div className="mt-2">
                  <SmallLoading />
                </div>
              ) : TotalSalesDifference > 0 ? (
                <h2 className="animate-appearFromTop text-prof-blue flex text-2xl font-semibold">
                  {itemsSold}

                  <span className="ml-1 text-[0.9vw] text-gray-700">
                    Products
                  </span>
                  <IncreaseComponent value={TotalSalesDifference.toFixed(2)} />
                </h2>
              ) : (
                <DecreaseComponent value={TotalSalesDifference.toFixed(2)} />
              )}
            </div>
          </div>
          <div className="mt-[2px] flex">
            <span className="py-1 pl-2 pr-1 text-[0.9vw] font-semibold">
              {isNaN(lastMonthGross) ? (
                <div className="mr-2 mt-1 scale-90">
                  <SmallLoading />
                </div>
              ) : itemsSold - lastMonthTotalSales < 0 ? (
                <span className="animate-appearFromTop">
                  -₱{Math.abs(itemsSold - lastMonthTotalSales)}
                </span>
              ) : (
                <span className="animate-appearFromTop">
                  +₱{Math.abs(itemsSold - lastMonthTotalSales)}
                </span>
              )}
            </span>
            <span className="mt-[5px] text-[0.8vw] font-medium text-gray-500">
              sold compare to last Month
            </span>
          </div>
        </div>

        <MostPopularItem />
      </div>
    </div>
  );
}
