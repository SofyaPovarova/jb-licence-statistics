import React, {Component} from 'react';
import './StatisticsApp.css';
import dayjs from "dayjs";
import axios from "axios";
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import iconIJ from './icons/IJ.png'
import iconWS from './icons/WS.png'
import iconPS from './icons/PS.png'
import PeriodSelector from "./components/PeriodSelector";
import TableComponent from "./components/TableComponent";
import StatsBarChart from "./components/StatsBarChart";

dayjs.extend(quarterOfYear)

class StatisticsApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      interval: 'quarter',
      fromPoint: {},
    };
  }

  changeFromPoint = sign => {
      this.setState({fromPoint: dayjs(this.state.fromPoint).add(sign*1, this.state.interval)})
  }

  changeInterval = value => {
      this.setState({interval: value})
  }

  cutStats = () => {
      return this.state.stats.filter( line =>
          line.date > this.state.fromPoint &&
          line.date <= dayjs(this.state.fromPoint).add(1, this.state.interval)
      )
  }

  componentDidMount = () => {
    axios({
      method: 'get',
      url: "https://api.github.com/repos/burkov/fls-internship/contents/fls-data.csv",
    }).then(res => {
        let stats = ((new Buffer(res.data.content, 'base64'))
                .toString('ascii')
                .split('\n')
        )

        let statsObj= [];
        stats.forEach(
            (line, index) => {
              const lineStat = line.split(',');
              if (index) {
                  statsObj.push({
                      date: dayjs(lineStat[0]),
                      IJ: isNaN(parseInt(lineStat[1])) ? 0 : parseInt(lineStat[1]),
                      WS: isNaN(parseInt(lineStat[2])) ? 0 : parseInt(lineStat[2]),
                      PS: isNaN(parseInt(lineStat[3])) ? 0 : parseInt(lineStat[3]),
                  })
              }

            }
        )
        this.setState({
            stats: statsObj,
            fromPoint: statsObj[0].date,
        });
    }).catch(err=> console.log(err));
  }

  render() {
      let stats = this.cutStats();

      return(
          <div className="StatisticsApp">
              <h1 className="header" title="License statistics">License statistics</h1>
              <div className="content">
                  <PeriodSelector interval={this.state.interval}
                                  changeFromPoint={this.changeFromPoint}
                                  changeInterval={this.changeInterval}
                  />
                  <TableComponent stats={stats}/>
                  <div className="barChartsArea">
                      <StatsBarChart stats={stats} product="IJ" icon={iconIJ}/>
                      <StatsBarChart stats={stats} product="WS" icon={iconWS}/>
                      <StatsBarChart stats={stats} product="PS" icon={iconPS}/>
                  </div>
              </div>

          </div>
      )
  }
}

export default StatisticsApp;
