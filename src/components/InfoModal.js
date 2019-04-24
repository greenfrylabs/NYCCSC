import React from "react";

import fig1 from "../assets/images/info_fig_1.png";
import fig2 from "../assets/images/info_fig_2.png";
import fig3 from "../assets/images/info_fig_3.png";

const InfoModal = () => {
  return (
    <div>
      <h2>
        The NYCCSC Data Grapher combines a number of different data sources
      </h2>
      <h3>Historical Data</h3>
      <p>
        State, county and river basin graphs use the gridded data set described
        by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.esrl.noaa.gov/psd/data/gridded/data.livneh.html"
        >
          Livneh et al. (2015)
        </a>. The Livneh et al. data cover the period from 1950-2013 and include
        daily maximum and minimum air temperature and precipitation at a spatial
        resolution of 1/16 degree (approximately 6 km x 6 km). The data grid is
        based on several thousand observation stations comprising the United
        States National Weather Service Cooperative Observer (NWS COOP) network.
        Station data are statistically interpolated to the Livneh grid and
        adjusted to account for elevation using a scaling based on the
        parameter- regressions on independent slopes (PRISM) model (Daly et al.,
        1994) climatology for precipitation and a constant -6.5°C km-1 lapse
        rate for temperature. Elements such as heating degree-days, growing
        degree-days and temperature and precipitation threshold counts are
        computed from the daily values.
      </p>
      <p>
        A single value is obtained for each spatial feature (i.e. state, county
        or basin) by averaging the values of all grids encompassed by the
        feature. Grids that are only partially within the feature are included
        in the average, but with proportionally less weight. For example, if
        only half of a grid is within a county, its value is given half of the
        weight of a grid that is totally within the county.
      </p>
      <p>
        For station data graphs, observations from stations within the{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://cdiac.ess-dive.lbl.gov/epubs/ndp/ushcn/ushcn.html"
        >
          U.S. Historical Climatology Network (HCN)
        </a>{" "}
        are used. USHCN data include daily observations of maximum and minimum
        temperature, precipitation amount, snowfall amount, and snow depth,
        monthly-averaged maximum, minimum, and mean temperature and total
        monthly precipitation. Over 1000 high-quality stations comprise the
        USHCN with 57 located in New York. Adjustments to the monthly data exist
        that account for non-climatic discontinuities (e.g. instrument changes,
        station relocations and urbanization). Since similar adjustments are not
        available for the daily data, all graphs are based on unadjusted
        observations for consistency. Station data records have varying starting
        dates. Data from currently active stations are updated daily.
      </p>
      <p>
        On the county, state, basin and station graphs, historical Livneh et al.
        values for each year are shown by black dots. The solid blue line on the
        station graphs shows a running mean of the annual USHCN values. The
        length of this mean can be adjusted by setting the year interval in the
        table that appears under the graph. Running means of 5 to 30 years (in
        increments of 5 years) can be chosen. If the 10-year running mean is
        selected, the value corresponding to the line in the year 2000 is the
        average of the ten annual values from 1991-2000. This value is displayed
        in the table along with the annual value for 2000. Running means
        highlight multi-year variations including trends.
      </p>

      <p style={{ margin: "32px auto" }}>
        <img alt="" src={fig1} style={{ height: "450px" }} title="fig1" />
      </p>

      <h3>Projected Data</h3>
      <p>
        General Circulation Model (GCM) projections from the 32{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cmip.llnl.gov/cmip5/"
        >
          Climate Model Intercomparison Project Phase 5 (CMIP5)
        </a>{" "}
        (Taylor et al., 2012) models are shown on graphs for state, county and
        basin areas. The projections have been downscaled to a spatial
        resolution of 1/16 degree (approximately 6 km x 6 km) using the{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://gdo-dcp.ucllnl.org/downscaled_cmip_projections/dcpInterface.html"
        >
          Localized Constructed Analog (LOCA)
        </a>{" "}
        method of (Pierce et al., 2014). The LOCA dataset provides daily values
        of maximum and minimum temperature and precipitation. Its spatial
        resolution precludes the inclusion of projections on station-specific
        graphs.
      </p>
      <p>
        The downscaled CMIP5 data include both historical simulations and future
        projections. The historical simulations are based on observed trends in
        greenhouse gases and cover period 1951- 2005. Future projections cover
        the period from 2006-2097 and are based on either relatively high RCP
        8.5 or lower RCP 4.5 greenhouse gas emissions. A weighted mean is
        computed from the 32 LOCA-downscaled CMIP5 models. Weights are derived
        based on the skill of each model at reproducing the large scale climate
        of North America and also the uniqueness of each model relative to the
        others (e.g. the equations used by some model formulations are only
        slight variations from those used in others and therefore these models
        are weighted less). This follows the methods of Sanderson and Wehner
        (2017).
      </p>
      <p>
        The range in the simulations from the individual model combinations form
        the red-blue shaded areas on each graph for the historical and future
        period. The top of the red area corresponds to the highest of the 32
        models. The bottom of the blue area corresponds to the lowest of the set
        of models. The weighted mean of CMIP5 models is reflected by the black
        line between the blue and red areas. Unlike the station graphs, the
        lines show each annual value.
      </p>
      <p style={{ margin: "32px auto" }}>
        <img alt="" src={fig2} style={{ height: "450px" }} title="" />
      </p>
      <p>
        When the cursor is moved over the graph, a set of shaded bands appear.
        One is moveable and thus can be used to highlight any period of
        interest. The other three are fixed and show projected conditions in the
        early (ending in 2039), middle (ending in 2069), and late (ending in
        2097) 21st century. The width of the bands can be adjusted by setting
        the year interval in the Observed table that appears under the graph.
        Intervals of 5 to 30 years (in increments of 5 years) can be chosen. As
        the position of the moveable band changes, the table values respond and
        show the average of the model minima (the values included along the blue
        line within the window), model maxima (the values included along the red
        line within the window), and the model weighted means (the values
        included along the black line within the window). The table also shows
        the difference in the these values ( min,  mean and  max) between the
        fixed future periods and the period highlighted by the moveable window.
        In the table, the observed values are based on the Livneh dataset.
        Modeled values reflect downscaled CMIP5 simulations, in both future and
        historical periods. No values are displayed in the observed portion of
        the table when the moveable window extends past 2012.
      </p>

      <p style={{ margin: "32px auto" }}>
        <img alt="" src={fig3} style={{ height: "450px" }} title="" />
      </p>

      <h3>References</h3>
      <p>
        Daly, C., R. P. Neilson, and D. L. Phillips, 1994: A
        statistical–topographic model for mapping climatological precipitation
        over mountainous terrain. <i>J. Appl. Meteor.</i>, 33, 140–158.
      </p>

      <p>
        Livneh, B., T.J. Bohn, D.W. Pierce, F. Munoz-Arriola, B. Nijssen, R.
        Vose, D.R. Cayan, and L. Brekke, 2015: A spatially comprehensive,
        hydrometeorological data set for Mexico, the U.S., and Southern Canada
        1950–2013. <i>Sci. Data 2</i>, 150042. doi:10.1038/sdata.2015.42.
      </p>

      <p>
        Pierce, D. W., D. R. Cayan, and B. L. Thrasher, 2014: Statistical
        downscaling using localized constructed analogs (LOCA),{" "}
        <i>Journal of Hydrometeorology</i>, 15(6), 2558-2585.
      </p>

      <p>
        Sanderson, B.M. and M.F. Wehner, 2017 :Weighting strategy for the Fourth
        National Climate Assessment, in: Climate Science Special Report: A
        Sustained Assessment Activity of the U.S. Global Change Research Program
        [Wuebbles, D.J., D.W. Fahey, K.A. Hibbard, D.J. Dokken, B.C. Stewart,
        and T.K. Maycock (eds.)]. U.S. Global Change Research Program,
        Washington, DC, USA, pp. 644-653.
      </p>

      <p>
        Taylor, K. E., R.J. Stouffer, and G.A. Meehl, 2012: An overview of CMIP5
        and the experiment design.{" "}
        <i>Bulletin of the American Meteorological Society</i>, 93 (4), 485-498.
      </p>
    </div>
  );
};

export default InfoModal;
