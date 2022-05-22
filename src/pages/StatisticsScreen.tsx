import React from "react";
import { ReactElement, useEffect, useState } from "react";
import "./StatisticsScreen.css";
import { fetchUserTiles } from "../tools/firebaseTools";
import { TileData, TileDataList } from "../types";
import {
  LineChart,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  Line,
  BarChart,
  Bar,
  Area,
} from "recharts";
import moment from "moment";

type StatisticsScreenProps = {
  userLoggedIn: boolean;
  userID: string | undefined;
};

const StatisticsScreen = (
  props: StatisticsScreenProps
): ReactElement<StatisticsScreenProps> => {
  const [tiles, setTiles] = useState<TileDataList>({});
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  useEffect(() => {
    loadTiles();
  }, [props.userID]);

  useEffect(() => {
    loadTiles();
  }, []);

  const loadTiles = async () => {
    if (props.userLoggedIn && props.userID) {
      await fetchUserTiles(props.userID)
        .then((data: TileDataList) => {
          setTiles(data);
          setLineChartData(getLineChartData(data));
          setBarChartData(getBarChartData(data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  const getLineChartData = (tilesD: TileDataList): any[] => {
    const data: any[] = [];
    for (const tileList of Object.values(tilesD)) {
      for (const tile of tileList) {
        data.push({
          Date: tile.date,
          "Tile Score": tile.tileScore,
        });
      }
    }
    data.sort((a, b) => {
      return a["Date"] - b["Date"];
    });
    for (let i = 0; i < data.length; i++) {
      data[i]["Date"] = moment(data[i].date).format("M/D/YY");
    }
    return data;
  };


  const getBarChartData = (tilesD: TileDataList): any[] => {
    const data: any[] = [];
    const catCount: any = {};
    const catScore: any = {};
    for (const tileList of Object.values(tilesD)) {
      for (const tile of tileList) {
        catCount[tile.category] = catCount[tile.category] + 1 || 1;
        catScore[tile.category] = catScore[tile.category] + tile.tileScore || tile.tileScore;
      }
    }
    for (const cat in catCount) {
      data.push({
       "Category": cat,
       "Tile Score": catScore[cat] / catCount[cat],
      });
    }
    return data;
  }

  return (
    <div className="statistics-screen">
      {props.userLoggedIn ? (
        <div className="stat-container">
          <div className="stat-graph">
            <h1 className="stat-header">Your Mood Over Time</h1>
            {/* <LineChart
              width={730}
              height={350}
              data={lineChartData}
              margin={{ top: 5, right: 70, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="category"
                dataKey={"Date"}
                style={{ fontSize: "10px" }}
              />
              <YAxis type="number" domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Tile Score" stroke="#4766f9" />
            </LineChart> */}

            <AreaChart
              width={730}
              height={300}
              data={lineChartData}
              margin={{ top: 10, right: 60, left: 10, bottom: 15 }}
            >
              <defs>
                <linearGradient
                  id="colorTilesScore"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4766f9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4766f9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="Date" tick={false} />
              <YAxis type="number" domain={[0, 10]} />
              <Tooltip cursor={false}/>
              <Area
                type="monotone"
                dataKey="Tile Score"
                stroke="#4766f9"
                fillOpacity={1}
                fill="url(#colorTilesScore)"
              />
            </AreaChart>
          </div>

          <div className="stat-graph">
            <h1 className="stat-header">How is Your Mood Effected?</h1>
            <BarChart width={730} height={300} data={barChartData} onMouseEnter={() => {}}
            margin={{ top: 10, right: 60, left: 10, bottom: 15 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Category" />
              <YAxis type="number" domain={[0, 10]} />
              <Tooltip cursor={{fill: 'transparent'}}/>
              <Bar dataKey="Tile Score" fill="#4766f9" />
            </BarChart>
          </div>
        </div>
      ) : (
        <div className="screen-login">
          <h1>Login to view your statistics and behavioral patterns!</h1>
        </div>
      )}
    </div>
  );
};

export default StatisticsScreen;
