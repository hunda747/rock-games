import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { CampaignContext } from "../layouts/dashboard/DashboardLayout";
import { getCampaignById } from "../data/fetchCampaign";

import "../styles/detail.css";
// import Button from "../theme/overrides/Button";

export default function DetailCampaignPage(params) {
  const { data, dispatch } = useContext(CampaignContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state);
  const [campaign, setCampaigns] = useState([]);

  useEffect(() => {
    if (location.state?.campaignId) {
      getCampaignById(location.state?.campaignId, dispatch, setCampaigns);
      // console.log(cam);
    }
  }, [location.state?.campaignId]);

  return (
    <div className="detailCampaign">
      <div className="wrapper">
        <div>
          <h2>Campaign Overview</h2>{" "}
        </div>
        <div className="basic">
          <h3>Basic</h3>
          <table>
            <tr>
              <td>Title</td>
              <td>{campaign?.title}Borena</td>
            </tr>
            <tr>
              <td>short description</td>
              <td>
                {campaign?.shortDescription}Short description on more stuff
              </td>
            </tr>
            <tr>
              <td>amount</td>
              <td>{campaign?.goalAmount}10000</td>
            </tr>
            <tr>
              <td>Project Type</td>
              <td>{campaign?.projectType}Business</td>
            </tr>
            <tr>
              <td>Funding Type</td>
              <td>{campaign?.fundingType?.name}Donation</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>{campaign?.campaignDuration}10</td>
            </tr>
          </table>
        </div>
        <div className="owner">
          <h3>Personal</h3>
          <table>
            <tr>
              <td>Owner name</td>
              <td>{campaign?.ownerFullName}Hundaol Nk</td>
            </tr>
            <tr>
              <td>Number of campaigns</td>
              <td>{campaign?.ownerFullName}3</td>
            </tr>
            {/* <tr>
              <td></td>
              <td></td>
            </tr> */}
          </table>
        </div>
        <div className="story">
          <h3>Story</h3>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Story</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
                <div
                  dangerouslySetInnerHTML={{ __html: campaign?.description }}
                  // style={{ height: "400px", overflow: "scroll", width: "100%" }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* <div className="row">
          <p>date created</p>
        </div> */}

        <div>
          <h3>Attached documents</h3>
        </div>
        <div>
          <h3>Reason</h3>
          <textarea cols="100%" />
          <div className="actions">
            <Button
              // href="https://material-ui.com/store/items/minimal-dashboard/"
              target="_blank"
              variant="outlined"
            >
              Accept
            </Button>
            <Button variant="outlined">Reject</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
