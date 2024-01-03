export const campaignState = {
  campaignId: 0,
  title: "",
  desc: "",
  city: "",
  photo: null,
  photoUrl: "",
  videoLink: "",
  fundingGoal: 0,
  rewards: [],
  collaborators: [],
  contributors: [],
  projectType: "",
  status: "",
  fundingType: 0,
  owner: "",
  payment: [],
  projectDescription: "",
  riskDescription: "",
  duration: 0,
  likes: 0,
  bakers: 0,
  totalAmountCollected: 0,
  daysLeft: 0,

  campaings: [],
  loading: false,

  showSnackBar: {
    show: false,
    message: "",
    error: true,
  },
};

export const campaignReducer = (state, action) => {
  switch (action.type) {
    /* Get all campaign */
    case "setShowSnackBar":
      return {
        ...state,
        showSnackBar: action?.payload,
      };
    case "fetchCampaignsAndChangeState":
      return {
        ...state,
        campaignId: action?.payload.campaignId,
        title: action?.payload.title ? action?.payload.title : "",
        desc: action?.payload?.shortDescription
          ? action?.payload?.shortDescription
          : "",
        city: action?.payload.city,
        photoUrl: action?.payload.imageUrl ? action?.payload.imageUrl : "",
        videoLink: action?.payload?.videoLink ? action?.payload?.videoLink : "",
        fundingType: action?.payload?.fundingType?.fundingTypeId,
        fundingGoal: action?.payload?.goalAmount
          ? action?.payload?.goalAmount
          : 0,
        rewards: action?.payload?.rewards ? action?.payload?.rewards : [],
        owner: action?.payload?.owner ? action?.payload?.owner : "",
        contributors: action?.payload?.contributors
          ? action?.payload?.contributors
          : [],
        ownerName: action?.payload?.ownerFullName
          ? action?.payload?.ownerFullName
          : "",
        status: action?.payload?.campaignStage,
        payment: action?.payload?.campaignBankAccount
          ? action?.payload?.campaignBankAccount
          : null,
        collaborators: action?.payload?.collaborators
          ? action?.payload?.collaborators
          : [],
        projectType: action?.payload?.projectType
          ? action?.payload?.projectType
          : "",
        totalAmountCollected: action?.payload?.totalAmountCollected
          ? action?.payload?.totalAmountCollected
          : 0,
        projectDescription: action?.payload?.description
          ? action?.payload?.description
          : "",
        riskDescription: action?.payload?.risks ? action?.payload?.risks : "",
        duration: action?.payload?.campaignDuration
          ? action?.payload?.campaignDuration
          : 0,
        likes: action?.payload?.numberOfLikes
          ? action?.payload?.numberOfLikes
          : 0,
        bakers: action?.payload?.numberOfBackers
          ? action?.payload?.numberOfBackers
          : 0,
        daysLeft: action?.payload?.campaignDurationLeft
          ? action?.payload?.campaignDurationLeft
          : 0,
      };
    case "setCampaigns":
      return {
        ...state,
        campaigns: action?.payload,
      };
    case "setLodingState":
      return {
        ...state,
        loading: action.payload,
      };
    case "setLodingFalse":
      return {
        ...state,
        loading: false,
      };
    case "setLodingTrue":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
